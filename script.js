var data;
function onSelectChange() {
    let categoryType = document.getElementById("city");
    let vcity = categoryType.options[categoryType.selectedIndex].value;
    let lat;
    let lon;
    console.log(vcity);
    switch(vcity){
        case "ny":
            lat=40.7128;
            lon=-74.0060;
            break;
        case "del":
            lat=28.7041;
            lon=77.1025;
            break;
        case "lond":
                lat=51.5072;
                lon=-0.1276;
                break;  
        case "tok":
            lat=35.6762;
            lon=139.6503 ;
            break;
        case "syd":
            lat=-33.87;
            lon=151.21;
            break;  
        default:
            console.log("Error");
            break;
    }
    let p = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=auto`);
p.then(
    (response)=>
    {
    return response.json()
    }).then((response)=>{
        data = (response);
        console.log(data)
        let temperature = data.current_weather.temperature
        let latitude = data.latitude;
        let longitude = data.longitude;
        let maxt = data.daily.temperature_2m_max[0];
        let mint = data.daily.temperature_2m_min[0];
        let wins = data.current_weather.windspeed;
        let wind = data.current_weather.winddirection;
        let t = data.current_weather.time.split("T");
        let time = t[1]
        let date = t[0]
        let wc = data.current_weather.weathercode;

        if(wc==0||wc==1)
        {
            svg.innerHTML = `<img src="clear.svg" alt="Nope">`
            weather.innerHTML = ("clear")
        }
        else if(wc==2||wc==3){
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-clouds-fill" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5z" id="mainIconPathAttribute" filter="url(#shadow)"></path> <path d="M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z" id="mainIconPathAttribute"></path> <filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter></svg>`
            weather.innerHTML = ("cloudy")
        }
        else if(wc==45||wc==48){
            weather.innerHTML = ("Fog")
        }
        else if(wc>50||wc<58){
            weather.innerHTML = ("Drizzle")
        }
        else if(wc>60||wc<68){
            weather.innerHTML = ("Rain")
        }
        else if(wc>70||wc<78){
            weather.innerHTML = ("Snowfall")
        }
        else if(wc>79||wc<83){
            weather.innerHTML = ("Rain Showers")
        }
        else if(wc>84||wc<87){
            weather.innerHTML = ("Snow Showers")
        }
        else{
            weather.innerHTML = ("Thunderstorm")
        }
        temp.innerHTML =  `Temperature ${temperature}&#xb0`
        lati.innerHTML = "Latitude " + latitude
        long.innerHTML = "Longitude " + longitude
        ti.innerHTML = "Time: " + time
        dates.innerHTML = "Date: " + date;
        max.innerHTML = "Maximum Temperature: " + maxt
        min.innerHTML = "Minimum Temperature: " + mint
    });
  }
submit.addEventListener("click", onSelectChange)
