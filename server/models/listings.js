const pool = require('./db');

exports.getAllListings = async () => {
  const res = await pool.query('SELECT * FROM listings;');
  return res.rows;
};

exports.addListing = async listing => {
  const res = await pool.query(`INSERT INTO listings (listing_id, description, completed, pending, posting_time, event_time, address, credit_value, max_participants) VALUES ('${listing.listingId}', ${listing.description}, ${listing.completed}, ${listing.pending}, ${listing.postingTime}, ${listing.eventTime}, ${listing.address}, ${listing.creditValue}, ${listing.maxParticipants}) RETURNING *`);
  return res.rows;
};

exports.deleteListing = async listing => {
  const res = await pool.query();
}

