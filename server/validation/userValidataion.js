import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";

export const loginAuthentication = (data) => {
  const Schema = Joi.object({
    email: Joi.string().required().email().trim().min(4).max(100),
    password: Joi.string().required().trim().min(6).max(100),
  });

  return Schema.validate(data);
};
export const signupAuthentication = (data) => {
  const Schema = Joi.object({
    userName: Joi.string().required().trim().min(4).max(100),
    email: Joi.string().required().email().trim().min(4).max(100),
    password: Joi.string().required().trim().min(6).max(100),
  });

  return Schema.validate(data);
};
