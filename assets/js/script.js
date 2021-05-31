var apiKey="b9abceb7e557e8af7a7048ba9cc67d90";
var lat;
var lon;
var userRequestEl=document.querySelector("#user-request");
var cityNameEl=document.querySelector("#city-name");
var displayCityNameEl=document.querySelector("#display-city-name");
var displayDateEl=document.querySelector("#display-date");
var displayTempEl=document.querySelector("#display-temp");
var displayWindEl=document.querySelector("#display-wind");
var displayHumidityEl=document.querySelector("#display-humidity")
var displayUvIndexEl=document.querySelector("#display-uvindex");
var displayWeatherIconEl=document.querySelector("#weather-icon");
// var day1El=document.querySelector("#day-1");
// var day2El=document.querySelector("#day-2");
// var day3El=document.querySelector("#day-3");
// var day4El=document.querySelector("#day-4");
// var day5El=document.querySelector("#day-5");

var getCityWeather=function(city) {
    // format the openweathermap api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q="+city+"&appid="+apiKey;
    
    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayWeather(data,city);
        });
    });
};

var getCurrentData=function(getLat,getLon) {
    var currentApiUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+getLat+"&lon="+getLon+"&units=imperial&exclude=hourly,daily&appid="+apiKey;
    fetch(currentApiUrl).then(function(response){
        response.json().then(function(data){
            var unixTimesStamp=data.current.dt*1000
            var date= moment(unixTimesStamp).format(" (M/D/YYYY) ");
            displayDateEl.textContent=date;
            // get weather icon code
            var weatherIconNo = data.current.weather[0].icon;
            var weatherDesc = data.current.weather[0].description;
            displayWeatherIconEl.src="http://openweathermap.org/img/wn/"+weatherIconNo+".png";
            displayWeatherIconEl.alt=weatherDesc;
            displayTempEl.textContent=data.current.temp +" \xB0F";
            displayWindEl.textContent=data.current.wind_speed + " MPH";
            displayHumidityEl.textContent=data.current.humidity +" %";
            var uvIndex = data.current.uvi;
            if (uvIndex>5) {
                displayUvIndexEl.className="severe";
            } else if (uvIndex<=5 && uvIndex >2) {
                displayUvIndexEl.className="moderate";
            } else {
                displayUvIndexEl.className="favorable";
            }
            displayUvIndexEl.textContent=uvIndex; 
        });
    });
}

var getFiveDayForecast = function(getLat,getLon){
    var futureApiUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+getLat+"&lon="+getLon+"&units=imperial&exclude=current,minutely,hourly&appid="+apiKey;
    fetch(futureApiUrl).then(function(response){
        response.json().then(function(data){
            // loop over forecast data
            for (var i=1; i<6; i++) {
                
                // add date
                var dayEl=document.querySelector("#day-"+i);
                var unixTimesStamp=data.daily[i].dt*1000
                var date= moment(unixTimesStamp).format(" M/D/YYYY ");
                dayEl.textContent=date;

                // get weather icon code
                var weatherIconNo = data.daily[i].weather[0].icon;
                var weatherDesc = data.daily[i].weather[0].description;

                // add icon
                var dayListEl=document.querySelector("#day-"+i+"-items");
                var listEl = document.createElement("li");
                var listImgEl=document.createElement("img");
                listImgEl.src="http://openweathermap.org/img/wn/"+weatherIconNo+".png";
                listImgEl.alt=weatherDesc;
                listEl.append(listImgEl);
                listEl.classList.add("list-group-item", "p-1", "bg-dark", "border-0");
                dayListEl.replaceChildren();
                dayListEl.appendChild(listEl);

                // add temp
                var listTempEl = document.createElement("li");
                listTempEl.textContent="Temp: "+data.daily[i].temp.day +" \xB0F";
                listTempEl.classList.add("list-group-item", "p-1", "bg-dark", "border-0");
                dayListEl.appendChild(listTempEl);
                
                // add wind speed
                var listWindEl = document.createElement("li");
                listWindEl.textContent="Wind: "+data.daily[i].wind_speed + " MPH";
                listWindEl.classList.add("list-group-item", "p-1", "bg-dark", "border-0");
                dayListEl.appendChild(listWindEl);

                // add humidity
                var listHumidityEl = document.createElement("li");
                listHumidityEl.textContent="Humidity: "+ data.daily[i].humidity +" %";
                listHumidityEl.classList.add("list-group-item", "p-1", "bg-dark", "border-0");
                dayListEl.appendChild(listHumidityEl);
            };
        });
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityNameEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityNameEl.value="";
    } else {
        alert("Please enter a correct city name");
    }
};

var displayWeather = function(weather, searchTerm) {
    // clear current data
    displayDateEl.textContent="";
    displayTempEl.textContent="";
    displayWindEl.textContent="";
    displayHumidityEl.textContent="";

    displayCityNameEl.textContent=weather.city.name;

    // get coordinates
    lat=weather.city.coord.lat;
    lon=weather.city.coord.lon;

    // pass the coordinates to get the current data
    getCurrentData(lat,lon);

    // pass the coordinates to get the future data
    getFiveDayForecast(lat,lon);

}
userRequestEl.addEventListener("submit",formSubmitHandler);
// getCityWeather("toronto");
