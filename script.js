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
    


//Clear History
function clear(event){
    event.preventDefault();
    searchedLocations=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}

