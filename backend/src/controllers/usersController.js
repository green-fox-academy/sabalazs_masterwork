import { usersService } from '../services';

export const usersController = {
  async createNew(req, res, next) {
    const user = req.body;
    try {
      const data = await usersService.createNew(user);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  async getOne(req, res, next) {
    const { userId } = req.params;
    try {
      const data = await usersService.getOne(userId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
  async deleteOne(req, res, next) {
    const { userId } = req.params;
    try {
      const data = await usersService.deleteOne(userId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
