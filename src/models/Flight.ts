import mongoose, { Document, Schema } from 'mongoose';

export interface IFlight {
  routeCode: string;
  departureDestination: string;
  arrivalDestination: string;
  flights: [
    flightCode: string,
    departureAt: string,
    arrivalAt: string,
    availableSeats: number,
    prices: {
      currency: string;
      adult: number;
      child: number;
    }
  ]
}

export interface IFlightModel extends IFlight, Document {}

const FlightSchema: Schema = new mongoose.Schema(
  {
    routeCode: { type: String, required: true, unique: true },
    departureDestination: { type: String, required: true },
    arrivalDestination: { type: String, required: true },
    flights: [{
      flightCode: { type: String, required: true, unique: true },
      departureAt: { type: String, required: true },
      arrivalAt: { type: String, required: true },
      availableSeats: { type: Number, required: true },
      prices: {
        currency: { type: String, required: true },
        adult: { type: Number, required: true },
        child: { type: Number, required: true },
      }
    }]
  },
  {
    versionKey: false
  }
);

const Flight = mongoose.model<IFlightModel>('Flight', FlightSchema);
export default Flight;