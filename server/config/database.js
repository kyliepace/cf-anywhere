'use strict';
module.exports = () => {
  return `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds029640.mlab.com:29640/cf-anywhere`
};
