exports.fetchListingsByUserId = () => {
  const listings = fetch('http://localhost:8080/user-listings', {
    credentials: 'include',
    method: 'GET'
  }).then(res => res.json())
  return listings
}

exports.fetchListingsAll = () => {
  const listings = fetch('http://localhost:8080/listings', {
    method: 'GET'
  }).then(res => res.json())
  return listings
}