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

exports.postListing =  (job) => {
  const listing = fetch('http://localhost:8080/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ job })
  })
    .then(res => res.json())
    .then(job => job)
  return listing;
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

exports.fetchSkillsByUserId = () => {
  const skills = fetch('http://localhost:8080/user-skills', {
    credentials: 'include',
    method: 'GET'
  }).then(res => res.json())
  return skills
}

exports.deleteSkillByUserId = (skill) => {
  fetch('http://localhost:8080/user-skills', {
    credentials: 'include',
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skill })
  })
}

exports.authenticate = () => {
  const user = fetch('http://localhost:8080/auth', {
    credentials: 'include',
    method: 'GET'
  }).then(res => res.json())
  return user;
}