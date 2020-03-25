'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const listings = await db.Listing.findAll({
      include: [
        {
          model: db.User,
          attributes: ['firstName', 'lastName', 'picture', 'email']
        },
        {
          model: db.User,
          as: 'Volunteers'
        }
      ]
    });
    res.json(listings);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.getListingByUserId = async (req, res) => {
  try {
    const listings = await db.Listing.findAll({
      include: [
        {
          model: db.User,
          where: { userId: req.session.passport && req.session.passport.user.userId || null },
          attributes: ['firstName', 'lastName', 'picture', 'email'],
        }
      ]
    });
    res.json(listings);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.getListingByListingId = async (req, res) => {
  const listingId = req.body.listingId;
  try {
    const listings = await db.Listing.findAll({ where: { listingId } });
    res.json(listings);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.post = async (req, res) => {
  const listing = req.body.job;
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || null } })
    const newListing = await db.Listing.create(listing);
    await user.addListings(newListing);
    res.status = 200;
    res.json(newListing);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.delete = async (req, res) => {
  const removedListing = req.body
  try {
    await db.Listing.destroy({ where: { listingId: removedListing.listingId } });
    res.status = 200;
    res.json(removedListing)
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.volunteer = async (req, res) => {
  const listingId = req.body.listingId
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || null } })
    const listing = await db.Listing.findOne({
      where: { listingId: listingId },
      include: [
        {
          model: db.User,
        }
      ]
    });
    if (user.userId !== listing.Users[0].userId) {
      await db.Listing.decrement('maxParticipants', { where: { listingId: listingId } });
    }
    await user.addVolunteeredFor(listing);
    res.status = 200;
    res.json(listing);
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};