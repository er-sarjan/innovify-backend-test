import Joi from 'joi';

import { validationOptions, stringLanguageOption } from './common.validation';

const article = {};

const articleBody = {
  title: Joi.string().trim().min(10).max(200)
    .required()
    .label('Article title')
    .options(stringLanguageOption),
  body: Joi.string().trim().min(500)
    .required()
    .label('Article body')
    .options(stringLanguageOption),
  userId: Joi.string().trim().regex(/^[0-9a-fA-F]{24}$/)
    .options(stringLanguageOption)
};

article.create = {
  options: validationOptions,
  body: articleBody
};

export default article;
