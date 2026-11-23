// Stage 1 + Stage 2 + Stage 3: DietDetective Frontend Logic
console.log("Stage 3 loaded: Dashboard & City/Diet filtering active!");

let selectedDiet = "Vegan";

const RESTAURANTS = [
  { name: "Green Leaf Cafe", city: "Jalandhar", diet: "Vegan", rating: 4.5 },
  { name: "Nature's Bowl", city: "Jalandhar", diet: "Vegan", rating: 4.4 },
  { name: "Pure Crust Bakery", city: "Jalandhar", diet: "Gluten-Free", rating: 4.2 },
  { name: "Mughlai Spice", city: "Jalandhar", diet: "Halal", rating: 4.7 },
  { name: "FitFuel Kitchen", city: "Jalandhar", diet: "Keto", rating: 4.6 },
  { name: "Himalayan Herbals", city: "Hamirpur", diet: "Vegan", rating: 4.4 },
  { name: "GrainFree Bowl", city: "Hamirpur", diet: "Gluten-Free", rating: 4.3 },
  { name: "Keto Craft Grill", city: "Hamirpur", diet: "Keto", rating: 4.5 }
];

const dietItems = document.querySelectorAll(".diet");
const passwordToggles = document.querySelectorAll(".field__toggle");
const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");
const googleBtn = document.getElementById("google-btn");
const googleSignupBtn = document.getElementById("google-signup-btn");
const forgotLink = document.querySelector(".form-links a.link");
const formPanel = document.querySelector(".form-panel");

// 1. Highlight selected diet badge on click
dietItems.forEach((item) => {
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    dietItems.forEach((el) => {
      el.style.border = "none";
      el.style.borderRadius = "12px";
    });
    item.style.border = "2px solid #f3d98b";
    selectedDiet = item.textContent.trim();
    console.log("Selected diet:", selectedDiet);
  });
});

// 2. Toggle password visibility
passwordToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
  });
});

// 3. localStorage helpers
function getUsers() {
  return JSON.parse(localStorage.getItem("dietUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("dietUsers", JSON.stringify(users));
}

// 4. Sign Up handler
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim().toLowerCase();
    const password = document.getElementById("su-password").value;
    const confirmPassword = document.getElementById("su-confirm").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      alert("An account with this email already exists.");
      return;
    }

    users.push({
      name,
      email,
      password,
      dietPreference: selectedDiet
    });
    saveUsers(users);

    alert("Account created! Switch to Login to sign in.");
    signupForm.reset();
    document.getElementById("tab-login").checked = true;
  });
}

// 5. Login handler
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = getUsers();
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }

    renderDashboard(matchedUser);
  });
}

// 6. Demo Google login / sign up
function handleDemoGoogle() {
  const rawEmail = prompt("Enter a Google email for demo login:");
  if (!rawEmail) return;

  const email = rawEmail.trim().toLowerCase();
  const users = getUsers();
  let user = users.find((u) => u.email === email);

  if (!user) {
    user = {
      name: email.split("@")[0] || "User",
      email,
      password: "google-demo-password",
      dietPreference: selectedDiet
    };
    users.push(user);
    saveUsers(users);
  }

  renderDashboard(user);
}

if (googleBtn) googleBtn.addEventListener("click", handleDemoGoogle);
if (googleSignupBtn) googleSignupBtn.addEventListener("click", handleDemoGoogle);

// 7. Reset password
if (forgotLink) {
  forgotLink.addEventListener("click", (event) => {
    event.preventDefault();

    const rawEmail = prompt("Enter your registered email to reset password:");
    if (!rawEmail) return;

    const email = rawEmail.trim().toLowerCase();
    const users = getUsers();
    const index = users.findIndex((u) => u.email === email);

    if (index === -1) {
      alert("No account found with that email.");
      return;
    }

    const newPassword = prompt("Enter your new password:");
    if (!newPassword) return;

    users[index].password = newPassword;
    saveUsers(users);
    alert("Password updated successfully.");
  });
}

// 8. Dashboard with City + Diet filtering
function renderDashboard(user) {
  const savedDiet = user.dietPreference || "Vegan";

  formPanel.innerHTML = `
    <div style="padding: 1.2rem; color: #ffffff; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
        <h2 style="margin: 0;">Welcome, ${user.name}</h2>
        <button
          type="button"
          id="logout-btn"
          style="padding: 0.4rem 0.85rem; border-radius: 999px; border: 1px solid #d9a85b; background: rgba(0,0,0,0.25); color: #f3d98b; cursor: pointer; font-size: 0.85rem;"
        >
          Logout
        </button>
      </div>

      <p style="color: #f3d98b; margin-top: 0.35rem;">
        Saved Diet Preference: <strong>${savedDiet}</strong>
      </p>

      <div style="margin-top: 1.1rem;">
        <label for="city-filter" style="display: block; margin-bottom: 0.35rem;">City</label>
        <input
          type="text"
          id="city-filter"
          placeholder="e.g., Jalandhar or Hamirpur"
          style="width: 100%; padding: 0.7rem 1rem; border-radius: 8px; border: 1px solid #4d9a4a; background: #0b3a34; color: #ffffff; margin-bottom: 0.8rem;"
        >

        <label for="diet-filter" style="display: block; margin-bottom: 0.35rem;">Diet Filter</label>
        <select
          id="diet-filter"
          style="width: 100%; padding: 0.7rem 1rem; border-radius: 8px; border: 1px solid #4d9a4a; background: #0b3a34; color: #ffffff; margin-bottom: 0.95rem;"
        >
          <option value="All">All Diets</option>
          <option value="Vegan" ${savedDiet === "Vegan" ? "selected" : ""}>Vegan</option>
          <option value="Gluten-Free" ${savedDiet === "Gluten-Free" ? "selected" : ""}>Gluten-Free</option>
          <option value="Halal" ${savedDiet === "Halal" ? "selected" : ""}>Halal</option>
          <option value="Keto" ${savedDiet === "Keto" ? "selected" : ""}>Keto</option>
        </select>

        <button
          type="button"
          id="search-restaurants-btn"
          style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: #c8963e; color: #ffffff; font-weight: 600; cursor: pointer;"
        >
          Search Restaurants
        </button>
      </div>

      <div id="restaurant-results" style="margin-top: 1.15rem; max-height: 220px; overflow-y: auto;"></div>
    </div>
  `;

  const cityInput = document.getElementById("city-filter");
  const dietSelect = document.getElementById("diet-filter");
  const searchBtn = document.getElementById("search-restaurants-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const resultsDiv = document.getElementById("restaurant-results");

  function updateResults() {
    const cityQuery = cityInput.value.trim().toLowerCase();
    const chosenDiet = dietSelect.value;

    const matches = RESTAURANTS.filter((place) => {
      const cityOk = !cityQuery || place.city.toLowerCase().includes(cityQuery);
      const dietOk = chosenDiet === "All" || place.diet.toLowerCase() === chosenDiet.toLowerCase();
      return cityOk && dietOk;
    });

    if (matches.length === 0) {
      resultsDiv.innerHTML = `<p style="color: #ffb3b3;">No restaurants found for your selected filters.</p>`;
      return;
    }

    resultsDiv.innerHTML = matches
      .map((place) => {
        const matchesSaved = place.diet.toLowerCase() === savedDiet.toLowerCase();
        return `
          <div style="background: rgba(255, 255, 255, 0.06); border: ${matchesSaved ? "1px solid #f3d98b" : "1px solid transparent"}; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 0.6rem;">
            <strong>${place.name}</strong> — ${place.city}
            ${matchesSaved ? '<span style="color: #f3d98b;"> • Saved Diet</span>' : ""}<br>
            <small style="color: #f3d98b;">Diet: ${place.diet} • Rating: ${place.rating}/5</small>
          </div>
        `;
      })
      .join("");
  }

  updateResults();
  searchBtn.addEventListener("click", updateResults);
  dietSelect.addEventListener("change", updateResults);
  cityInput.addEventListener("input", updateResults);
  logoutBtn.addEventListener("click", () => window.location.reload());
}