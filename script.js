//Variable to contain searched locations
var city="";

// Declared Variables
var searchLocation = $("#searchLocation");
var searchClick = $("#searchButton");
var clearSearches = $("#clearAll");
var currentLocation = $("#currentLoc");
var currentTemp = $("#temp");
var currentHum= $("#hum");
var currentWindSpeed=$("#windSpeed");
var currentUvindex= $("#uvIndx");
var searchedLocations=[];

// Search to see if the location exists in previous entries in local storage
function find(c){
    for (var i=0; i<searchedLocations.length; i++){
        if(c.toUpperCase()===searchedLocations[i]){
            return -1;
        }
    }
    return 1;
}

// API key
var APIKey="3f5eeceaae5ba710debb32e410bc047d";

// Show curent and future forecast after location search
function showWeather(event){
    event.preventDefault();
    if(searchLocation.val().trim()!==""){
        city=searchLocation.val().trim();
        myWeather(city);
    }
}

//AJAX call
function myWeather(city){

    // URL to pull server data
    var openWeaURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:openWeaURL,
        method:"GET",
    }).then(function(response){

        // Parse to show the desired location name, weather icon, and current weather conditions 
        console.log(response);

        // Server side Api for the icon display
        var wIcon= response.weather[0].icon;
        var cardIconurl="https://openweathermap.org/img/wn/"+wIcon +"@2x.png";

        // Date format syntax was used from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        var date=new Date(response.dt*1000).toLocaleDateString();

        // Get the name of the location and show the date plus icon
        $(currentLocation).html(response.name +"("+date+")" + "<img src="+cardIconurl+">");

        // parse to show the current temperature and convert to fahrenheit
        var tempFahr = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((tempFahr).toFixed(2)+"&#8457");

        // Show Humidity
        $(currentHum).html(response.main.humidity+"%");

        //Display Wind speed and convert to MPH
        var wSpeed=response.wind.speed;
        var wsmph=(wSpeed*2.237).toFixed(1);
        $(currentWindSpeed).html(wsmph+"MPH");
    


//Clear History
function clear(event){
    event.preventDefault();
    searchedLocations=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}

