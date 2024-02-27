import Joi from "joi";

export const commentVal = Joi.object({
  name: Joi.string().min(4).required(),
  comment: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  status: Joi.boolean().optional(),
}).unknown(false);