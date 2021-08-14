import { imageService } from '../services';

export const imageController = {
  async save(req, res, next) {
    try {
      const { files } = req;
      const { productId } = req.params;

      const token = await imageService.save(files, productId);
      res.status(201).json(token);
    } catch (err) {
      next(err);
    }
  },
};
