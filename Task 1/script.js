//javascript
//Get elements from HTML
let buttons = document.querySelectorAll(".filter-btn");
let items = document.querySelectorAll(".gallery-item");

let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightboxImg");
let lightboxCaption = document.getElementById("lightboxCaption");

let closeBtn = document.getElementById("closeBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let visibleItems = Array.from(items);

// Filter images
buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        document.querySelector(".active").classList.remove("active");
        button.classList.add("active");

        let category = button.getAttribute("data-target");
        visibleItems = [];

        items.forEach(function(item) {

            if (
                category === "all" ||
                item.getAttribute("data-category") === category
            ) {
                item.style.display = "block";
                visibleItems.push(item);
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Open lightbox
function openLightbox(index) {
    currentIndex = index;

    let img = visibleItems[index].querySelector("img");
    let title = visibleItems[index].querySelector("h3");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title.textContent;

    lightbox.classList.add("active");
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
}

// Next image
function nextImage() {
    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}

// Previous image
function prevImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    openLightbox(currentIndex);
}

// Click image to open lightbox
items.forEach(function(item) {
    item.addEventListener("click", function() {
        let index = visibleItems.indexOf(item);

        if (index !== -1) {
            openLightbox(index);
        }
    });
});

// Button events
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Close when clicking outside image
lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function(e) {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowRight") {
        nextImage();
    }

    if (e.key === "ArrowLeft") {
        prevImage();
    }
});

