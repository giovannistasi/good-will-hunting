'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const listings = await db.Listing.findAll({
      include: [
        {
          model: db.User,
          attributes: ['firstName', 'lastName', 'picture', 'email']
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

exports.post = async (req, res) => {
  const listing = req.body.job;
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || null } })
    const newListing = await db.Listing.create(listing);
    await user.addListings(newListing);
    res.json(newListing);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.delete = async (req, res) => {
  const removedListing = req.body
  try {
    await db.Listing.destroy({ where: { listingId: removedListing.listingId } });
    res.json(removedListing)
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};

exports.volunteer = async (req, res) => {
  const listingId = req.body.listingId
  try {
    const user = await db.User.findOne({ where: { userId: req.session.passport && req.session.passport.user.userId || "40ef4940-6d01-11ea-9ea1-6d07aef08093" } })
    const newVolunteer = await db.Volunteer.create();
    await listing.addVolunteers(newVolunteer);
    res.json(newVolunteer);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};