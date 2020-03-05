const Wod = require('../models/wod');


exports.add = async ctx => {
  const { body } = ctx.request;
  if (!body){
    ctx.status = 400;
    ctx.body = {
      error: 'Missing body'
    }
    return ctx;
  }
  const newWod = new Wod(body);
  await newWod.save();
  ctx.status = 200;
  ctx.body = newWod._doc;
  return ctx;
};

