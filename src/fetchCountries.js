import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
//const searchParams = '?fields=name.official,capital,population,flags.svg';
export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countris => {
      return countris;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      //console.error();
    });
}
//console.log(countryCardTpl);
