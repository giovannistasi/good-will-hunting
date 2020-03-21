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

exports.postUserSkill = async (skill) => {
  const newSkill = fetch('http://localhost:8080/skills', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ skill })
  })
    .then(res => res.json())
    .then(skill => skill)

  return newSkill
}
