import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import errorHandler from './middlewares/error-handler';
import {
  usersController,
  ordersController,
  productsController,
  authController,
} from './controllers';

const cors = require('cors');

const app = express();
const router = express.Router();
app.use(morgan('combined', { stream: logger.stream }));
router.use(cors());
router.use(express.json());

router.post('/users', usersController.createNew);
router.get('/users', usersController.getList);
router.get('/users/:userId', usersController.getOne);
router.put('/users/:userId', usersController.updateOne);
router.delete('/users/:userId', usersController.deleteOne);

router.post('/orders', ordersController.createNew);
router.get('/orders', ordersController.getList);
router.put('/orders/:orderId', ordersController.updateOne);
router.delete('/orders/:orderId', ordersController.deleteOne);

router.post('/products', productsController.createNew);
router.get('/products', productsController.getList);
router.get('/products/:productId', productsController.getOne);
router.put('/products/:productId', productsController.updateOne);
router.delete('/products/:productId', productsController.deleteOne);

router.post('/auth', authController.login);

app.use('/api', router);

app.use(errorHandler);

export default app;
