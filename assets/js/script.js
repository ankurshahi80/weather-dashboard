var apiKey="b9abceb7e557e8af7a7048ba9cc67d90";
var getCityWeather=function(city) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey);
};
getCityWeather("toronto");
