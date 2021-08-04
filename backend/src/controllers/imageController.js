import { imageService } from '../services';

export const imageController = {
    async save(req, res, next) {
        try {
            console.log(req.files);
            console.log(Object.keys(req.files));
            console.log(!!req.file);
            const { files } = req;
            const { productId } = req.params;

            const token = await imageService.save(files, productId);
            res.status(201).json(token);
        } catch (err) {
            next(err);
        }
    },
};
