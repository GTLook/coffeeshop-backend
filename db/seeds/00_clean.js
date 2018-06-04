exports.seed = function(knex, Promise) {

  const tablesToClean = ['users','shops','products','product_option_size','product_option_milk','product_option_extra'].reverse()

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
