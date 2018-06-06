# CoffeeShop (Backend)

CoffeeShop is a coffee ordering web application.  It allows users to create a profile, log in, and order custom coffee drinks at the nearest coffee shops  Users can set the time they want to pick up their drinks for a delay up to 30 minutes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```shell
* fork and clone this repository
* run npm install
```

### Installing

A step by step series of examples that tell you how to get a development env running

to utilize the postgress db

Create the development database:

```shell
createdb coffee_base
```

and run migrations and seeds:

```shell
npm run knex migrate:latest
npm run knex seed:run
```

Finally, start the server:

```shell
npm run dev
```

Check that you can GET the `/api/snacks` endpoint.  If you receive a 200 from the server your up and running.


## Deployment

This project has been deployed on Heroku at the address:

## Built With

* [JavaScript](https://www.javascript.com/) - The language
* [Materialize](https://materializecss.com/) - The css framework used
* [React](https://reactjs.org/) - Frontend library
* [Redux](https://redux.js.org/) - State container
* [postgreSQL](https://www.postgresql.org/) - database
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Node](https://nodejs.org/en/) - Package ecosystem
* [sockets.io] (https://nodejs.org/en/) - Sockets system

## Contributing

Please send either of the developers a message for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Mark Pavlovski** - *Initial work* - [mrkpvlvski](https://github.com/mrkpvlvski)
* **Gavin Look** - *Initial work* - [GTLook](https://github.com/GTLook/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
