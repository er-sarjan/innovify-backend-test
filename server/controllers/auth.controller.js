import jwt from 'jsonwebtoken';
import _ from 'lodash';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';

// sample user, used for authentication
const users = [{
  _id: '507f191e810c19729de860ea',
  username: 'react',
  password: 'express',
  role: 'user'
}, {
  _id: '507f1f77bcf86cd799439011',
  username: 'angular',
  password: 'universal',
  role: 'admin'
}, {
  _id: '5349b4ddd2781d08c09890f4',
  username: 'vue',
  password: 'another',
  role: 'tester'
}];


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  const user = _.chain(users)
    .filter({ username: req.body.username, password: req.body.password })
    .head()
    .value();
  if (user) {
    const token = jwt.sign({
      username: user.username,
      _id: user._id,
      role: user.role
    }, config.jwtSecret);
    return res.json({
      token,
      username: user.username,
      _id: user._id
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
