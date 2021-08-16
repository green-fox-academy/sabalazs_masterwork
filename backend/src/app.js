import express from 'express';
import morgan from 'morgan';

import fileUpload from 'express-fileupload';
import logger from './logger';
import errorHandler from './middlewares/error-handler';
import {
  usersController,
  ordersController,
  productsController,
  authController,
  imageController,
  productLabelsController,
} from './controllers';
import tokenCheck from './middlewares/tokenCheck';
import roleCheck from './middlewares/roleCheck';

const cors = require('cors');

const app = express();
const router = express.Router();
app.use(morgan('combined', { stream: logger.stream }));
router.use(cors());
router.use(express.json());

router.post('/auth', authController.login);

router.post('/users', usersController.createNew);
router.get('/users/:userId', tokenCheck, roleCheck, usersController.getOne);

router.post('/products', tokenCheck, roleCheck, productsController.createNew);
router.get('/products', tokenCheck, productsController.getList);
router.get('/products/:productId', tokenCheck, productsController.getOne);
router.put('/products/:productId', tokenCheck, roleCheck, productsController.updateOne);
router.delete('/products/:productId', tokenCheck, roleCheck, productsController.deleteOne);

router.post('/labels', tokenCheck, roleCheck, productLabelsController.createNew);
router.get('/labels', tokenCheck, productLabelsController.getList);
router.delete('/labels/:labelId', tokenCheck, roleCheck, productLabelsController.deleteOne);

router.post('/orders', tokenCheck, ordersController.createNew);
router.get('/orders/', tokenCheck, ordersController.getList);
router.put('/orders/:orderId', tokenCheck, roleCheck, ordersController.updateOne);
router.delete('/orders/:orderId', tokenCheck, roleCheck, ordersController.deleteOne);

router.post('/images/:productId', fileUpload({ debug: true }), tokenCheck, roleCheck, imageController.save);

app.use('/api', router);

app.use(errorHandler);

export default app;
