const BASE_URL = 'https://restcountries.com/v3.1/';
const ENDPOINT_COUNTRIES = 'name/';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});
export function fetchCountries(name) {
  return fetch(`${BASE_URL}${ENDPOINT_COUNTRIES}${name}?${searchParams}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    }
  );
}
