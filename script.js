// 1. Array storing project data
const projectsData = [
  {
    title: "Maximal Independent Set (MIS) Benchmarking",
    description: "Single- and multi-threaded MIS algorithm implementations benchmarked on the PBBS suite against a proposed countingMIS solution.",
    github: "https://github.com/kevin-caldwell"
  },
  {
    title: "Hybrid Truck-Drone Delivery Systems (HTDDS)",
    description: "Genetic algorithm and TSP-heuristic based energy consumption modelling for hybrid truck-drone delivery, accelerated with CUDA C/C++.",
    github: "https://github.com/kevin-caldwell"
  },
  {
    title: "Hyperspectral Payload Firmware",
    description: "STM32H7 image acquisition firmware with FatFS DMA SD storage and CCSDS 123.0 compression for FINCH nanosatellite payload.",
    github: "https://github.com/kevin-caldwell"
  },
  {
    title: "Single Bus RV32I Processor",
    description: "Designed and implemented a single bus processor in SystemVerilog on a DE10-Lite FPGA, extended with RV32I instructions and custom vector units.",
    github: "https://github.com/kevin-caldwell"
  }
];

let visibleCount = 0;
const PROJECTS_PER_BATCH = 2;

// Function to render projects dynamically
function loadMoreProjects() {
  const container = document.getElementById("projects-container");
  const loadMoreBtn = document.getElementById("load-more-btn");

  if (!container) {
    console.error("Error: Could not find element with id='projects-container' in index.html");
    return;
  }

  const nextBatch = projectsData.slice(visibleCount, visibleCount + PROJECTS_PER_BATCH);

  nextBatch.forEach(project => {
    const cardHTML = `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-content">
            <span class="card-title teal-text">${project.title}</span>
            <p>${project.description}</p>
          </div>
          <div class="card-action">
            <a aria-label="Visit GitHub repository" href="${project.github}" target="_blank"
              data-position="top" data-tooltip="View GitHub Profile"
              class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped">
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHTML);
  });

  visibleCount += PROJECTS_PER_BATCH;

  // Re-initialize Materialize tooltips if jQuery is present
  if (window.jQuery && $.fn.tooltip) {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  // Hide button once all items are displayed
  if (loadMoreBtn && visibleCount >= projectsData.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Master Initialization Function
function initApp() {
  // Load initial batch of 2 projects
  loadMoreProjects();

  // Attach Load More Listener
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreProjects);
  }

  /// Attach Dark Mode Listener to all toggle buttons (Desktop & Mobile)
const themeToggles = document.querySelectorAll(".dark-mode-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

themeToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
}

// Execute immediately if DOM is already ready, otherwise wait for event
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}