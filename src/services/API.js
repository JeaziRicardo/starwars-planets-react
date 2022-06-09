async function fetchAPI() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(URL);
  const { results } = await request.json();
  return results;
}

export default fetchAPI;
