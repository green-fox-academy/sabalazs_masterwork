import { productsService } from '../services';

export const productsController = {
  async createNew(req, res, next) {
    const product = req.body;
    try {
      const data = await productsService.createNew(product);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
  async getList(req, res, next) {
    const {
      categoryToFilterBy = undefined,
      sortBy = 'price',
      sortDirection = -1,
      pageNumber = 0,
      itemsPerPage = 15,
    } = req.query;
    try {
      const products = await productsService.getList(
        categoryToFilterBy,
        sortBy,
        sortDirection,
        pageNumber,
        itemsPerPage,
      );
      const numberOfDoc = await productsService.getNumberOfDocs();
      res.status(200).json({ products, numberOfDoc });
    } catch (err) {
      next(err);
    }
  },
  async getOne(req, res, next) {
    const { productId } = req.params;
    try {
      const data = await productsService.getOne(productId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
  async updateOne(req, res, next) {
    const updatedProduct = req.body;
    const { productId } = req.params;
    try {
      const data = await productsService.updateOne(productId, updatedProduct);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
  async deleteOne(req, res, next) {
    const { productId } = req.params;
    try {
      const data = await productsService.deleteOne(productId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
