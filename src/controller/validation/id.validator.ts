import Joi from 'joi';

export const idValidation = Joi.object().keys({
  id: Joi.number().integer().required(),
});
