import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Flight from '../models/Flight';


const createFlight = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const flight = new Flight({
    _id: new mongoose.Types.ObjectId(),
    name
  });
  return flight
    .save()
    .then((flight) => res.status(201).json({ flight }))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Flight.find()
    .then((flights) => (res.status(200).json({ flights })))
    .catch((error) => res.status(500).json({ error }));
};

const readRoute = async (req: Request, res: Response, next: NextFunction) => {
  const routeId = req.params.flightId;
  return Flight.findById(req.params.flightId)
  .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
  .catch((error) => res.status(500).json({ error }))
};

const readFlight = (req: Request, res: Response, next: NextFunction) => {
  const flightId = req.params.flightId;
  return Flight.findById(flightId)
  .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
  .catch((error) => res.status(500).json({ error }))
};


const updateFlight = (req: Request, res: Response, next: NextFunction) => {
  const flightId = req.params.flightId;
  return Flight.findById(flightId)
    .then((flight) => {
      if (flight) {
        flight.set(req.body);
        return flight
          .save()
          .then((flight) => res.status(201).json({ flight }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteFlight = (req: Request, res: Response, next: NextFunction) => {
  const flightId = req.params.flightId;
  return Flight.findByIdAndDelete(flightId)
    .then((flight) => (flight ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found '}))) 
};

export default { createFlight, readRoute, readFlight, readAll, updateFlight, deleteFlight };

