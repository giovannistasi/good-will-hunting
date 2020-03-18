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
    const user = await db.User.findOne({ where: { userId: "79821dea-6910-11ea-bc55-0242ac130003" } })
    const newListing = await db.Listing.create(listing);
    await user.addListings(newListing);
    res.json(newListing);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};