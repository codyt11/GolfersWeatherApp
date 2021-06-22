const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



const updateUI = (data) => {

        const { cityDetails, weather } = data

        //update details template

        details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Imperial.Value}</span>
                <span>&deg;</span>
            </div>
        `;

        //update the night/day & icon
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        console.log(iconSrc)
        icon.setAttribute('src', iconSrc);

        let timeSrc = null;
        if(weather.IsDayTime){
            timeSrc = 'img/day.svg';
        } else {
            timeSrc = 'img/night.svg';
        }
        time.setAttribute('src', timeSrc)

        if(card.classList.contains('d-none')){
            card.classList.remove('d-none')
        }
}
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})