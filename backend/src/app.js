import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import errorHandler from './middlewares/error-handler';
import {
    usersController,
    ordersController,
    productsController,
    authController
} from './controllers';

const cors = require('cors');
const app = express();
const router = express.Router();

app.use(morgan('combined', { stream: logger.stream }));

router.use(cors());
router.use(express.json());

router.post('/users', usersController.createNew);
router.post('/orders', ordersController.createNew);
router.get('/orders', ordersController.getList);
router.post('/products', productsController.createNew);
router.post('/auth', authController.login);

app.use('/api', router);

app.use(errorHandler);

export default app;
