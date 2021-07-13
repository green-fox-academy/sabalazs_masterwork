import { ordersService } from '../services';

export const ordersController = {
  async createNew(req, res, next) {
    const order = req.body;
    try {
      console.log(order);
      const data = await ordersService.createNew(order);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
};