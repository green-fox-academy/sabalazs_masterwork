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
      sortBy = 'datePosted', sortDirection = '1', pageNumber = '0', itemsPerPage = '20',
    } = req.query;
    const { userId } = req.params;
    try {
      const orders = await ordersService.getList(
        userId,
        sortBy,
        parseInt(sortDirection),
        parseInt(pageNumber),
        parseInt(itemsPerPage),
      );
      const numberOfDoc = await ordersService.getNumberOfDocs(userId);
      res.status(200).json({ orders, numberOfDoc });
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
