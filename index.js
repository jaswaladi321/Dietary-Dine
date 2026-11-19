const diningSpots = [
  {
    name: "Green Leaf Kitchen",
    city: "Chandigarh",
    diets: ["Vegan", "Gluten-Free"],
    desc: "Plant-based bowls, cold-pressed juices, and dedicated gluten-free prep.",
    url: "https://www.zomato.com/chandigarh"
  },
  {
    name: "The Macro Hearth",
    city: "Jalandhar",
    diets: ["Keto", "Gluten-Free"],
    desc: "High-protein grilled platters, low-carb sides, and clean ingredients.",
    url: "https://www.zomato.com/jalandhar"
  },
  {
    name: "Cedar & Saffron",
    city: "Shimla",
    diets: ["Halal", "Vegan"],
    desc: "Aromatic regional plates with clearly labeled Halal and plant-forward choices.",
    url: "https://www.zomato.com/shimla"
  },
  {
    name: "Purely Nourish",
    city: "Chandigarh",
    diets: ["Vegan", "Halal", "Keto"],
    desc: "Flexible menu options built around transparent ingredient labeling.",
    url: "https://www.google.com/maps/search/?api=1&query=Purely+Nourish+Chandigarh"
  },
  {
    name: "Himalayan Harvest",
    city: "Shimla",
    diets: ["Vegan", "Gluten-Free", "Keto"],
    desc: "Wholesome hill-country dishes with clear allergen and macro notes.",
    url: "https://www.google.com/maps/search/?api=1&query=Himalayan+Harvest+Shimla"
  }
];

let selectedDiet = "all";

const cityFilter = document.getElementById("cityFilter");
const spotGrid = document.getElementById("spotGrid");
const pills = document.querySelectorAll(".diet-pill");

function renderSpots() {
  if (!cityFilter || !spotGrid) return;

  const selectedCity = cityFilter.value;

  const filteredSpots = diningSpots.filter((spot) => {
    const matchesCity = selectedCity === "all" || spot.city === selectedCity;
    const matchesDiet =
      selectedDiet === "all" || spot.diets.includes(selectedDiet);
    return matchesCity && matchesDiet;
  });

  if (filteredSpots.length === 0) {
    spotGrid.innerHTML =
      '<p class="empty-state">No spots match this filter yet. Try another city or diet.</p>';
    return;
  }

  spotGrid.innerHTML = filteredSpots
  .map(
    (spot) => `
    <article class="card">
      <div>
        <div class="card-city">${spot.city}</div>
        <h2 class="card-title">${spot.name}</h2>
        <p class="card-desc">${spot.desc}</p>
      </div>
      <div class="tags">
        ${spot.diets.map((diet) => `<span class="tag">${diet}</span>`).join("")}
      </div>
      <a
        class="card-link"
        href="${spot.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Website / Menu ↗
      </a>
    </article>
  `
  )
  .join("");
}

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
    selectedDiet = pill.dataset.diet || "all";
    renderSpots();
  });
});

if (cityFilter) {
  cityFilter.addEventListener("change", renderSpots);
}

renderSpots();