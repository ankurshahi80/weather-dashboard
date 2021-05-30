var apiKey="b9abceb7e557e8af7a7048ba9cc67d90";
var userRequestEl=document.querySelector("#user-request");
var cityNameEl=document.querySelector("#city-name");
var getCityWeather=function(city) {
    // format the openweathermap api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;
    
    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

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
userRequestEl.addEventListener("submit",formSubmitHandler);
// getCityWeather("toronto");
