import { ordersService } from '../services';

export const ordersController = {
  async createNew(req, res, next) {
    const order = req.body;
    order.customer = req.user.id;
    try {
      const data = await ordersService.createNew(order);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  async getList(req, res, next) {
    const {
      sortBy = 'datePosted', sortDirection = -1, pageNumber = 1, itemsPerPage = 10,
    } = req.query;
    const { user } = req;
    try {
      const orders = await ordersService.getList(
        user,
        sortBy,
        sortDirection,
        pageNumber,
        itemsPerPage,
      );
      const numberOfPages = await ordersService.numberOfPages(user, itemsPerPage);
      res.status(200).json({ orders, numberOfPages });
    } catch (err) {
      next(err);
    }
  },
  async updateOne(req, res, next) {
    const update = req.body;
    const { orderId } = req.params;
    try {
      const data = await ordersService.updateOne(orderId, update);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
  async deleteOne(req, res, next) {
    const { orderId } = req.params;
    try {
      const data = await ordersService.deleteOne(orderId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
