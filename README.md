# CoffeeShop (Backend)

This is the backend of the project.
The front ends can be found at:
* https://github.com/gEightyTwo/coffeeshop-frontend-customer
* https://github.com/gEightyTwo/coffeeshop-frontend-store

CoffeeShop is a coffee ordering web application.  It allows users to create a profile, log in, and order custom coffee drinks.  The app utilizes the Google API location codes to find the nearest coffee shops and walking distance to the shop.  Users can craft their drink order and set the time they want to pick up their drinks for a delay up to 30 minutes.  Coffee shop owners can receive incoming orders, sorted by pickup time, and fulfill orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```shell
* fork and clone this repository
* run npm install
```

### Installing

A step by step series of examples that tell you how to get a development env running to utilize the postgress db

Create the development database:

```shell
* createdb coffee_base
```

and run migrations and seeds:

```shell
* npm run knex migrate:latest
* npm run knex seed:run
```

Finally, start the server:

```shell
* npm start
```

Check that you can GET the `/api/customer/shops` endpoint.  If you receive a 200 from the server your up and running.


## Deployment

This project has been deployed on Heroku at the address: https://dashboard.heroku.com/apps/coffee-base

## Built With

* [JavaScript](https://www.javascript.com/) - The language
* [Materialize](https://materializecss.com/) - The css framework used
* [React](https://reactjs.org/) - Frontend library
* [Redux](https://redux.js.org/) - State container
* [postgreSQL](https://www.postgresql.org/) - database
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Node](https://nodejs.org/en/) - Package ecosystem
* [Sockets](https://sockets.io) - Sockets system


## Contributing

Please send either of the developers a message for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Mark Pavlovski** - *Initial work* - [mrkpvlvski](https://github.com/mrkpvlvski)
* **Gavin Look** - *Initial work* - [GTLook](https://github.com/GTLook/)

## License

This project is licensed under the MIT License

## Acknowledgments

* Inspiration
* etc
