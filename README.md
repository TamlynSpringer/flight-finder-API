<section align='center'>
  <img src='./src/public/logo.svg' alt='Flight Finder API' />
</section>

<h2 align="center">API to find and book flights between Stockholm, Oslo and Amsterdam</h2>

## Tech stack

- Node
- Express
- MongoDB
- Mongoose
- Joi
- Typescript

***

## Endpoints:

API is divided into version 1 which uses MongoDB and mongoose and version 2 that uses a local dataset.

### API V1

**_GET:_**

**/api/seed** - seed data for the mongoDB database

**/api/flights/** - get all flights from database

**/api/flights/:flightId** - get flight routes and corresponding flights by mongoDB object ID

**/api/flights/:routeCode** - get flights by route ID (code)

**/api/flights/route/:departure/:arrival** - get flights by departure and arrival destination

### API V2

**_GET:_**

**/api/v2/flights/v2/** - get all flights from database

**/api/v2/flights/:routeId** - get routes & corresponding flights by route ID

**/api/v2/flights/route/:departure/:arrival** - get flights by departure and arrival destination

**/api/v2/flights/route/layover/:departure/:arrival/:depart** - for indirect flights get connecting flight details and layover time

**/api/v2/flights/route/:departure/:arrival/datetime/:depart** - get flight that matches date-time specified in the front-end as url-encoded form data

**/api/v2/flights/route/:departure/:arrival/date/:date** - get all flights that matching the date specified in the front-end as url-encoded form data 

**/api/v2/flights/flight/:flightId** - get flight by ID

**_PUT:_**

**/api/v2/flights/book/:flightId** - update available seats when a booking is made


## Getting started:

To get started with API V2


Clone the repo
   ```sh
  git clone https://github.com/TamlynSpringer/flight-finder-API
   ```
Install NPM packages
   ```sh
  npm install
   ```
Add own MongoDB credentials to .env file, alternatively remove mongoDB connection from server
   ```sh
  MONGO_USERNAME=X
  MONGO_PASSWORD=Y
  MONGO_CLUSTER=Z
   ```
Start the server
   ```sh
  nodemon
   ```