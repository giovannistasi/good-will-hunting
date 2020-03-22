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

exports.post = async (req, res) => {
  const listing = req.body;
  try {
    const user = await db.User.findOne({ where: { userId: "3fa69f80-6986-11ea-8277-033864135ace" } })
    const newListing = await db.Listing.create(listing);
    await user.addListings(newListing);
    res.json(newListing);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};