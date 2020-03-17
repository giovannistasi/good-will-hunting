'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const listings = await db.listings.findAll({
      include: [
        {
          model: db.users,
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
    const user = await db.users.findOne({ where: { userId: req.session.id } })
    const newListing = await db.listings.create(listing);
    await user.addListings(newListing);
    res.json(newListing);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
};