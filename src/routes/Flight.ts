import express from 'express';
import controller from '../controllers/Flight';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:flightId', controller.getRouteById);
router.get('/route/:routeCode', controller.getByRouteCode)
router.get('/route/:departure/:arrival', controller.getByLocation)



// router.post('/create', ValidateSchema(Schemas.flight.create), controller.createFlight);
// router.get('/route/:id', controller.readRoute);
// router.get('/route/:flightId/flight/:flightId', controller.readFlight);
// router.get('/', controller.readAll);
// router.patch('/update/:flightId', ValidateSchema(Schemas.flight.update), controller.updateFlight);
// router.delete('/delete/:flightId', controller.deleteFlight);

export = router;