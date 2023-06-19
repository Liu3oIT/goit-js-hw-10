import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#selectElement');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');
const loaderElement = document.querySelector('.loader');

new SlimSelect({
  select: breedSelect,
});

function showError() {
  errorElement.classList.remove('hidden');
}

function hideError() {
  errorElement.classList.add('hidden');
}

function showLoader() {
  loaderElement.classList.remove('hidden');
}

function hideLoader() {
  loaderElement.classList.add('hidden');
}

function displayCatInfo(cat) {
  if (!cat) {
    Notiflix.Notify.failure('Oops! Something went wrong!');
    catInfo.innerHTML = '';
    return;
  }

  catInfo.innerHTML = `
    <img src="${cat.imageUrl}" alt="Cat Image">
    <div class="info-for-cat">
      <h2>${cat.breedName}</h2>
      <p>${cat.description}</p>
      <p><span class="temperament">Temperament:</span> ${cat.temperament}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      breedSelect.slim.setData(
        breeds.map(breed => ({ value: breed.id, text: breed.name }))
      );
      hideLoader();
    })
    .catch(error => {
      console.warn('Error:', error);
      hideLoader();
    })
    .finally(() => {
      hideLoader();
    });
});

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      console.warn('Error:', error);
      displayCatInfo(null);
      hideLoader();
    })
    .finally(() => {
      hideLoader();
    });
});
