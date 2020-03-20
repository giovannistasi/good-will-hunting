exports.fetchListings = () => {
  const listings = fetch('http://localhost:8080/listings', {
    method: 'GET'
  }).then(res => res.json())
  return listings
}