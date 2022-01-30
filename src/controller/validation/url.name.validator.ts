import Joi from 'joi';

export const urlValidation = Joi.object().keys({
  name: Joi.string().min(2).required(),
  Location: Joi.string().min(2).required(),
  ETag: Joi.string().min(2),
  key: Joi.string().min(2),
  Key: Joi.string().min(2),
  Bucket: Joi.string().min(2),
});

