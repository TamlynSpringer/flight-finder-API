import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import flightRoutes from './routes/FlightV1';
import flightRoutesV2 from './routes/FlightV2';
import seedRouter from './routes/Seed';

const router = express();

mongoose
.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(() => {
  console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error)
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

const StartServer = () => {
  router.use((req, res, next) => {
    console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
      console.log(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      res.status(200).json({});
    }
    next();
  });

  router.use('/api/seed', seedRouter)
  router.use('/api/flights', flightRoutes)
  router.use('/api/v2/flights', flightRoutesV2)

  router.get('/api/check', (req, res, next) => res.status(200).json({ message: 'API working' }));

  router.use((req, res, next) => {
    const error = new Error('Not found');
    console.log(error);
    return res.status(404).json({ message: error.message })
  });
  
  http.createServer(router).listen(config.server.port, () => {
    console.log(`Sever is running on port ${config.server.port}`);
  })
};

StartServer();
