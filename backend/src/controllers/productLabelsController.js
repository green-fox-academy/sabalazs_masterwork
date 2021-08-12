import { productLabelsService } from '../services';

export const productLabelsController = {
  async createNew(req, res, next) {
    const label = req.body;
    try {
      const data = await productLabelsService.createNew(label);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  async getList(req, res, next) {
    try {
      const labels = await productLabelsService.getList();
      res.status(200).json(labels);
    } catch (err) {
      next(err);
    }
  },
  async deleteOne(req, res, next) {
    const { labelId } = req.params;
    try {
      const data = await productLabelsService.deleteOne(labelId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
