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
        case "pc":
            lat="19.4564";
            lon="72.7925"; 
        default:
            console.log("Error");
            break;
    }
    let p = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum&current_weather=true&forecast_days=1&timezone=auto`);
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
        let preci = data.daily.precipitation_sum[0];
        let rains = data.daily.rain_sum[0];
        let rise = data.daily.sunrise[0].split("T")[1];
        let set = data.daily.sunset[0].split("T")[1];
        console.log(preci, rain, rise, set)
        if(wc==0||wc==1)
        {
            card1.style.background = "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)";
            svg.innerHTML = `<img src="clear.svg" alt="Nope">`
            weather.innerHTML = ("clear")
        }
        else if(wc==2||wc==3){
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-clouds-fill" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5z" id="mainIconPathAttribute" filter="url(#shadow)"></path> <path d="M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z" id="mainIconPathAttribute"></path> <filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter></svg>`
            weather.innerHTML = ("cloudy")
        }
        else if(wc==45||wc==48){
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="IconChangeColor" height="200" width="200"> <g> <path fill="none" d="M0 0h24v24H0z" id="mainIconPathAttribute" filter="url(#shadow)"></path> <path d="M1.584 13.007a8 8 0 0 1 14.873-5.908 5.5 5.5 0 0 1 6.52 5.908h-2.013A3.5 3.5 0 0 0 15 10.05V10a6 6 0 1 0-11.193 3.007H1.584zM4 19h17v2H4v-2zm-2-4h21v2H2v-2z" id="mainIconPathAttribute"></path> </g> <filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter></svg>`
            weather.innerHTML = ("Fog")
        }
        else if(wc>50||wc<58){
            card1.style.backgroundImage = "url(weather/drizzle.jpg)";
            card1.style.backgroundRepeat = "no-repeat";
            card1.style.backgroundSize = "105% 105%";
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z" id="mainIconPathAttribute" stroke-width="0" stroke="#ff0000"></path> </svg>`
            weather.innerHTML = ("Drizzle")
        }
        else if(wc>60||wc<68){
            svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z" id="mainIconPathAttribute"></path> </svg>`
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
        temp.innerHTML =  `${temperature}&#8451`;
        lati.innerHTML = "Latitude " + latitude
        long.innerHTML = "Longitude " + longitude
        ti.innerHTML = "Last Updated(Local Time): "+time
        dates.innerHTML = "Date: " + date;
        max.innerHTML = "Maximum Temperature: " + maxt
        min.innerHTML = "Minimum Temperature: " + mint
        windspeed.innerHTML = "Wind Speed: " + wins;
        w.innerHTML = `<svg id=wsvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" id="IconChangeColor"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" id="mainIconPathAttribute" stroke-width="0" stroke="#fffafa" filter="url(#shadow)"></path> <filter id="shadow"><feDropShadow id="shadowValue" stdDeviation="0.1" dx="-0.3" dy="-0.1" flood-color="black"></feDropShadow></filter></svg>`
        wsvg.style.transform = `rotate(${wind}deg)`;
        winddirection.innerHTML = "Wind Direction: " + wind+"&#xb0";
        precipitation.innerHTML = "Precipitation: "+preci+" mm";
        rain.innerHTML = "Rain: "+rains+" mm";
        riset.innerHTML = "Sunrise: "+rise+"a.m";
        sett.innerHTML = "Sunset: " + set+ "p.m";
    });
  }
submit.addEventListener("click", onSelectChange)
