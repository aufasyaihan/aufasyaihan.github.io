const localStorageKey = "CONTACT_US";
const SAVED_EVENT = "saved-contact";
const contacts = [];

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById('Send');
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navigationLinks = document.querySelector(".navigation-links");
    submitForm.addEventListener("click", function (event) {
      event.preventDefault();
      addContacts();
    });
    hamburgerMenu.addEventListener("click", function () {
      hamburgerMenu.classList.toggle("active");
      navigationLinks.classList.toggle("active");
    });
  });
  
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");
  
  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");
  
      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document.querySelector("header nav a").classList.add("active");
        });
      }
    });
  };
  
  let slideIndex = 0;
  showSlides();
  
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000);
  }
  
  function addContacts() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let interest = document.getElementById("interest").value;
  
    const generatedID = generateId();
    const contactUsObj = generatecontactUsObj(
      generatedID,
      fullName,
      email,
      interest
    );
  
    contacts.push(contactUsObj);
    saveData();
  }
  
  function generateId() {
    return +new Date();
  }
  
  function generatecontactUsObj(id, fullName, email, interest) {
    return {
      id,
      fullName,
      email,
      interest,
    };
  }
  
  function sendContact() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let interest = document.getElementById("interest").value;
  
    document.getElementById("fullNameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("interestError").innerHTML = "";
  
    let isValid = true;
  
    if (!fullName) {
      isValid = false;
      document.getElementById("fullNameError").innerText =
        "Please enter your full name";
    }
  
    if (!email) {
      isValid = false;
      document.getElementById("emailError").innerText =
        "Please enter your email address";
    } else if (!isValidEmail(email)) {
      isValid = false;
      document.getElementById("emailError").innerText =
        "Please enter a valid email address";
    }
  
    if (!interest) {
      isValid = false;
      document.getElementById("interestError").innerText =
        "Please select an option";
    }
  
    if (isValid) {
      alert(`${fullName}, thanks for registering.`);
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Browser kamu tidak mendukung local storage");
      return false;
    }
    return true;
  }
  
  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(contacts);
      localStorage.setItem(localStorageKey, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }
  
  document.addEventListener(SAVED_EVENT, function () {
      console.log(localStorage.getItem(localStorageKey));  
  });
  