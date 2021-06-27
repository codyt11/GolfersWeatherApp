const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();



const updateUI = (data) => {

        const { cityDetails, weather, fiveDay } = data
        
        //update details template
        details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Imperial.Value}</span>
                <span>&deg; F</span>
            </div>
        `;

        
        

        //update the night/day & icon
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
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
        
        const cardDay = (day) => {
            const container = document.createElement('div');
            const dayOfWeek = document.createElement('div');
            const iconPhrase = document.createElement('div');
            const maxT = document.createElement('div');
            const minT = document.createElement('div');

            dayOfWeek.classList.add('dayOfWeek');
            iconPhrase.classList.add('iconPhrase');
            maxT.classList.add('maxT');
            minT.classList.add('minT');
            container.classList.add('daysContainer')

            details.appendChild(container);
            container.appendChild(dayOfWeek);
            container.appendChild(iconPhrase)
            container.appendChild(iconPhrase);
            container.appendChild(maxT);
            container.appendChild(minT);
            
    
            dayOfWeek.textContent = dateFns.format(day.Date, 'dddd');
            iconPhrase.textContent = day.Day.IconPhrase;
            maxT.textContent = `High: ${day.Temperature.Maximum.Value} \u00B0 F`;
            minT.textContent = `Low: ${day.Temperature.Minimum.Value} \u00B0 F`;
            console.log(dayOfWeek)
            return dayOfWeek
        }

        // update five day forecast
        const days = fiveDay.forEach((day) => {
            cardDay(day);  
        })
        
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value2222
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage
    let cityStored = localStorage.setItem('city', city)
})

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
