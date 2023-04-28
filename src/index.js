import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  if (!evt.target.value) {
    cleanFields();
    return;
  }
  const name = evt.target.value.toLowerCase().trim();

  fetchCountries(name)
    .then(data => {
      if (data.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = createMarkupCountry(data);
      } else if (data.length > 2 && data.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = createMarkupList(data);
      } else if (data.length > 10) {
        Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        cleanFields();
      }
    })
    .catch(err => {
      cleanFields();
      Notify.failure(`Oops, there is no country with that name`);
    });
}

function createMarkupList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li class='country-list-item'><img class='country-list-picture' src="${flags.svg}" alt="${flags.alt}"><p>${name.common}</p></li>`
    )
    .join('');
}
function createMarkupCountry(data) {
  const { name, flags, capital, languages, population } = data[0];
  const languagesArr = Object.values(languages);
  return `<img class = 'country-picture' src="${flags.svg}" alt="${flags.alt}"><h3>${name.common}</h3><p ><span class='country-descr'>Capital: </span>${capital}</p><p><span class='country-descr'>Population: </span>${population}</p><p> <span class='country-descr'> Languages: </span>${languagesArr}</p>`;
}
function cleanFields() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
