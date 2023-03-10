import { Request, Response } from 'express';
import Flight from '../models/Flight';

const getAll = async (req: Request, res: Response) => {
  const flights = await Flight.find();
  res.send(flights);
};

const getRouteById = async (req: Request, res: Response) => {
  const flightId = req.params.flightId;
  const flights = await Flight.findById(flightId);
  if (!flights) {
    res.status(404).json({ message: `Flight route with id ${req.params.flightId} not found` })
  } 
  res.status(200).json({ flights });
}

const getByRouteCode = async (req: Request, res: Response) => {
  const routeCode = req.params.routeCode
  const flights = await Flight.findOne({routeCode: req.params.routeCode});
  if (!flights) {
    res.status(404).send({ message: `Flight route with code ${routeCode} not found` })
  }
  res.status(200).send(flights);
}

const getByLocation = async (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const flights = await Flight.find({
    departureDestination: departure,
    arrivalDestination: arrival
  });
  if (!flights) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} not found` })
  }
  res.status(200).send(flights);
}

export default { getAll, getRouteById, getByRouteCode, getByLocation };
