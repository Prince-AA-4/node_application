import Joi from 'joi';

export const postSchema = Joi.object({
  title: Joi.string().required().messages({ message: "Title is required" }),
  content: Joi.string().required().messages({ message: "Content is required" }),
});


// work on the updatePostschema