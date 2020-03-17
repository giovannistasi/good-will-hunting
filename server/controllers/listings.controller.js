'use strict';

const db = require('../models');

exports.getAll = async (req, res) => {
  try {
    const listings = await db.listings.findAll();
    res.json(listings);
  } catch (e) {
    console.error(e);
    res.status = 500;
    // Further handle your error on the back-end
  }
};

exports.post = async (req, res) => {
  const listing = req.body;
  try {
    await db.listings.create(listing);
    res.json(listing);
    res.status = 200;
  } catch (e) {
    console.error(e);
    res.status = 500;
    // Further handle your error on the back-end
  }
};
