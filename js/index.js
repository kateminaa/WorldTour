import { initialTours } from "./data.js";
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
    const popular_box = document.getElementById('popular_box')
    initialTours.forEach(tour=>{
        const tour_card=document.createElement('div')
        tour_card.classList.add('popular_items')
        const tour_image = document.createElement('img')
        tour_image.src=tour.img
        const tour_city = document.createElement('h3')
        tour_city.textContent=tour.city
        const tour_description = document.createElement('p')
        tour_description.textContent=tour.description

        tour_card.append(tour_image, tour_city, tour_description)

        popular_box.append(tour_card)
    })
}

init();