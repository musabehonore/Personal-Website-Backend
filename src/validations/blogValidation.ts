import joi from "joi";

export const blogVal = joi.object({
  title: joi.string().min(4).required(),
  content: joi.string().min(5).required(),
}).unknown(false);