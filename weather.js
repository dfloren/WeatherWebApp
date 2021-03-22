window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        })
    } else {
        document.getElementsByTagName('h1')[0].textContent = "Please enable geolocation on your browser";
    }
});