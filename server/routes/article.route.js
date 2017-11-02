import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import validation from '../validation/article-validation';
import * as articleCtrl from '../controllers/article.controller';
import manager from '../acl-manager/article-control.manager';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

// TODO: Task 1 - security validation
// validate all path of article with Authorization
router.all('/', expressJwt({ secret: config.jwtSecret }));


router.route('/')

  // TODO: Task 2 - manage role and permission (ACL) with security
  /** POST /api/articles/ - Create article of logged in user */
  .post(validate(validation.create), manager.createArticle,
    articleCtrl.createArticle)

  /** GET /api/articles/ - Get article list of all users */
  .get(articleCtrl.getArticles);


// TODO: Get, Update, Delete functionality not integrated


export default router;
