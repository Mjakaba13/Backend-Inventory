import { User } from "../models/User.js";
import { comparePassword } from "../auth/auth.js";

export const checkForUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: "Wrong user ID",
      data: null,
    });
  }
  req.user = user;
  next();
};

export const checkUserPassword = async (res, req, next) => {
  const user = await User.findOne({ email: req.body.email });
  const valid = await comparePassword(req.body.password, user.password);
  if (!valid) {
    return res.status(400).send({
      message: "Wrong email or password",
      data: null,
    });
  }
  req.user = user;
  next();
};

export const auth = async (res, req, next) => {
  const token = req.header.token;
  if (!token) {
    return res.status(400).send({
      message: "Access denied. No token was provided.",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({
      message: "You do not have the right access to this resource.",
      data: null,
    });
  }
};
