window.addEventListener('load', () => {
    let lon;
    let lat;
    let weather_data;
    const degSymbol = "&#176;";
    const tempDesc = document.querySelector('.temperature-description');
    const tempDeg = document.querySelector('.temperature-degree');
    const tempSpan = document.querySelector('.temperature span');
    const tempSection = document.querySelector('.temperature');
    const locTimeZone = document.querySelector('.location-timezone');
    const weatherIcon = document.querySelector('#weather-icon');
    let key = 'a10697011b3f441786b32529212203'; // pls don't blow up my poor, unsecured API key :(

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const api = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    // document.getElementById("response-json").innerHTML= JSON.stringify(data);
                    tempSection.addEventListener('click', () => {
                        changeUnit(data);
                    });
                })
        });

        function setData(data) {
            const {name:city} = data.location;
            const {temp_c, condition} = data.current;
            const {text:conditionText, icon:conditionIcon} = condition;
            locTimeZone.textContent = city;
            tempDesc.textContent = conditionText;
            weatherIcon.src = conditionIcon;
            tempDeg.textContent = temp_c;
            tempSpan.textContent = "\xB0" + "C";
        }

        function changeUnit(data) {
            if (tempSpan.textContent.charAt(1) === "C") {
                tempSpan.textContent = "\xB0" + "F";
                tempDeg.textContent = data.current.temp_f;
            } else {
                tempSpan.textContent = "\xB0" + "C";
                tempDeg.textContent = data.current.temp_c;
            }
        }
    }
});

/*
TODO:
 1. remove hard-coded API key
 2. hide image while loading
 3. get hi-res images
*/