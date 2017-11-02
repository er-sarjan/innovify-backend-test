import httpStatus from 'http-status';
import accessControl from './access-control';
import APIError from '../helpers/APIError';

const articlePermission = {};
const err = new APIError('You are not allowed to do this operation!',
  httpStatus.FORBIDDEN, true);

articlePermission.createArticle = createArticle;
articlePermission.readArticle = readArticle;

export default articlePermission;

function createArticle(req, res, next) {
  const userControl = accessControl.can(req.user.role);
  // Check own or any based on current user id with article's user id
  const permission = req.body.userId === req.user._id
    ? userControl.createOwn('article') : userControl.createAny('article');
  if (permission.granted) next();
  else next(err);
}

function readArticle(req, res, next) {
  const userControl = accessControl.can(req.user.role);
  const permission = userControl.readAny('article');
  if (permission.granted) next();
  else next(err);
}
