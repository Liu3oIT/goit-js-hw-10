export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const KEY_URL = `live_nNo73EOffwjTGIEI06vP19IfHqwvqjvyXSQVmj4RCh9eASwbAeTTF6mMQPBrqT43`;
  return fetch(`${BASE_URL}?api_key=${KEY_URL}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      console.warn('Error:', error);
      return [];
    });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const KEY_URL = `live_nNo73EOffwjTGIEI06vP19IfHqwvqjvyXSQVmj4RCh9eASwbAeTTF6mMQPBrqT43`;
  return fetch(`${BASE_URL}?breed_ids=${breedId}&api_key=${KEY_URL}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const cat = data[0];
      const breed = cat.breeds[0];

      return {
        imageUrl: cat.url,
        breedName: breed.name,
        description: breed.description,
        temperament: breed.temperament,
      };
    })
    .catch(error => {
      console.warn('Error:', error);
      return null;
    });
}
