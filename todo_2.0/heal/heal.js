function loadNavbar() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
    
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

  
  let heal =parseInt(localStorage.getItem("HP"))||0;
  console.log("heroHp: "+heal);

  function addmHP() {
    heal = heal+2;
    localStorage.setItem("HP", heal.toString());
     console.log("new: "+ heal);
  }
 
  function addMHP(){
    heal = heal+5
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }

  function addf(){
    heal=heal+1;
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }

  function addF(){
    heal=heal+3;
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }

  function addFO(){
    heal=heal+6;
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }

  function addn(){
    heal=heal+1;
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }

  function addN(){
    heal=heal+2;
    localStorage.setItem("HP", heal.toString());
    console.log("new: "+ heal);
  }



  
  