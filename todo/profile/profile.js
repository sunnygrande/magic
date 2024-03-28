

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        console.log("hello world");
        fetch('navbar-template.html') // Update the path here
            .then(response => response.text())
            .then(template => {
                navbarPlaceholder.innerHTML = template;
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
}

// Load the navbar on page load
document.addEventListener('DOMContentLoaded', loadNavbar);
const atkValueElement = document.getElementById('atkValue');
let ATK = localStorage.getItem('ATK') ? parseInt(localStorage.getItem('ATK')) : 0;

atkValueElement.textContent = ATK + ' ATK'; // Display the initial ATK value in the profile page