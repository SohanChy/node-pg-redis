'use strict'

// const { Scratchcard, Project } = require('../models')
const { transformResponseToCoreStyle,extractFilters,ApiError } = require("../../helpers/helpers")

// const knex = require('../../config/database')
const redis = require("../../redis");


function isValidCard(cardno){
  if(cardno.length !== 12){
    let e = new Error('Card no is invalid');
    e.status = 422;
    throw e;
  }
}

const lockCardTemporarily = async function(req, res){
  let cardno = req.params.card_no;
  isValidCard(cardno);

  const cardKey = 'lock:sc:'+cardno;

  let isLocked = await redis.getAsync(cardKey)
  if(isLocked){
    throw ApiError("Sorry, Card is being used at the moment and it is already locked!",409);
  }
  else {
    isLocked = redis.setAsync(cardKey,true);
  }

  if(isLocked){
    res.json({
      error: false,
      message: "Card has been locked."
    });
  }
  else {
    throw ApiError("Sorry, failed to lock card'!",500);
  }
}

const unlockCard = async function(req, res){
  let cardno = req.params.card_no;
  isValidCard(cardno);

  const cardKey = 'lock:sc:'+cardno;
  const result = await redis.delAsync(cardKey);

  if(result){
    return res.json({
      error: result,
      message: "Card has been unlocked."
    });
  }
  else {
    throw ApiError("Card was already unlocked!",422);
  }

}

module.exports = {
  lockCardTemporarily,
  unlockCard
}
