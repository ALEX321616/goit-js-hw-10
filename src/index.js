import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

import './css/styles.css';
//import countryCardTpl from `./templates/country-card.hbs`
//console.log(countryCardTpl);

import debounce from 'lodash.debounce';
const searchParams = '?fields=name.official,capital,population,flags.svg,languages';
const DEBOUNCE_DELAY = 300;
const refs = {
  btnSearchEl: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.btnSearchEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(e) {
  const name = e.target.value.trim();
  if (name.length === 0) {
    refs.countryListEl.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countris => renderCoutrisList(countris))
    .catch(error => {
      console.error();
    });
}

function renderCoutrisList(countris) {
  console.log(countris);
  let markup = '';
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
  if (countris.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countris.length > 1) {
    markup = countris
      .map(country => {
        return `<li class= item__country> <img  src=${country.flags.svg} alt="Flag of ${country.name.official}" height = auto width = 50 ></img><p class = descrip_country>${country.name.official}</p></li>`;
      })
      .join('');

    refs.countryListEl.innerHTML = markup;
  } else {
    markup = countris
      .map(country => {
        return `<p class = card_country><img class=big_flag src=${country.flags.svg} alt="Flag of ${
          country.name.official
        }" height = auto width = 150></img>${
          country.name.official
        }</p><p class=card_info_country>Capital:<span class = card_info_value>${
          country.capital
        }</span></p><p class=card_info_country>Population:<span class = card_info_value>${
          country.population
        }</span></p><p class=card_info_country>Languages:<span class = card_info_value>${Object.values(
          country.languages,
        )}</span></p>`;
      })
      .join('');

    refs.countryInfoEl.innerHTML = markup;
    console.log(countris.capital);
  }
}

//**//**//**//**//**//**//**//**//**//**//
// Notiflix.Notify.success('');
// Notiflix.Notify.failure('');
//  Notiflix.Notify.info('');
