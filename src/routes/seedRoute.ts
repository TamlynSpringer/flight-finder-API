import express from 'express';
import Route from '../models/Route';
// import Flight from '../models/Flight.js';
import data from '../data'


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Route.deleteMany({})
  const createdRoutes = await Route.insertMany(data.routes);
  // await Flight.deleteMany({})
  // const createdFlights = await Flight.insertMany(data.flights);
  res.send({ createdRoutes })
});

export default seedRouter;