import Joi from "joi";

export const registerationSchema = Joi.object({
  fullname: Joi.string()
    .required()
    .messages({ message: " fullname is required" }),
  username: Joi.string().alphanum().min(4).max(8).required().messages({
    message: "username is required and should be between 4 and 8 characters",
  }),
  dob: Joi.date().less(Date.now()).required().messages({
    message: "Date of birth is required and should be a valid date in the past",
  }),
  gender: Joi.string().required().messages({ message: "gender is required" }),
  contact: Joi.string().required().messages({
    empty: "contact is required",
    alreadyexists:
      "Contact already exists. Please check your number and dial again",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).max(15).required().messages({
    empty: "Password is required",
    wrongLength: "Password should be at least 6 characters and at most 15",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).max(15).required().messages({
    empty: "Password is required",
    wrongLength: "Password should be at least 6 characters and at most 15",
  }),
});


export const updateUserSchema = Joi.object({
  fullname: Joi.string()
    .optional()
    .messages({ message: " fullname is required" }),
  username: Joi.string().alphanum().min(4).max(8).optional().messages({
    message: "username is required and should be between 4 and 8 characters",
  }),
  dob: Joi.date().less(Date.now()).optional().messages({
    message: "Date of birth is required and should be a valid date in the past",
  }),
  gender: Joi.string().optional().messages({ message: "gender is required" }),
  contact: Joi.string().optional().messages({
    empty: "contact is required",
    alreadyexists:
      "Contact already exists. Please check your number and dial again",
  }),
});