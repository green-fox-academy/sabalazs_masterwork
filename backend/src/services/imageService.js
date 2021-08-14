import path from 'path';
import * as fs from 'fs';
import mongoose from 'mongoose';
import ValidationError from '../utils/ValidationError';
import Product from '../models/Product';
import ProductImage from '../models/ProductImage';

export const imageService = {
  async save(files, id) {
    await this.validateFile(files);

    const { file } = files;
    file.name = `${id}${path.parse(file.name).ext}`;
    const url = `${process.env.IMG_SERVER_BASE_URL}/${file.name}`;
    const uploadPath = process.env.IMG_SERVER_STORAGE_PATH + file.name;

    let result;

    const isExists = await ProductImage.exists({ product: id });

    if (isExists) {
      result = await this.updateOne(file, id, url, uploadPath);
    } else {
      result = await this.createOne(file, id, url, uploadPath);
    }

    return { result };
  },

  async validateFile(files) {
    if (!files || Object.keys(files).length === 0) {
      throw new ValidationError('Missing file');
    }

    const { file } = files;

    // mimetype: ex. 'image/jpeg'
    // every image type (gif, png, etc.) starts with 'image'
    if (!file.mimetype.startsWith('image')) {
      throw new ValidationError('Invalid file');
    }

    if (file.size > (process.env.MAX_FILE_IMAGE_UPLOAD || 1000000)) {
      throw new ValidationError('File size is over the limit');
    }
  },

  async updateOne(file, id, url, uploadPath) {
    const currentImage = await ProductImage.findOne({ product: id });
    fs.unlink(currentImage.path, (err) => {
      if (err) {
        throw new Error('Current product image has not been deleted.');
      }
    });

    await this.saveFile(file, uploadPath);

    currentImage.url = url;
    currentImage.path = uploadPath;
    currentImage.save();

    const updatedProduct = await Product.findById(id).populate('image');
    return updatedProduct;
  },

  async createOne(file, id, url, uploadPath) {
    await this.saveFile(file, uploadPath);
    const productImage = await ProductImage.create({
      url,
      path: uploadPath,
      product: mongoose.Types.ObjectId(id),
    });

    const updatedProduct = await Product.findByIdAndUpdate(id, { image: productImage._id }, { new: true }).populate('image');
    return updatedProduct;
  },

  async saveFile(file, uploadPath) {
    await file.mv(uploadPath).catch((err) => {
      if (err) {
        throw new Error('Problem with file upload');
      }
    });
  },
};
