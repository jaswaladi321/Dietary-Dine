// ============================================
// Carb Away - Beginner JavaScript Practice
// First Year Student Level - Well Commented
// ============================================

// -------------------------------------------
// 1. VARIABLES AND DATA TYPES
// -------------------------------------------

// String - text data
const websiteName = "Carb Away";
const tagline = "Find food your stomach says yes...";

// Number - numeric data
const currentYear = 2026;
const numberOfDiets = 4;

// Boolean - true or false
let isUserLoggedIn = false;
let isDarkMode = false;

// Array - list of items
const diets = ["Gluten-Free", "Vegan", "Halal", "Keto"];

// Object - key-value pairs (like a dictionary)
const user = {
    name: "",
    email: "",
    dietPreference: "Vegan",
    isLoggedIn: false
};

// Current filter state
let currentFilter = {
    searchQuery: "",
    selectedDiet: "All",
    selectedCity: ""
};

// Full restaurant data (from HTML + sample)
const allRestaurants = [
    {
        id: 1,
        name: "Tavolo Mondo",
        cuisine: "Continental",
        location: "Radisson Hotel, Banga Road, Phagwara",
        city: "Phagwara",
        price: "₹₹₹",
        rating: 4.8,
        diet: "Gluten-Free",
        dishes: [
            { name: "Rice-flour Margherita Pizza", price: "₹450" },
            { name: "Herb Chicken with Quinoa", price: "₹620" }
        ],
        imgClass: "img-1"
    },
    {
        id: 2,
        name: "Ranga Punjab by Haveli",
        cuisine: "Plant-Based",
        location: "Jalandhar-Phagwara Highway",
        city: "Jalandhar",
        price: "₹₹",
        rating: 4.7,
        diet: "Vegan",
        dishes: [
            { name: "Jackfruit Tacos", price: "₹320" },
            { name: "Cashew Cream Alfredo", price: "₹380" }
        ],
        imgClass: "img-2"
    },
    {
        id: 3,
        name: "Big Bro Veg Food",
        cuisine: "Mughlai",
        location: "Nanak Nagari, Phagwara",
        city: "Phagwara",
        price: "₹₹",
        rating: 4.6,
        diet: "Halal",
        dishes: [
            { name: "Mutton Dum Biryani", price: "₹420" },
            { name: "Chicken Seekh Platter", price: "₹350" }
        ],
        imgClass: "img-3"
    },
    {
        id: 4,
        name: "Caldos and Lounge",
        cuisine: "Grill",
        location: "New Jawhar Nagar, Jalandhar",
        city: "Jalandhar",
        price: "₹₹₹",
        rating: 4.5,
        diet: "Keto Gluten-Free",
        dishes: [
            { name: "Butter Garlic Salmon", price: "₹790" },
            { name: "Zucchini Noodle Bowl", price: "₹410" }
        ],
        imgClass: "img-4"
    },
    {
        id: 5,
        name: "Protein House",
        cuisine: "Middle Eastern",
        location: "LPU / Chaheru Area, Phagwara",
        city: "Phagwara",
        price: "₹₹",
        rating: 4.4,
        diet: "Vegan Halal",
        dishes: [
            { name: "Falafel Mezze Plate", price: "₹340" },
            { name: "Hummus with Warm Pita", price: "₹220" }
        ],
        imgClass: "img-5"
    },
    {
        id: 6,
        name: "Subway",
        cuisine: "Healthy Bowls",
        location: "Near Birring, Phagwara, Jalandhar",
        city: "Jalandhar",
        price: "₹₹",
        rating: 4.3,
        diet: "Keto Vegan",
        dishes: [
            { name: "Avocado Tofu Bowl", price: "₹360" },
            { name: "Almond Flour Wrap", price: "₹290" }
        ],
        imgClass: "img-6"
    }
];

// -------------------------------------------
// 2. BASIC FUNCTIONS
// -------------------------------------------

// Function to show a welcome message
function showWelcomeMessage() {
    console.log("Welcome to " + websiteName + "!");
    console.log(tagline);
    console.log("We have " + numberOfDiets + " diet categories.");
}

// Function to greet user by name
function greetUser(name) {
    return "Hello, " + name + "! Welcome to " + websiteName;
}

// Function to check if a diet is valid
function isValidDiet(diet) {
    // Convert to lowercase for comparison
    const lowerDiet = diet.toLowerCase();

    // Check each diet in the array
    for (let i = 0; i < diets.length; i++) {
        if (diets[i].toLowerCase() === lowerDiet) {
            return true;
        }
    }
    return false;
}

// Function to add a new diet (if not already exists)
function addDiet(newDiet) {
    if (isValidDiet(newDiet)) {
        console.log(newDiet + " already exists!");
        return false;
    }

    diets.push(newDiet);
    console.log("Added new diet: " + newDiet);
    return true;
}

// Function to filter restaurants by diet
function filterRestaurantsByDiet(restaurants, selectedDiet) {
    // If "All" is selected, return all restaurants
    if (selectedDiet === "All") {
        return restaurants;
    }

    // Filter array - keep only matching diets
    const filtered = restaurants.filter(function(restaurant) {
        return restaurant.diet.toLowerCase() === selectedDiet.toLowerCase();
    });

    return filtered;
}

// Function to filter restaurants by city
function filterRestaurantsByCity(restaurants, city) {
    if (!city || city.trim() === "") {
        return restaurants;
    }

    const filtered = restaurants.filter(function(restaurant) {
        return restaurant.city.toLowerCase().includes(city.toLowerCase());
    });

    return filtered;
}

// -------------------------------------------
// 2b. ADVANCED FILTER FUNCTIONS
// -------------------------------------------

// Function to filter restaurants by search query (name or cuisine)
function filterRestaurantsBySearch(restaurants, query) {
    if (!query || query.trim() === "") {
        return restaurants;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = restaurants.filter(function(restaurant) {
        return restaurant.name.toLowerCase().includes(lowerQuery) ||
               restaurant.cuisine.toLowerCase().includes(lowerQuery);
    });

    return filtered;
}

// Function to filter restaurants by diet (handles multiple diets per restaurant)
function filterRestaurantsByDiet(restaurants, selectedDiet) {
    // If "All" is selected, return all restaurants
    if (selectedDiet === "All") {
        return restaurants;
    }

    // Filter array - keep only matching diets
    const filtered = restaurants.filter(function(restaurant) {
        // Restaurant might have multiple diets like "Keto Gluten-Free"
        const restaurantDiets = restaurant.diet.toLowerCase().split(" ");
        return restaurantDiets.includes(selectedDiet.toLowerCase());
    });

    return filtered;
}

// Combined filter function - applies all filters at once
function applyAllFilters(restaurants) {
    let filtered = restaurants;

    // Apply search filter
    filtered = filterRestaurantsBySearch(filtered, currentFilter.searchQuery);

    // Apply diet filter
    filtered = filterRestaurantsByDiet(filtered, currentFilter.selectedDiet);

    // Apply city filter
    filtered = filterRestaurantsByCity(filtered, currentFilter.selectedCity);

    return filtered;
}

// -------------------------------------------
// 3. DOM MANIPULATION (Working with HTML)
// -------------------------------------------

// Function to create a restaurant card HTML
function createRestaurantCard(restaurant) {
    // Create the card element
    const card = document.createElement("article");
    card.className = "restaurant-card";
    card.dataset.diet = restaurant.diet;
    card.dataset.name = restaurant.name;
    card.dataset.cuisine = restaurant.cuisine;

    // Build badges for each diet (restaurant might have multiple)
    const dietList = restaurant.diet.split(" ");
    const badgesHtml = dietList.map(d =>
        `<span class="badge badge-${d.toLowerCase().replace(" ", "-")}">${d}</span>`
    ).join("");

    // Build the inner HTML
    card.innerHTML = `
        <div class="card-img ${restaurant.imgClass}"></div>
        <div class="card-body">
            <div class="card-top">
                <h3>${restaurant.name}</h3>
                <span class="rating"><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
            </div>
            <p class="meta">${restaurant.cuisine} • <i class="fa-solid fa-location-dot"></i> ${restaurant.location} • ${restaurant.price}</p>
            <div class="badges">${badgesHtml}</div>
            <ul class="dishes">
                ${restaurant.dishes.map(dish => `<li>${dish.name} <span>${dish.price}</span></li>`).join("")}
            </ul>
            <a href="#login-popup" class="btn btn-primary view-details-btn" data-id="rest-${restaurant.id}">View Details <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    `;

    return card;
}

// Function to display restaurants on the page
function displayRestaurants(restaurants) {
    const container = document.getElementById("restaurant-grid");

    if (!container) {
        console.log("Restaurant grid container not found");
        return;
    }

    // Clear existing content
    container.innerHTML = "";

    if (restaurants.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">No restaurants found matching your filters.</p>';
        return;
    }

    // Add each restaurant card
    restaurants.forEach(function(restaurant) {
        const card = createRestaurantCard(restaurant);
        container.appendChild(card);
    });
}

// Function to refresh restaurant display with current filters
function refreshRestaurantDisplay() {
    const filtered = applyAllFilters(allRestaurants);
    displayRestaurants(filtered);
    console.log(`Showing ${filtered.length} of ${allRestaurants.length} restaurants`);
}

// Function to show a message to the user
function showMessage(message, isError = false) {
    // Create a simple alert-style message
    const messageDiv = document.createElement("div");
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        background: ${isError ? "#e74c3c" : "#27ae60"};
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Remove after 3 seconds
    setTimeout(function() {
        messageDiv.remove();
    }, 3000);
}

// -------------------------------------------
// 4. EVENT LISTENERS (Making things interactive)
// -------------------------------------------

// Function to set up search functionality
function setupSearch() {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    if (!searchForm || !searchInput) {
        console.log("Search elements not found");
        return;
    }

    // Filter on form submit
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        currentFilter.searchQuery = query;
        refreshRestaurantDisplay();
        showMessage(query ? `Searching for: "${query}"` : "Showing all restaurants");
    });

    // Also filter as user types (live search)
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.trim();
        currentFilter.searchQuery = query;
        refreshRestaurantDisplay();
    });
}

// Function to set up category filter buttons
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const category = button.dataset.category;
            // Convert category to proper case (e.g., "gluten-free" -> "Gluten-Free")
            const dietMap = {
                "gluten-free": "Gluten-Free",
                "vegan": "Vegan",
                "halal": "Halal",
                "keto": "Keto"
            };
            const selectedDiet = dietMap[category] || category;

            currentFilter.selectedDiet = selectedDiet;
            refreshRestaurantDisplay();
            showMessage(`Filtering by: ${selectedDiet}`);

            // Update active button styling
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Scroll to restaurants section
            const restaurantsSection = document.getElementById("restaurants");
            if (restaurantsSection) {
                restaurantsSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// Function to set up "View Details" buttons
function setupViewDetailsButtons() {
    // Use event delegation - listen on parent container
    const restaurantGrid = document.getElementById("restaurant-grid");

    if (!restaurantGrid) return;

    restaurantGrid.addEventListener("click", function(event) {
        // Check if clicked element is a "View Details" button
        const button = event.target.closest(".view-details-btn");

        if (button) {
            event.preventDefault();
            const restaurantId = button.dataset.id;
            console.log("View details for:", restaurantId);

            // Show the details modal
            const modal = document.getElementById("details-" + restaurantId);
            if (modal) {
                modal.classList.add("open");
            }
        }
    });
}

// Function to close modals when clicking backdrop
function setupModalClose() {
    const modals = document.querySelectorAll(".modal");

    modals.forEach(function(modal) {
        const backdrop = modal.querySelector(".modal-backdrop");
        const closeBtn = modal.querySelector(".modal-close");

        if (backdrop) {
            backdrop.addEventListener("click", function() {
                modal.classList.remove("open");
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", function() {
                modal.classList.remove("open");
            });
        }
    });
}

// -------------------------------------------
// 5. LOCALSTORAGE (Saving data in browser)
// -------------------------------------------

// Save user data to localStorage
function saveUser(userData) {
    try {
        localStorage.setItem("carbAwayUser", JSON.stringify(userData));
        console.log("User saved:", userData.name);
        return true;
    } catch (error) {
        console.error("Failed to save user:", error);
        return false;
    }
}

// Load user data from localStorage
function loadUser() {
    try {
        const userData = localStorage.getItem("carbAwayUser");
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    } catch (error) {
        console.error("Failed to load user:", error);
        return null;
    }
}

// Clear user data (logout)
function clearUser() {
    localStorage.removeItem("carbAwayUser");
    isUserLoggedIn = false;
    user.name = "";
    user.email = "";
    user.isLoggedIn = false;
    console.log("User logged out");
    updateAuthUI();
}

// -------------------------------------------
// 5b. AUTHENTICATION FUNCTIONS
// -------------------------------------------

// Handle login (from login.html or login_signup.html)
function handleLogin(email, password) {
    const users = getUsers();
    const matchedUser = users.find(u => u.email === email.toLowerCase() && u.password === password);

    if (!matchedUser) {
        return { success: false, message: "Invalid email or password." };
    }

    // Save logged in user
    const userData = {
        name: matchedUser.name,
        email: matchedUser.email,
        dietPreference: matchedUser.dietPreference || "Vegan",
        isLoggedIn: true
    };
    saveUser(userData);

    // Update global user object
    user.name = userData.name;
    user.email = userData.email;
    user.dietPreference = userData.dietPreference;
    user.isLoggedIn = true;
    isUserLoggedIn = true;

    updateAuthUI();
    return { success: true, message: "Welcome back, " + userData.name + "!" };
}

// Handle signup (from login_signup.html)
function handleSignup(name, email, password, confirmPassword, dietPreference) {
    // Validation
    if (!name || !email || !password) {
        return { success: false, message: "Please fill in all fields." };
    }

    if (password.length < 4) {
        return { success: false, message: "Password must be at least 4 characters long." };
    }

    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match." };
    }

    const users = getUsers();
    if (users.some(u => u.email === email.toLowerCase())) {
        return { success: false, message: "An account with this email already exists." };
    }

    // Create new user
    const newUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        dietPreference: dietPreference || "Vegan"
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    const userData = {
        name: newUser.name,
        email: newUser.email,
        dietPreference: newUser.dietPreference,
        isLoggedIn: true
    };
    saveUser(userData);

    // Update global user object
    user.name = userData.name;
    user.email = userData.email;
    user.dietPreference = userData.dietPreference;
    user.isLoggedIn = true;
    isUserLoggedIn = true;

    updateAuthUI();
    return { success: true, message: "Account created! Welcome, " + userData.name + "!" };
}

// Handle logout
function handleLogout() {
    clearUser();
    showMessage("Logged out successfully");
    // Redirect to home if on a protected page
    if (window.location.pathname.includes("login") || window.location.pathname.includes("profile")) {
        window.location.href = "index.html";
    }
}

// Get all users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("dietUsers")) || [];
}

// Save all users to localStorage
function saveUsers(users) {
    localStorage.setItem("dietUsers", JSON.stringify(users));
}

// Set up login form (login.html)
function setupLoginForm() {
    const loginForm = document.querySelector(".auth-form") || document.querySelector(".login-form");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const result = handleLogin(email, password);

        if (result.success) {
            showMessage(result.message);
            // Redirect to index.html after short delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showMessage(result.message, true);
        }
    });
}

// Set up signup form (login_signup.html)
function setupSignupForm() {
    const signupForm = document.querySelector(".signup-form");

    if (!signupForm) return;

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("su-name").value.trim();
        const email = document.getElementById("su-email").value.trim();
        const password = document.getElementById("su-password").value;
        const confirmPassword = document.getElementById("su-confirm").value;
        const dietPreference = document.getElementById("signup-diet")?.value || "Vegan";

        const result = handleSignup(name, email, password, confirmPassword, dietPreference);

        if (result.success) {
            showMessage(result.message);
            // Switch to login tab and redirect
            setTimeout(() => {
                const loginTab = document.getElementById("tab-login");
                if (loginTab) loginTab.checked = true;
                window.location.href = "index.html";
            }, 1000);
        } else {
            showMessage(result.message, true);
        }
    });
}

// Set up logout button (in navbar)
function setupLogout() {
    // Check if we're on index.html and user is logged in
    const authLink = document.getElementById("auth-link");

    if (authLink && isUserLoggedIn) {
        // Change login link to logout
        authLink.innerHTML = `<i class="fa-regular fa-user"></i> ${user.name} (Logout)`;
        authLink.href = "#";
        authLink.onclick = (e) => {
            e.preventDefault();
            handleLogout();
        };
    }
}

// -------------------------------------------
// 5c. REVIEW FUNCTIONS
// -------------------------------------------

// Get all reviews from localStorage
function getReviews() {
    return JSON.parse(localStorage.getItem("carbAwayReviews")) || [];
}

// Save reviews to localStorage
function saveReviews(reviews) {
    localStorage.setItem("carbAwayReviews", JSON.stringify(reviews));
}

// Create a review card HTML element
function createReviewCard(review) {
    const card = document.createElement("article");
    card.className = "review-card";

    // Format date
    const date = new Date(review.timestamp);
    const dateStr = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // Create stars
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    card.innerHTML = `
        <div class="review-head">
            <span class="avatar">${review.author.charAt(0).toUpperCase()}</span>
            <div>
                <h3>${review.author}</h3>
                <span class="stars" aria-label="${review.rating} out of 5">${stars}</span>
            </div>
        </div>
        <p class="review-meta">${review.restaurant} • <span class="badge badge-${review.diet.toLowerCase().replace(" ", "-")}">${review.diet}</span></p>
        <p>${review.text}</p>
        ${review.safetyNote ? `<p class="safety-note"><i class="fa-solid fa-shield-halved"></i> Safety: ${review.safetyNote}</p>` : ""}
        <small style="color: var(--muted);">${dateStr}</small>
    `;

    return card;
}

// Display reviews in the review grid
function displayReviews() {
    const reviewGrid = document.getElementById("review-grid");
    if (!reviewGrid) return;

    const reviews = getReviews();

    // Keep the first 3 static reviews, add dynamic ones after
    const staticReviews = reviewGrid.querySelectorAll(".review-card:not(.dynamic)");
    const existingDynamic = reviewGrid.querySelectorAll(".review-card.dynamic");
    existingDynamic.forEach(el => el.remove());

    reviews.forEach(review => {
        const card = createReviewCard(review);
        card.classList.add("dynamic");
        reviewGrid.appendChild(card);
    });
}

// Set up review form submission
function setupReviewForm() {
    const reviewForm = document.querySelector("#review-popup .modal-form");
    if (!reviewForm) return;

    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Check if user is logged in
        if (!isUserLoggedIn) {
            showMessage("Please log in to submit a review", true);
            // Close review popup and open login popup
            const reviewPopup = document.getElementById("review-popup");
            const loginPopup = document.getElementById("login-popup");
            if (reviewPopup) reviewPopup.classList.remove("open");
            if (loginPopup) loginPopup.classList.add("open");
            return;
        }

        const restaurant = document.getElementById("review-restaurant").value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const text = document.getElementById("review-text").value.trim();
        const safetyNote = document.getElementById("review-safety").value.trim();

        if (!restaurant || !rating || !text) {
            showMessage("Please fill in all required fields", true);
            return;
        }

        // Find restaurant diet from our data
        const restaurantData = allRestaurants.find(r => r.name === restaurant);
        const diet = restaurantData ? restaurantData.diet.split(" ")[0] : "Vegan";

        // Create review object
        const review = {
            id: Date.now(),
            author: user.name,
            restaurant: restaurant,
            rating: parseInt(rating),
            text: text,
            diet: diet,
            safetyNote: safetyNote,
            timestamp: new Date().toISOString()
        };

        // Save review
        const reviews = getReviews();
        reviews.unshift(review); // Add to beginning
        saveReviews(reviews);

        // Update display
        displayReviews();

        // Close popup and reset form
        const reviewPopup = document.getElementById("review-popup");
        if (reviewPopup) reviewPopup.classList.remove("open");
        reviewForm.reset();

        showMessage("Review submitted successfully!");
    });
}

// Set up "Write a review" buttons in detail modals
function setupReviewButtons() {
    // Event delegation for review buttons in detail modals
    document.body.addEventListener("click", function(event) {
        const button = event.target.closest('a[href="#review-popup"]');
        if (button && button.textContent.includes("review")) {
            event.preventDefault();

            if (!isUserLoggedIn) {
                showMessage("Please log in to write a review", true);
                const loginPopup = document.getElementById("login-popup");
                if (loginPopup) loginPopup.classList.add("open");
                return;
            }

            // Pre-select restaurant if coming from a detail modal
            const detailModal = button.closest(".modal[id^='details-']");
            if (detailModal) {
                const restaurantId = detailModal.id.replace("details-rest-", "");
                const restaurant = allRestaurants.find(r => r.id == restaurantId);
                if (restaurant) {
                    const select = document.getElementById("review-restaurant");
                    if (select) select.value = restaurant.name;
                }
            }

            const reviewPopup = document.getElementById("review-popup");
            if (reviewPopup) reviewPopup.classList.add("open");
        }
    });
}

// -------------------------------------------
// 6. INITIALIZATION (Run when page loads)
// -------------------------------------------

// Main initialization function
function init() {
    console.log("Initializing Carb Away...");

    // Show welcome message in console
    showWelcomeMessage();

    // Set up all event listeners
    setupSearch();
    setupCategoryFilters();
    setupViewDetailsButtons();
    setupModalClose();

    // Set up authentication forms
    setupLoginForm();
    setupSignupForm();
    setupLogout();

    // Set up review functionality
    setupReviewForm();
    setupReviewButtons();
    displayReviews();

    // Display restaurants on initial load
    refreshRestaurantDisplay();

    // Check if user is logged in
    const savedUser = loadUser();
    if (savedUser) {
        user.name = savedUser.name;
        user.email = savedUser.email;
        user.dietPreference = savedUser.dietPreference || "Vegan";
        user.isLoggedIn = true;
        isUserLoggedIn = true;
        updateAuthUI();
    }

    console.log("Carb Away initialized!");
}

// Function to update auth link in navbar
function updateAuthUI() {
    const authLink = document.getElementById("auth-link");

    if (authLink && isUserLoggedIn) {
        authLink.innerHTML = `<i class="fa-regular fa-user"></i> ${user.name}`;
        authLink.href = "#profile"; // Change to profile page
    }
}

// -------------------------------------------
// 7. SAMPLE RESTAURANT DATA (legacy - kept for compatibility)
// -------------------------------------------

// NOTE: Use allRestaurants array at the top of the file instead
// This is kept for backward compatibility with existing code
const sampleRestaurants = allRestaurants.slice(0, 3);

// -------------------------------------------
// 8. RUN INITIALIZATION
// -------------------------------------------

// Wait for DOM to be ready before running init
document.addEventListener("DOMContentLoaded", init);

// Also export functions for testing in console
window.CarbAway = {
    showWelcomeMessage,
    greetUser,
    isValidDiet,
    addDiet,
    filterRestaurantsByDiet,
    filterRestaurantsByCity,
    filterRestaurantsBySearch,
    applyAllFilters,
    displayRestaurants,
    refreshRestaurantDisplay,
    showMessage,
    saveUser,
    loadUser,
    clearUser,
    handleLogin,
    handleSignup,
    handleLogout,
    getUsers,
    saveUsers,
    getReviews,
    saveReviews,
    displayReviews,
    allRestaurants,
    currentFilter,
    user: user
};