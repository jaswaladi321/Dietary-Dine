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

    // Build the inner HTML
    card.innerHTML = `
        <div class="card-img img-${restaurant.id}"></div>
        <div class="card-body">
            <div class="card-top">
                <h3>${restaurant.name}</h3>
                <span class="rating"><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
            </div>
            <p class="meta">${restaurant.cuisine} • <i class="fa-solid fa-location-dot"></i> ${restaurant.location} • ${restaurant.price}</p>
            <div class="badges">
                <span class="badge badge-${restaurant.diet.toLowerCase().replace(" ", "-")}">${restaurant.diet}</span>
            </div>
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

    // Add each restaurant card
    restaurants.forEach(function(restaurant) {
        const card = createRestaurantCard(restaurant);
        container.appendChild(card);
    });
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

    searchForm.addEventListener("submit", function(event) {
        // Prevent form from submitting normally
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();
        console.log("Searching for:", query);

        // Here you would filter restaurants based on query
        showMessage("Searching for: " + query);
    });
}

// Function to set up category filter buttons
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const category = button.dataset.category;
            console.log("Category selected:", category);
            showMessage("Filtering by: " + category);

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
// 7. SAMPLE RESTAURANT DATA
// -------------------------------------------

const sampleRestaurants = [
    {
        id: 1,
        name: "Tavolo Mondo",
        cuisine: "Continental",
        location: "Radisson Hotel, Banga Road, Phagwara",
        price: "₹₹₹",
        rating: 4.8,
        diet: "Gluten-Free",
        dishes: [
            { name: "Rice-flour Margherita Pizza", price: "₹450" },
            { name: "Herb Chicken with Quinoa", price: "₹620" }
        ]
    },
    {
        id: 2,
        name: "Ranga Punjab by Haveli",
        cuisine: "Plant-Based",
        location: "Jalandhar-Phagwara Highway",
        price: "₹₹",
        rating: 4.7,
        diet: "Vegan",
        dishes: [
            { name: "Jackfruit Tacos", price: "₹320" },
            { name: "Cashew Cream Alfredo", price: "₹380" }
        ]
    },
    {
        id: 3,
        name: "Big Bro Veg Food",
        cuisine: "Mughlai",
        location: "Nanak Nagari, Phagwara",
        price: "₹₹",
        rating: 4.6,
        diet: "Halal",
        dishes: [
            { name: "Mutton Dum Biryani", price: "₹420" },
            { name: "Chicken Seekh Platter", price: "₹350" }
        ]
    }
];

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
    displayRestaurants,
    showMessage,
    saveUser,
    loadUser,
    clearUser,
    sampleRestaurants,
    user: user
};