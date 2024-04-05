// document.addEventListener("DOMContentLoaded", function() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         // Use a simple method to determine approximate location
//         const locationElement = document.getElementById("location");
//         locationElement.innerHTML = `Latitude: ${latitude.toFixed(2)} | Longitude: ${longitude.toFixed(2)}`;
//       });
//     } else {
//       const locationElement = document.getElementById("location");
//       locationElement.innerText = "Geolocation is not supported in your browser.";
//     }

//     const searchForm = document.getElementById("searchForm");
//     const searchInput = document.getElementById("searchInput");
//     const searchButtons = document.querySelectorAll(".search-engine-button");




//     searchForm.addEventListener("submit", function(event) {
//       event.preventDefault();
//       const searchTerm = searchInput.value.trim();
//       if (searchTerm === "") {
//         return;
//       }

//       const selectedEngine = document.querySelector(".search-engine-button.selected");
//       if (!selectedEngine) {
//         alert("Please select a search engine");
//         return;
//       }

//       const searchUrl = selectedEngine.getAttribute("data-search-url");
//       const fullUrl = searchUrl + encodeURIComponent(searchTerm);
//       window.location.href = fullUrl;
//     });

//     searchButtons.forEach(function(button) {
//       button.addEventListener("click", function() {
//         searchButtons.forEach(function(btn) {
//           btn.classList.remove("selected");
//         });
//         button.classList.add("selected");
//       });
//     });
//   });


// above code contain all function except a popup alert when the user clicks on the search button without entering any input.
// added by admin ------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
  // Check if geolocation has been asked before
  const geolocationAsked = localStorage.getItem("geolocationAsked");
  let latitude, longitude;

  // If geolocation has not been asked and the browser supports it
  if (!geolocationAsked && "geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Display the location on the page
      const locationElement = document.getElementById("location");
      locationElement.innerHTML = `Latitude: ${latitude.toFixed(2)} | Longitude: ${longitude.toFixed(2)}`;

      // Save the latitude and longitude in local storage
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      localStorage.setItem("geolocationAsked", "true");
    });
  } else {
    // If geolocation has been asked before, retrieve the coordinates from local storage
    latitude = localStorage.getItem("latitude");
    longitude = localStorage.getItem("longitude");

    const locationElement = document.getElementById("location");
    // If coordinates are available, display the location
    if (latitude && longitude) {
      locationElement.innerHTML = `Latitude: ${latitude} | Longitude: ${longitude}`;
    } else {
      // If coordinates are not available, display a message
      locationElement.innerText = "Location is not available.";
    }
  }

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchButtons = document.querySelectorAll(".search-engine-button");


  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      alert("Please enter your search !");
      return;
    }

    const selectedEngine = document.querySelector(".search-engine-button.selected");
    if (!selectedEngine) {
      alert("Please select a search engine");
      return;
    }

    const searchUrl = selectedEngine.getAttribute("data-search-url");
    const fullUrl = searchUrl + encodeURIComponent(searchTerm);
    window.location.href = fullUrl;
  }

  // Event listener for form submission
  searchForm.addEventListener("submit", handleFormSubmit);

  // Function to handle button click
  function handleButtonClick(button) {
    searchButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
  }

  // Event listener for search button click
  searchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm === "") {

        // done by admin--------------------------


        // alert("Please enter your search !");

        // -------------------------------------
        return;

      }

      handleButtonClick(button);
    });
  });

  // Check for previously selected search engine in local storage
  const storedEngine = localStorage.getItem("selectedEngine");
  if (storedEngine) {
    const selectedButton = document.querySelector(`.search-engine-button[data-search-url="${storedEngine}"]`);
    if (selectedButton) {
      handleButtonClick(selectedButton);
    }
  }

  // Event listener for search engine button click
  searchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm === "") {
        alert("Please enter your search !");
        return;
      }
      handleButtonClick(button);

      // Store selected search engine in local storage
      const selectedEngine = button.getAttribute("data-search-url");
      localStorage.setItem("selectedEngine", selectedEngine);
    });
  });
});

// Function to generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set the gradient background on page load
const color1 = getRandomColor();
const color2 = getRandomColor();
document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;





// ------------------------------------------------------------------------------------------
