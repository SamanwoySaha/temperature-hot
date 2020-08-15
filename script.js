const apiKey = '7ec341475f49950edbb57eeb7aad7b8b';

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search-btn');

// Search Button Event Handler
searchBtn.addEventListener('click', function() {
    if(searchTerm.value === '' || searchTerm.value === null){
        alert('Please enter Search Term');
    }
    else{
        getWeatherInfo();
        searchTerm.value = '';
    }
}); 

async function getWeatherInfo() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm.value}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        setWeatherInfo(data);
    }       
    catch(err) {
        alert(err);
    }
}

function setWeatherInfo(data) {
    const icon = document.getElementById('icon');
    const iconCode = data.weather[0].icon;
    const area = document.getElementById('area');
    const temp = document.getElementById('temp');
    const weatherInfo = document.getElementById('weather-condition');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const weatherCondition = data.weather[0].main;

    icon.src = "http://openweathermap.org/img/w/" + iconCode + ".png";
    icon.style.transform = 'scale(2)';
    area.innerText = data.name;
    temp.innerText = data.main.temp;
    weatherInfo.innerText = data.weather[0].description;
    windSpeed.innerText = data.wind.speed;
    humidity.innerText = data.main.humidity;

    changeBackground(weatherCondition);
}

function changeBackground(data) {
    switch(data){
        case 'Clear':
            document.body.style.background = `url("images/clear.jpg") no-repeat center/cover`;
            break;
        case 'Clouds':
            document.body.style.background = `url("images/cloud.jpg") no-repeat center/cover`;
            break;
        case 'Rain':
        case 'Drizzle':
            document.body.style.background = `url("images/rain.jpg") no-repeat center/cover`;
            break;
        case 'Mist':
            document.body.style.background = `url("images/hazzy.jpg") no-repeat center/cover`;
            break;
        case 'Thunderstorm':
            document.body.style.background = `url("images/storm.jpg") no-repeat center/cover`;
            break;
        case 'Snow':
            document.body.style.background = `url("images/snow.jpg") no-repeat center/cover`;
            break;
        default: 
            break;
    }
}