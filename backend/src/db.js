import mongoose from 'mongoose';
import logger from './logger';

const connectionData = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_LOCAL_PORT,
  db: process.env.MONGO_DB,
};

const URI = `mongodb://${connectionData.host}:${connectionData.port}/${connectionData.db}`;
const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    logger.info(`MongoDB Connected: ${db.connection.host} ${db.connection.port}`);
  } catch (err) {
    logger.error(`Mongoose error on start: ${err.message}`);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    // mongoose will attempt to reconnect
    throw new Error(`Mongoose connection error: ${err.message}`);
  });

  if (!process.env.NODE_ENV === 'test') {
    mongoose.connection.on('disconnected', () => {
      throw new Error('Mongoose disconnected.');
    });
  }
};

export default connectDB;
