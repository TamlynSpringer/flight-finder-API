import express from 'express';
import controller from '../controllers/FlightV2';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:routeId', controller.getRouteById);
router.get('/route/:departure/:arrival', controller.getByLocation)
router.get('/route/:departure/:arrival/datetime/:depart', controller.getByDateTime)
router.get('/route/:departure/:arrival/date/:date', controller.getByDate)
router.get('/route/:departure/:arrival/price/:price', controller.getByPrice)
router.get('/route/layover/:departure/:arrival/:depart', controller.getConnectingFlight)
router.get('/flight/:flightId', controller.getFlightById);
router.put('/book/:flightId', controller.bookFlightSeat)



export = router;