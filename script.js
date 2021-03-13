const searchLocation = document.querySelector('.locationSearch');
const searchCenter = document.querySelector('.centerSearch');
const locationMatch = document.querySelector('.matchLocation');
const centerMatch = document.querySelector('.matchCenter');
const searchedCity = document.querySelector('#cities');
const searchedCenter = document.querySelector('#centers');
const bookingDate = document.querySelector('#bookingDate');
const calendar = document.querySelector('.calendar');
const datafieldClass = document.querySelector('#proceduredateslist');


// bookingDate.setAttribute('min', new Date().toISOString().split("T")[0]); // setting value of minimum date to today


let selectLocation = '';
let selectCenter = '';
// Getting data from the json file

const searchCity = async searchText => {
  const res = await fetch('../data/city.json');
  const cities = await res.json();

  // filtering out data according to the user input

  let cityMatches = cities.filter(city => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return city.city.match(regex);
  });

  // clearing the list of array when nothing is written on input field
  if (searchText.length === 0) {
    cityMatches = [];
    searchCenter.value = null;
  }

  outputMatches(cityMatches);
}

// display the output on the card list
const outputMatches = values => {

  if (values.length > 0) {
    searchedCity.innerHTML = null; // clearing the card data whenever user input changes
    searchedCenter.innerHTML = null
    searchCenter.value = null;

    for (let i in values) {
      selectLocation = `<li value="${values[i].city}" id='${values[i].city}' class='citySearched'>${values[i].city}</li>`;
      searchedCity.innerHTML += selectLocation;
      searchedCity.addEventListener('click', (e) => {
        searchedCenter.innerHTML = null;
        searchLocation.value = e.target.innerHTML;
        searchedCity.innerHTML = null;
        searchCenter.focus();

        for (let j in values) {
          selectCenter = values.find(element => element.city === searchLocation.value)
        }
        const searchedData = Object.values(selectCenter)[1];
        console.log(searchedData);
        searchCenter.addEventListener('input', () => citySearch(searchCenter.value));

        const citySearch = center => {
          let centerMatches = searchedData.filter(centers => {
            const regex = new RegExp(`^${center}`, 'gi');
            return centers.match(regex);
          });
          // console.log(centerMatches);
          searchedCenter.innerHTML = null;

          for (i in centerMatches) {
            const searchedValue = `<li value="${centerMatches[i]}" id='${centerMatches[i]}' class='centerSearched'>${centerMatches[i]}</li>`;
            searchedCenter.innerHTML += searchedValue;
            searchedCenter.addEventListener('click', (e) => {
              searchCenter.value = e.target.innerHTML;
              searchedCenter.innerHTML = null;
            })
          }
        }
      })
    }
  }
  else {
    searchedCity.innerHTML = null;
    searchCenter.innerHTML = null;
  }

}


// const searchDate = async () => {
//   const res = await fetch('../data/city.json');
//   const availDates = await res.json();
//   for (let m = 0; m < availDates.length; m++) {
//     if (availDates[m].city === searchLocation.value) {
//       for (let n = 0; n < availDates[m].dates.length; n++) {
//         const optionValue = document.createElement('option');
//         optionValue.value = availDates[m].dates[n];
//         datafieldClass.append(optionValue);
//       }
//     }
//   }
// }

searchLocation.addEventListener('input', () => searchCity(searchLocation.value));


