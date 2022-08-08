import { User } from '../models/User.js';

//GET ALL PRODUCTS
export const getAllUserProducts = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  const products = user.products;
  return res.status(200).send({
    message: 'User products retrieved',
    data: products,
  });
};

//ADD PRODUCT
export const addProduct = async (req, res) => {
  const { id, ...productObject } = req.body;
  // const user = await User.findById(id);
  try {
    const addedProduct = await User.updateOne(
      { _id: id },
      { $push: { products: { productId: req.id, ...productObject } } }
    );
    // const product = user.product;
    // const user = await User.findById(id);
    // const { products } = user;
    // products.push({
    //   productId: req.id,
    // });
    return res.status(201).send({
      message: 'Product added',
      data: productObject,
    });
  } catch (error) {
    console.log(error);
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id, productId } = req.body;
  // const user = await User.findById(id);
  try {
    const deletedProduct = await User.updateMany(
      { _id: id },
      { $pull: { products: { productId: productId } } }
    );
    return res.status(201).send({
      message: 'Product deleted',
      data: [],
    });
  } catch (error) {
    console.log(error);
  }
};

//GET PRODUCT
export const getProduct = async (req, res) => {
  const { id, productId } = req.body;
  const user = await User.findById(id);
  const product = user.products.filter(
    (product) => product.productId == productId
  );
  return res.status(200).send({
    message: 'Product retrieved',
    data: product,
  });
};
