const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=vb6-rHeZUl-bAAXo4UlyTQG66lNE2NdIkJD37qYn-uU&count=${count}`

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for  links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each img is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // for(let photo of photosArray){
        //     const imgs = photo.map(f => ({src: f.urls.regular, alt: f.photo.alt_description,
        //         title: f.photo.alt_description }));
        //         const image = new Image(imgs);
        // }
        displayPhotos();
    } catch (error) {
        
    }
}

// Check to see if scrolling near bottom of page, load more photos


window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
}
});

// load
getPhotos();
