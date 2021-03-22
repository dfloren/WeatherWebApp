window.addEventListener('load', () => {
    let lon;
    let lat;
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
                    alert(JSON.stringify(data));
                    document.getElementById("response-json").innerHTML= JSON.stringify(data);
                })
        });
    }
});