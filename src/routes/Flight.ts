import express from 'express';
import controller from '../controllers/Flight';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.flight.create), controller.createFlight);
router.get('/route/:flightId', controller.readRoute);
// router.get('/flight/:flightId', controller.readFlight);
router.get('/', controller.readAll);
router.patch('/update/:flightId', ValidateSchema(Schemas.flight.update), controller.updateFlight);
router.delete('/delete/:flightId', controller.deleteFlight);

export = router;