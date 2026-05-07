let properties = [];

// Load from localStorage
function loadProperties() {
  properties = JSON.parse(localStorage.getItem("properties")) || [];
}

// Add new property
function addProperty() {
  let title = document.getElementById("title").value;
  let location = document.getElementById("location").value;
  let price = document.getElementById("price").value;
  let currency = document.getElementById("currency").value;

  let property = { title, location, price, currency };

  loadProperties();
  properties.push(property);
  localStorage.setItem("properties", JSON.stringify(properties));

  displayProperties();
}

// Show properties in dashboard
function displayProperties() {
  loadProperties();

  let list = document.getElementById("propertyList");
  if (!list) return;

  list.innerHTML = "";

  properties.forEach((prop, index) => {
    list.innerHTML += `
      <div class="card">
        <h3>${prop.title}</h3>
        <p>${prop.location}</p>
        <p>${prop.currency}${Number(prop.price).toLocaleString()}</p>

        <button onclick="editProperty(${index})">Edit</button>
        <button onclick="deleteProperty(${index})">Delete</button>
      </div>
    `;
  });
}


//Filter properties
function filterProperties() {
  loadProperties();

  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let container = document.getElementById("propertyContainer");

  container.innerHTML = "";

  properties
    .filter(prop => prop.location.toLowerCase().includes(searchValue))
    .forEach((prop) => {
      container.innerHTML += `
        <div class="card">
          <h3>${prop.title}</h3>
          <p>${prop.location}</p>
          <p>${prop.currency}${Number(prop.price).toLocaleString()}</p>
        </div>
      `;
    });
}

// Delete property
function deleteProperty(index) {
  loadProperties();

  properties.splice(index, 1);
  localStorage.setItem("properties", JSON.stringify(properties));

  displayProperties();
}

// Show properties on homepage
function displayHomepageProperties() {
  loadProperties();

  let container = document.getElementById("propertyContainer");
  if (!container) return;

  container.innerHTML = "";

  properties.forEach((prop) => {
    container.innerHTML += `
      <div class="card">
        <h3>${prop.title}</h3>
        <p>${prop.location}</p>
        <p>${prop.currency}${Number(prop.price).toLocaleString()}</p>
      </div>
    `;
  });
}

//Edit property
function editProperty(index) {
  loadProperties();

  let prop = properties[index];

  document.getElementById("title").value = prop.title;
  document.getElementById("location").value = prop.location;
  document.getElementById("price").value = prop.price;
  document.getElementById("currency").value = prop.currency;

  // remove old one so updated version replaces it
  properties.splice(index, 1);
  localStorage.setItem("properties", JSON.stringify(properties));

  displayProperties();
}

// Run both (depending on page)
displayProperties();
displayHomepageProperties();

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Simple hardcoded login
  if (username === "admin" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login details");
  }
}
function logout() {
  localStorage.removeItem("isLoggedIn");
  alert("Logged out successfully!!")
  window.location.href = "index.html";
}