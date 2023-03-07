// import mongoose, { Document, Schema } from 'mongoose';

// export interface IRoute {
//   route_id: string;
//   departureDestination: string;
//   arrivalDestination: string;
//   flights: mongoose.Schema.Types.ObjectId;
// };

// export interface IRouteModel extends IRoute, Document {}

// const RouteSchema: Schema = new Schema(
//   {
//     route_id: { type: String, required: true },
//     departureDestination: { type: String, required: true },
//     arrivalDestination: { type: String, required: true },
//     flights: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Flight',
//       required: true,
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// export default mongoose.model<IRouteModel>('Route', RouteSchema);