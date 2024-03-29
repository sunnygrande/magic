function loadNavbar() {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    console.log("hello world");
    fetch("navbar-template.html") // Update the path here
      .then((response) => response.text())
      .then((template) => {
        navbarPlaceholder.innerHTML = template;
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }
}

// Load the navbar on page load
document.addEventListener("DOMContentLoaded", loadNavbar);

  document.querySelector(".villainAtk").style.color = "red"; // Change color of ATK text to red
  document.querySelector(".villainHp").style.color = "purple"; // Change color of HP text to blue

const form = document.getElementById('villainStats');
const atkInput = document.getElementById('atkInput');
const hpInput = document.getElementById('hpInput');
const villainAtkElement = document.querySelector('.villainAtk');
const villainHpElement = document.querySelector('.villainHp');

let villain = {
  atk: parseInt(localStorage.getItem('VATK')) || 0,
  hp: parseInt(localStorage.getItem('VHP')) || 100,
};

villainAtkElement.textContent = villain.atk + ' ATK';
villainHpElement.textContent = villain.hp + ' HP';

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const newAtk = parseInt(atkInput.value);
  const newHp = parseInt(hpInput.value);

  if (!isNaN(newAtk)) {
    villain.atk = newAtk;
    localStorage.setItem('VATK', newAtk.toString());
    villainAtkElement.textContent = newAtk + ' ATK';
  }

  if (!isNaN(newHp)) {
    villain.hp = newHp;
    localStorage.setItem('VHP', newHp.toString());
    villainHpElement.textContent = newHp + ' HP';
  }

  // Reset form
  form.reset();
});

