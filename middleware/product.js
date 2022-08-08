import { User } from '../models/User.js';

export const createProductId = async (req, res, next) => {
  const { id } = req.body;
  const { user } = req;
  const { products } = user;
  products.length < 1
    ? (req.id = 1)
    : (req.id = products[products.length - 1].productId + 1);
  next();
};
