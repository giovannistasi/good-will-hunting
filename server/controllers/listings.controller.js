'use strict';

const db = require('../models');

exports.getAll = async ctx => {
  try {
    ctx.body = await db.Listings.findAll();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.post = async ctx => {
  const listing = ctx.request.body;
  try {
    await db.Listings.create({
      listing_id: listing.listingId,
      description: listing.description,
      completed: listing.completed,
      pending: listing.pending,
      // posting_time: listing.posting_time, // sequelize adds timestamp automatically
      event_time: listing.eventTime,
      address: listing.address,
      credit_value: listing.creditValue,
      max_participants: listing.maxParticipants,
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};
