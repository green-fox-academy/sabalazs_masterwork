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
};
