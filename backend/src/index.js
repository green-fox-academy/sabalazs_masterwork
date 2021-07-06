import logger from './logger';
import app from './app';
import connectDB from './db';

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
