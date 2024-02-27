import Joi from "joi";

export const queryVal = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(5).required(),
}).unknown(false);
