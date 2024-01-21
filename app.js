import { carsData } from './data.js';
import { customMap } from './customFunctions.js';
import { customReduce } from './customFunctions.js';

// get parent element
const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
// display all items when page loads
window.addEventListener('DOMContentLoaded', function () {
  displayCars(carsData);
  displayCarButtons();
});

function displayCars(cars) {
  let displayMenu = cars.customMap((car) => {
    // console.log(car);

    return `<article class="car-item">
          <img src=${car.img} alt=${car.title} class="photo" />
          <div class="car-info">
            <header>
              <h4>${car.title}</h4>
              <h4 class="year">${car.year}</h4>
            </header>
            <p class="car-text">
              ${car.desc}
            </p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join('');
  // console.log(displayMenu);

  sectionCenter.innerHTML = displayMenu;
}

function pipe(...fns) {
  return (x) => fns.myCustomReduce((v, f) => f(v), x);
}

// Izdvajanje funkcije za izvlačenje kategorija
function extractCategories(data) {
  // Koristi se standardna 'reduce' funkcija
  const categories = data.myCustomReduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ['modeli']
  );

  // Vraća HTML string za svaku kategoriju
  return categories
    .customMap(
      (category) =>
        `<button type="button" class="filter-btn" data-id=${category}>${category}</button>`
    )
    .join('');
}

function displayCarButtons() {
  btnContainer.innerHTML = extractCategories(carsData);

  const filterBtns = btnContainer.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const category = e.currentTarget.dataset.id;

      // Filtrira i prikazuje automobile
      const filterAndDisplayCars = pipe(
        (data) =>
          data.filter(
            (car) => car.category === category || category === 'modeli'
          ),
        displayCars
      );

      filterAndDisplayCars(carsData);
    });
  });
}
