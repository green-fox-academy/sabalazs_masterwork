import { imageService } from '../services';

export const imageController = {
  async createOne(req, res, next) {
    try {
      const { files } = req;
      const { productId } = req.params;

      const result = await imageService.createOne(files, productId);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
  async updateOne(req, res, next) {
    try {
      const { files } = req;
      const { productId } = req.params;

      const result = await imageService.updateOne(files, productId);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};
