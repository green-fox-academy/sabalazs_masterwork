import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import errorHandler from './middlewares/error-handler';
import { ordersController } from './controllers';
import { productsController } from './controllers';

const cors = require('cors');
const app = express();
const router = express.Router();

app.use(morgan('combined', { stream: logger.stream }));

router.use(cors());
router.use(express.json());

router.post('/orders', ordersController.createNew);
router.post('/products', productsController.createNew);

app.use('/api', router);

app.use(errorHandler);

export default app;
