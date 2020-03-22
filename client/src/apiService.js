exports.fetchListings = async () => {
  console.log('hello');

  await fetch('http://localhost:8080/listings', {
    method: 'GET'
  }).then(async res => {

    const data = await res.json()
    console.log(data);

    return data
  }).then(data => {
    console.log(data);

  })
}