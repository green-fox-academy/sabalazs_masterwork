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
  async getList(req, res, next) {
    const {
      roleToFilterBy = undefined,
      sortBy = 'email',
      sortDirection = 1,
      pageNumber = 0,
      itemsPerPage = 15,
    } = req.query;
    try {
      const users = await usersService.getList(
        roleToFilterBy,
        sortBy,
        sortDirection,
        pageNumber,
        itemsPerPage,
      );
      const numberOfDoc = await usersService.getNumberOfDocs();
      res.status(200).json({ users, numberOfDoc });
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
  async updateOne(req, res, next) {
    const updatedUser = req.body;
    const { userId } = req.params;
    try {
      const data = await usersService.updateOne(userId, updatedUser);
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
