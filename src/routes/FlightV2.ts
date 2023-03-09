import express from 'express';
import controller from '../controllers/FlightV2';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:routeId', controller.getRouteById);
router.get('/route/:departure/:arrival', controller.getByLocation)
router.get('/route/:departure/:arrival/:depart', controller.getByTime)
router.get('/flight/:flightId', controller.getFlightById);
router.put('/book/:flightId', controller.bookFlight)



export = router;