const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/AutorizationErrors');

const { NODE_ENV = 'production', JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AutorizationError('Ошибка авторизаци');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AutorizationError('Ошибка авторизации');
  }
  req.user = payload;
  next();
};
