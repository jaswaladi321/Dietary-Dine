document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const restaurantCards = Array.from(document.querySelectorAll(".restaurant-card"));
  const restaurantsSection = document.getElementById("restaurants");
  const statusEl = document.getElementById("filter-status");
  const resetBtn = document.getElementById("reset-filters-btn");

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  let activeDiet = "all";

  function filterRestaurants(shouldScroll = false) {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let visibleCount = 0;

    restaurantCards.forEach((card) => {
      const diets = (card.dataset.diet || "")
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const searchableText = [
        card.dataset.name || "",
        card.dataset.cuisine || "",
        card.dataset.diet || "",
        card.textContent || ""
      ]
        .join(" ")
        .toLowerCase();

      const matchesDiet = activeDiet === "all" || diets.includes(activeDiet);
      const matchesQuery = !query || searchableText.includes(query);
      const isVisible = matchesDiet && matchesQuery;

      card.style.display = isVisible ? "" : "none";
      card.setAttribute("aria-hidden", String(!isVisible));

      if (isVisible) {
        visibleCount += 1;
      }
    });

    categoryButtons.forEach((btn) => {
      const isSelected = (btn.dataset.category || "").toLowerCase() === activeDiet;
      btn.setAttribute("aria-pressed", String(isSelected));
      btn.classList.toggle("is-selected", isSelected);
    });

    if (statusEl) {
      const dietLabel = activeDiet === "all" ? "all diets" : activeDiet;
      const searchPart = query ? ` matching "${query}"` : "";
      statusEl.textContent = `Showing ${visibleCount} restaurant${
        visibleCount === 1 ? "" : "s"
      } for ${dietLabel}${searchPart}.`;
    }

    if (shouldScroll && restaurantsSection) {
      restaurantsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  categoryButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      const clickedDiet = (btn.dataset.category || "all").toLowerCase();
      activeDiet = activeDiet === clickedDiet ? "all" : clickedDiet;
      filterRestaurants(true);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeDiet = "all";
      if (searchInput) {
        searchInput.value = "";
      }
      filterRestaurants(false);
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      filterRestaurants(true);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterRestaurants(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && window.location.hash.includes("-popup")) {
      window.location.hash = "#restaurants";
    }
  });

  filterRestaurants(false);
});
