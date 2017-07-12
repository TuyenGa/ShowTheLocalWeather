$(document).ready(function(){

    var long;
    var lat;


    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=dc7a71bc39c83ad956b9da6c35ee4954&units=matric';
            $.getJSON(api,function(data){
                var celsius;
                var kelvin;
                var ftemp;
                var weatherType = data.weather[0].description;
                var windSpeed = data.wind.speed;
                kelvin = data.main.temp;
                var tempSwap = true;
                var city = data.name;
                celsius =(kelvin - 273.15).toFixed(1) ;
                ftemp = ((kelvin)*(9/5) -459.67).toFixed(1);

                $("#city").html(city);
                $("#weatherType").html(weatherType);
                windSpeed = (2.237*(windSpeed)).toFixed(1);
                $("#windSpeed").html(windSpeed +" mph" );
                $("#fTemp").html(celsius +" &#8451");
               $("#fTemp").click(function () {
                   if(tempSwap === false)
                   {
                       $("#fTemp").html(celsius +" &#8451");
                       tempSwap = true;
                   }
                   else
                   {
                       $("#fTemp").html(ftemp+" &#8457");
                       tempSwap = false;
                   }
               });

                var iconCode = data.weather[0].icon;
                var urlIcon = "http://openweathermap.org/img/w/" + iconCode +".png";
                $("#icon-Weather").html("<img src='"+urlIcon+"'>");
            });
        });
    }


});