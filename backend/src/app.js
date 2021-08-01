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
import tokenCheck from './middlewares/tokenCheck';
import roleCheck from './middlewares/roleCheck';

const cors = require('cors');

const app = express();
const router = express.Router();
app.use(morgan('combined', { stream: logger.stream }));
router.use(cors());
router.use(express.json());

router.post('/users', usersController.createNew);
router.get('/users', tokenCheck, roleCheck, usersController.getList);
router.get('/users/:userId', tokenCheck, roleCheck, usersController.getOne);
router.put('/users/:userId', tokenCheck, roleCheck, usersController.updateOne);
router.delete('/users/:userId', tokenCheck, roleCheck, usersController.deleteOne);

router.post('/orders', tokenCheck, ordersController.createNew);
router.get('/orders', tokenCheck, roleCheck, ordersController.getList);
router.put('/orders/:orderId', tokenCheck, roleCheck, ordersController.updateOne);
router.delete('/orders/:orderId', tokenCheck, roleCheck, ordersController.deleteOne);

router.post('/products', tokenCheck, roleCheck, productsController.createNew);
router.get('/products', productsController.getList);
router.get('/products/:productId', productsController.getOne);
router.put('/products/:productId', tokenCheck, roleCheck, productsController.updateOne);
router.delete('/products/:productId', tokenCheck, roleCheck, productsController.deleteOne);

router.post('/auth', authController.login);

app.use('/api', router);

app.use(errorHandler);

export default app;
