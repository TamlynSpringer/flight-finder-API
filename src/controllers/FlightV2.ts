import { NextFunction, Request, Response } from 'express';
import { flightData } from '../data/dataV2'


const getAll = async (req: Request, res: Response, next: NextFunction) => {
  res.send(flightData);
};

const getRouteById = async (req: Request, res: Response, next: NextFunction) => {
  const routeId = req.params.routeId;
  const flights = await flightData.find(flight => flight.route_id === routeId);
  if (!flights) {
    res.status(404).json({ message: `Flight route with id ${req.params.routeId} not found` })
  } 
  res.status(200).json({ flights });
}

const getByLocation = (req: Request, res: Response, next: NextFunction) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  console.log('req body', req.body)
  console.log(flightData)
  const flights = flightData.find(flight => {
    flight.departureDestination === departure && flight.arrivalDestination === arrival
  });
  if (!flights) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} not found` })
  }
  res.status(200).send(flights);
}

const getByTime = async (req: Request, res: Response, next: NextFunction) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const depart = req.body.departureAt
  // const flightLocation = flightData.find(flight => {
  //   flight.departureDestination === departure && flight.arrivalDestination === arrival
  // });
  const flightTime = flightData?.map(flight => flight?.itineraries.filter(flightTime => flightTime.departureAt === depart))
  if (!flightTime) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} at times ${depart} not found` })
  }
  res.status(200).send(flightTime);
}

export default { getAll, getRouteById, getByLocation, getByTime };

// const createFlight = (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.body;
//   const flight = new Flight({
//     _id: new mongoose.Types.ObjectId(),
//     name
//   });
//   return flight
//     .save()
//     .then((flight) => res.status(201).json({ flight }))
//     .catch((error) => res.status(500).json({ error }));
// };

// const readAll = (req: Request, res: Response, next: NextFunction) => {
//   return Flight.find()
//     .then((flights) => (res.status(200).json({ flights })))
//     .catch((error) => res.status(500).json({ error }));
// };

// const readRoute = async (req: Request, res: Response, next: NextFunction) => {
//   const routeId = req.params.flightId;
//   console.log(routeId, 'request flightId')
//   return Flight.findById(req.params._id)
//   .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
//   .catch((error) => res.status(500).json({ error }))
// };

// const readFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findById(flightId)
//   .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
//   .catch((error) => res.status(500).json({ error }))
// };


// const updateFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findById(flightId)
//     .then((flight) => {
//       if (flight) {
//         flight.set(req.body);
//         return flight
//           .save()
//           .then((flight) => res.status(201).json({ flight }))
//           .catch((error) => res.status(500).json({ error }));
//       } else {
//         res.status(404).json({ message: 'Not found' });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };
// const deleteFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findByIdAndDelete(flightId)
//     .then((flight) => (flight ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found '}))) 
// };

// export default { createFlight, readRoute, readFlight, readAll, updateFlight, deleteFlight };

