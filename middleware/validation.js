import Joi from 'joi';

export const createUserValidation = (req, res, next) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    shopName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    // passwordConfirm: Joi.string().min(8).required(),
  });
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({
      message: 'Something went wrong',
      data: result.error.details[0].message,
    });
  }
  next();
};

export const addProductsValidation = (req, res, next) => {
  const productSchema = Joi.object({
    // productId: Joi.number(),
    name: Joi.string(),
    quantity: Joi.number(),
    unitPrice: Joi.number(),
    productStatus: Joi.string(),
    category: Joi.string(),
  });
};
