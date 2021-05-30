var apiKey="b9abceb7e557e8af7a7048ba9cc67d90";
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
getCityWeather("toronto");
