import express from 'express';
import controller from '../controllers/FlightV1';
import controllerV2 from '../controllers/FlightV2';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/flights/:flightId', controller.getRouteById);
router.get('/route/:routeCode', controller.getByRouteCode)
router.get('/route/:departure/:arrival', controller.getByLocation)
router.get('/route/:departure/:arrival/:depart', controller.getByTime)




// router.post('/create', ValidateSchema(Schemas.flight.create), controller.createFlight);
// router.get('/route/:id', controller.readRoute);
// router.get('/route/:flightId/flight/:flightId', controller.readFlight);
// router.get('/', controller.readAll);
// router.patch('/update/:flightId', ValidateSchema(Schemas.flight.update), controller.updateFlight);
// router.delete('/delete/:flightId', controller.deleteFlight);

export = router;