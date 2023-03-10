import express from 'express';
import controller from '../controllers/FlightV1';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/flights/:flightId', controller.getRouteById);
router.get('/route/:routeCode', controller.getByRouteCode)
router.get('/route/:departure/:arrival', controller.getByLocation)

export = router;
