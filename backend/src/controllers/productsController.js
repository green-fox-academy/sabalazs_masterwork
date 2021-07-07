import { productsService } from '../services';

export const productsController = {
  async createNew(req, res, next) {
    const product = req.body;
    try {
      const data = await productsService.createNew(product);
      
    console.log(product);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
};