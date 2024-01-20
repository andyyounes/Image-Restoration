// JavaScript to toggle the menu
/*
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});
// JavaScript to toggle the menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');
    menu.classList.toggle('open'); // Toggle the animation class
    menuIcon.classList.toggle('open');
}
*/
function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    const openbtn = document.querySelector(".openbtn");
  
    if (sidebar.style.width === "250px") {
      closeNav();
    } else {
      openNav();
    }
}
  
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.querySelector(".openbtn").classList.add("change");
    const logo = document.getElementById("logo"); // Assuming you've added an id to your logo element

    // Toggle class on the logo for transparency
    // logo.classList.toggle("transparent-logo");
    logo.classList.add("transparent");

}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.querySelector(".openbtn").classList.remove("change");
    const logo = document.getElementById("logo");
    logo.classList.remove("transparent");
}


function goToLoginPage() {
    window.location.href = 'LoginPage.html';
}
function goToSubscribePage(){
    window.location.href='SubscribePage.html';
} 
 function goToTryItOutPage() {
    window.location.href = 'Try_it_out.html';
 }
 document.addEventListener("DOMContentLoaded", function () {
    const toggleMenuButton = document.getElementById("toggle-menu");
    const logoContainer = document.querySelector(".logo-container");

    toggleMenuButton.addEventListener("click", function () {
        logoContainer.classList.toggle("menu-open");
    });
});
function Freesubscribe() {
    var email = document.getElementById('emailInput').value;

    // Simulate an AJAX request using setTimeout
    setTimeout(function() {
        alert('Subscribed successfully! You will receive updates.');

    // Reset the form after successful subscription
    document.getElementById('subscribeForm').reset();
}, 1000); // Simulating a delay of 1 second
}
function processSubscription() {
    var email = document.getElementById('emailInput').value;
    var isPremium = document.getElementById('premiumCheckbox').checked;

    // Make an actual AJAX request to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/subscribe", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert(xhr.responseText);
                document.getElementById('subscribeForm').reset();
            } else {
                alert('Subscription failed. Please try again.');
            }
        }
    };

    var data = JSON.stringify({
        email: email,
        premium: isPremium.toString()
    });

    xhr.send(data);
}

// Dark Mode Switch
function switchMode() {
    const moonIcon = document.getElementById('moonIcon');
    const body = document.body;

    if (!moonIcon || !body) {
        console.error("moonIcon or body not found");
        return;
    }

    // Toggle dark mode by updating CSS styles directly
    const isDarkMode = moonIcon.classList.toggle('dark-mode-icon');
    body.classList.toggle('dark-mode'); // Toggle dark mode for the entire body
    localStorage.setItem('dark-mode', isDarkMode);

    // Change the image source based on the dark mode state
    updateImage(isDarkMode);
}
function updateImage(isDarkMode) {
    const moonIcon = document.getElementById('moonIcon');

    if (!moonIcon ) {
        console.error("moonIcon not found");
        return;
    }

    if (isDarkMode) {
        moonIcon.src = './sun-icon-dark.jpg'; // Use a different icon for dark mode
    } else {
        moonIcon.src = './[removal.ai]_bcf90bd8-63d7-49dc-8ef8-52aaf482491f_night2.png';
    }
}

// Check local storage for user preference
document.addEventListener('DOMContentLoaded', function () {
    const isDarkModeStored = localStorage.getItem('dark-mode');
    if (isDarkModeStored === 'true') {
        switchMode(); // Update the image and CSS styles based on stored preference
    }
});
// To handle image selection
function chooseImage() {
    const uploadForm = document.getElementById('uploadForm');
    const formData = new FormData(uploadForm);

    fetch('/chooseImage', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const originalImage = document.getElementById('originalImage');
        const imageUrl = URL.createObjectURL(blob);
        originalImage.src = imageUrl;
    })
    .catch(error => console.error('Error:', error));

    // Prevent form submission
    return false;
}

// To trigger image restoration using Denoising Autoencoders
function restoreImage() {
    const uploadForm = document.getElementById('uploadForm');
    const formData = new FormData(uploadForm);

    // Use fetch to send the image data to the server
    fetch('/restore', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        // Display the original image
        const originalImage = document.getElementById('originalImage');
        const imageUrl = URL.createObjectURL(blob);
        originalImage.src = imageUrl;

        // Use fetch again to get the restored image data
        fetch('/get_restored_image')
            .then(response => response.blob())
            .then(restoredBlob => {
                // Display the restored image
                const restoredImage = document.getElementById('restoredImage');
                const restoredImageUrl = URL.createObjectURL(restoredBlob);
                restoredImage.src = restoredImageUrl;
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

// Function to perform Denoising Autoencoder restoration
function performDenoisingAutoencoder() {
    // Use fetch to send the request to the server for Denoising Autoencoder restoration
    fetch('/restoreDenoisingAutoencoder', {
        method: 'POST'
    })
    .then(response => response.blob())
    .then(blob => {
        const restoredImage = document.getElementById('restoredImage');
        const restoredImageUrl = URL.createObjectURL(blob);
        restoredImage.src = restoredImageUrl;
    })
    .catch(error => console.error('Error:', error));
}

function displayImage() {
    const input = document.getElementById("imageInput");
    const originalImageElement = document.getElementById("originalImage");

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            originalImageElement.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}




