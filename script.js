//============= NAVIGATION =================

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

//remove menu

const navLinks = document.querySelectorAll(".nav-link");

const closeNavMenu = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show -menu");
};

navLinks.forEach((link) => link.addEventListener("click", closeNavMenu));

//============= FROM VALIDATIONS =================
// Selecting form and input elements
const form = document.querySelector("form");

// Function to display error messages
const showError = (field, errorText) => {
  field.classList.add("error");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest(".form-group").appendChild(errorElement);
};

// Function to handle form submission
const handleFormData = (e) => {
  e.preventDefault();

  // Retrieving input elements
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const emailInput = document.getElementById("email");
  const telephoneInput = document.getElementById("telephone");
  const messageInput = document.getElementById("message");

  // Getting trimmed values from input fields
  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const email = emailInput.value.trim();
  const telephone = telephoneInput.value.trim();
  const message = messageInput.value.trim();

  // Regular expression pattern for email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const telPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  // Clearing previous error messages
  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  // Performing validation checks
  if (firstname === "") {
    showError(firstnameInput, "Enter your First name!");
  }
  if (lastname === "") {
    showError(lastnameInput, "Enter your Last name!");
  }
  if (!emailPattern.test(email)) {
    showError(emailInput, "Enter a valid email address!");
  }
  if (!telPattern.test(telephone)) {
    showError(telephoneInput, "Enter a your Telephone number!");
  }
  if (message === "") {
    showError(messageInput, "Enter a message!");
  }

  // Checking for any remaining errors before form submission
  const errorInputs = document.querySelectorAll(".form-group .error");
  if (errorInputs.length > 0) return;

  // Submitting the form
  form.submit();
};

// Handling form submission event
form.addEventListener("submit", handleFormData);

//============= AGREE  =================
function validateForm(form) {
  console.log("checkbox checked is ", form.agree.checked);
  if (!form.agree.checked) {
    document.getElementById("agree_chk_error").style.visibility = "visible";
    return false;
  } else {
    document.getElementById("agree_chk_error").style.visibility = "hidden";
    console.log(alert("Form filled!Thank You!"));

    return true;
  }
}

//============= API  =================
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  // const URL = `https://api.tvmaze.com/search/shows?q=${movie.dataset.id}`;
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

// display movie list
function displayMovieList(movies) {
  searchList.innerHTML = "";
  movies.forEach((movie) => {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movie.imdbID;
    movieListItem.classList.add("search-list-item");
    let moviePoster =
      movie.Poster !== "N/A" ? movie.Poster : "image_not_found.png";

    movieListItem.innerHTML = `
      <div class="search-item-thumbnail">
          <img src="${moviePoster}">
      </div>
      <div class="search-item-info">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
      </div>
    `;
    movieListItem.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        //`https://api.tvmaze.com/search/shows?q=${movie.dataset.id}`
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=fc1fef96`
      );
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);
    });

    searchList.appendChild(movieListItem);
  });
}

function displayMovieDetails(details) {
  const movieDetailsHTML = `
    <article class="cardx card-4 cards-flex-4 " id="result-grid">
      <div class="card-info-hover"></div>
      <div class="card-img">
        <img class="cardsize" src="${details.Poster}">
      </div>
      <a href="" class="card-link">
        <div class="card-img-hover">
          <img class="cardsize" src="${details.Poster}">
        </div>
      </a>
      <div class="card-info">
        <h3 class="card-name">${details.Title}</h3>
        <p class="card-description">Release Year is ${details.Year}.
        This movie has achieved ${details.Awards}.
        Movie Language is ${details.Language}. 
        </p>
      </div>
      <div class="topright" onclick="closeMovieCard(this)">
        <a class="topright-btn" href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-x-lg" viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.500 0 0 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 1 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </a>
      </div>
    </article>
  `;

  resultGrid.innerHTML += movieDetailsHTML;
}

function closeMovieCard(element) {
  const articleElement = element.closest(".cardx");
  articleElement.remove();
}

function closeWin(event) {
  event.preventDefault();
  console.log("Closing window...");
}

//============= Scroll Reveal Animation  =================

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
