import { initialTours } from "./data.js";
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function init() {
    const countries = []
    initialTours.forEach(tour=>{
        if(!countries.includes(tour.country)){
            countries.push(tour.country)
        }
    })
    const search_country = document.getElementById('country')
    countries.forEach(country=>{
        const country_option = document.createElement('option')
        country_option.textContent=country

        search_country.append(country_option)
    })
    const categories = []
    initialTours.forEach(tour=>{
        if(!categories.includes(tour.category)){
            categories.push(tour.category)
        }
    })
    const search_category = document.getElementById('category')
    categories.forEach(category=>{
        const category_option = document.createElement('option')
        category_option.textContent=category

        search_category.append(category_option)
    })
    const country = getParameterByName('country')
    const category = getParameterByName('category')
    document.getElementById('country').value = country;
    document.getElementById('category').value = category;
    const tours_filter = initialTours.filter(tour => tour.country === country && tour.category === category);
    const tours_for_you = document.getElementById('tours_for_you')
    tours_filter.forEach(tour=>{
        const tour_card=document.createElement('div')
        tour_card.classList.add('tour_item')
        const tour_image = document.createElement('img')
        tour_image.src=tour.img
        const tour_city = document.createElement('h3')
        tour_city.textContent=tour.city
        const tour_description = document.createElement('p')
        tour_description.textContent=tour.description

        tour_card.append(tour_image, tour_city, tour_description)

        tours_for_you.append(tour_card)
    })
}
async function reload() {
    const elementsToRemove = document.querySelectorAll('.tour_item');
    if (elementsToRemove.length > 0) {
    elementsToRemove.forEach(element => {
        element.remove();
    });
    }
    country = document.getElementById('country').value;
    category = document.getElementById('category').value;
    const tours_filter = initialTours.filter(tour => tour.country === country && tour.category === category);
    const tours_for_you = document.getElementById('tours_for_you')
    tours_filter.forEach(tour=>{
        const tour_card=document.createElement('div')
        tour_card.classList.add('tour_item')
        const tour_image = document.createElement('img')
        tour_image.src=tour.img
        const tour_city = document.createElement('h3')
        tour_city.textContent=tour.city
        const tour_description = document.createElement('p')
        tour_description.textContent=tour.description

        tour_card.append(tour_image, tour_city, tour_description)

        tours_for_you.append(tour_card)
    })
}
init();

const search_now_button = document.getElementById('search_now_button')
search_now_button.addEventListener('click', reload)
