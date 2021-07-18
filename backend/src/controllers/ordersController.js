import { ordersService } from '../services';

export const ordersController = {
  async createNew(req, res, next) {
    const order = req.body;
    try {
      const data = await ordersService.createNew(order);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  async getList(req, res, next) {
    const {
      sortBy = 'datePosted', sortDirection = '1', pageNumber = '0', itemsPerPage = '20',
    } = req.query;

    try {
      const orders = await ordersService.getList(sortBy, sortDirection, pageNumber, itemsPerPage);
      const numberOfDoc = await ordersService.getNumberOfDocs();
      res.status(200).json({ orders, numberOfDoc });
    } catch (err) {
      next(err);
    }
  },
};