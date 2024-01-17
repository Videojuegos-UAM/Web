function setCookie(url) {
    fetch(url);
    //get cookie image from the document
    var cookie = document.getElementById("cookie-image");
    var cookieEaten = document.getElementById("cookie-eaten-image");
    //change the image source to the cookie eaten image

    cookie.style.display = "none";
    cookieEaten.style.display = "block";

}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Check if the "cookie" is set to "taken" on page load
document.addEventListener('DOMContentLoaded', function() {
    const cookieValue = getCookie('cookie');
    
    if (cookieValue === 'taken') {
        imageButton = document.getElementById("cookie-button");
        imageButton.style.display = "none";
        amador = document.getElementById("amador-image");
        amador.style.display = "block";
    }
});