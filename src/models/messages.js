const db = require('../../db')
const st = require('knex-postgis')(db)
console.log(st);
const bcrypt = require('bcrypt-as-promised')
const userModel = require('./users')
// const location = '47.633199 -122.317607'
// const currentLocation = '47.598886, -122.333791' // galvanize
// const currentLocation = '47.627161, -122.334172' // slu
const currentLocation = '-122.331759, 47.595025' // century link field
// const currentLocation = '0, 0'



function create(message,location,id){
    console.log('location!!!!', location);
    location = location.split(', ')[1] +' '+ location.split(', ')[0]
    console.log('location!!!!', location);
    return (
      db('messages')
      .insert({ users_id: id, message, location: st.geography(st.geomFromText(`Point(${location})`, 4326))})
      .returning('*')
    )
}




function distance(distance, id, location, onlyFriends = false,onlyMine = false){
  if (onlyFriends) {
    let localMessages
    let myFriends
    return (
      db.raw(`SELECT messages.* , geometry(messages.location)
          FROM messages
          where ST_DWithin(messages.location, ST_MakePoint(${currentLocation})::geography, ${distance})`)
    )
    .then(messages => {
      localMessages = messages.rows
      return db('users').select('id', 'username')
    })
    .then(users => {
      localMessages.map(message => {
        message.username = users.find(user => user.id == message.users_id).username
        return message
      })
      return db('users_users').where('users_id', id)
    })
    .then(friends => {
      myFriends = friends
      return localMessages.filter(message => friends.some(friend => message.users_id === friend.friends_id))
    })
  } else {
    // let distance = 10000000000000000000 //temp override
    let msg
    console.log('!!!!!!',location,'!!!!!!!!');
    return (
      db.raw(`SELECT messages.* , st_astext(messages.location) AS location
          FROM messages
          where ST_DWithin(messages.location, ST_MakePoint(${currentLocation})::geography, ${distance})`)
    )
    .then(messages => {
      msg = messages.rows
      return db('users').select('id', 'username')
    })
    .then(users => {
      msg.map(message => {
        message.username = users.find(user => user.id == message.users_id).username
        message.created_at = message.created_at.toString()
        message.location = message.location.split('')
          .filter((letter,idx,arr)=> idx > 5 && idx < arr.length - 1).join('')
          .split(' ').reverse().join(', ')
        return message
      })
      // console.log(msg);
      console.log(msg);
      return msg
    })
  }
}

function parseDate(datestring){
// 2018-04-26T19:04:34.263Z
  return datestring.split('').filter((letter,idx)=>idx>10 && idx<=15)
}


module.exports = {
  create,
  distance
}
