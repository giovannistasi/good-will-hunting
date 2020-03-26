'use strict';

const db = require('../models');

exports.exchange = async (req, res) => {
  const { participants, creator, creditValue, listingId } = req.body;
  try {
    participants.forEach(el => {
      db.User.increment(['credits'], { where: { userId: el }, by: creditValue })
    })
    db.User.decrement(['credits'], { where: { userId: creator }, by: creditValue * participants.length })
    const listing = db.Listing.update({ completed: true }, { where: { listingId: listingId } })
    res.status = 200;
    res.json(listing);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};