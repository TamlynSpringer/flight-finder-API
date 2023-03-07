import Joi, { ObjectSchema} from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IFlight } from '../models/Flight';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(402).json({ error });
    }
  }
};

export const Schemas = {
  flight: {
    create: Joi.object<IFlight>({
      routeCode: Joi.string().required(),
      departureDestination: Joi.string().required(),
      arrivalDestination: Joi.string().required(),
      flights: [{
        flightCode: Joi.string().required(),
        departureAt: Joi.string().required(),
        arrivalAt: Joi.string().required(),
        availableSeats: Joi.number().required(),
        prices: {
          currency: Joi.string().required(),
          adult: Joi.number().required(),
          child: Joi.number().required(),
        }
      }]
    }),
    update: Joi.object<IFlight>({
      routeCode: Joi.string().required(),
      departureDestination: Joi.string().required(),
      arrivalDestination: Joi.string().required(),
      flights: {
        flightCode: Joi.string().required(),
        departureAt: Joi.string().required(),
        arrivalAt: Joi.string().required(),
        availableSeats: Joi.number().required(),
        prices: {
          currency: Joi.string().required(),
          adult: Joi.number().required(),
          child: Joi.number().required(),
        }
      }
    })
  }
};
