const container = document.getElementById("globe-container");

// Create the globe
const GLOBE = Globe()(container)
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
  .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
  .showAtmosphere(true)
  .atmosphereColor("#ff6600")
  .atmosphereAltitude(0.15)
  .pointColor((d) => {
    if (d.level === "country") return "#ff8533";
    if (d.level === "state") return "#ff6600";
    return "#ffaa33"; // universities
  })
  .pointRadius((d) => {
    if (d.level === "country") return 0.5;
    if (d.level === "state") return 0.35;
    return 0.2;
  })
  .pointAltitude((d) => {
    if (d.level === "country") return 0.05;
    if (d.level === "state") return 0.03;
    return 0.01;
  })
  .pointLabel((d) => generateLabel(d))
  .pointsData([])
  .onPointHover((d) => {
    // Change cursor on hover
    container.style.cursor = d ? "pointer" : "grab";
  });

// Set initial camera position
GLOBE.pointOfView({ lat: 20, lng: 0, altitude: 2.8 });

// Enhance lighting
const scene = GLOBE.scene();
const directionalLight = scene.children.find(obj => obj.type === "DirectionalLight");
if (directionalLight) {
  directionalLight.intensity = 1.5;
}

// Add a second light for better illumination
const ambientLight = scene.children.find(obj => obj.type === "AmbientLight");
if (ambientLight) {
  ambientLight.intensity = 0.6;
}

// Auto-rotate the globe slowly
let autoRotate = true;
let rotationSpeed = 0.001;

function autoRotateGlobe() {
  if (autoRotate) {
    const currentPOV = GLOBE.pointOfView();
    GLOBE.pointOfView({
      lat: currentPOV.lat,
      lng: currentPOV.lng + rotationSpeed,
      altitude: currentPOV.altitude
    });
  }
  requestAnimationFrame(autoRotateGlobe);
}

autoRotateGlobe();

// Stop auto-rotate on user interaction, resume after 3 seconds of inactivity
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  autoRotate = false;
  inactivityTimer = setTimeout(() => {
    autoRotate = true;
  }, 3000);
}

container.addEventListener("wheel", resetInactivityTimer);
GLOBE.controls().addEventListener("start", resetInactivityTimer);

// Zoom-based logic - show different levels based on altitude
function updatePins() {
  const altitude = GLOBE.pointOfView().altitude;

  let visiblePins;

  if (altitude > 2.5) {
    // Show only countries when zoomed out
    visiblePins = CAMPUS_DATA.filter(d => d.level === "country");
  } else if (altitude > 1.3) {
    // Show countries and states when medium zoom
    visiblePins = CAMPUS_DATA.filter(d => d.level === "country" || d.level === "state");
  } else {
    // Show all levels (states and universities) when zoomed in
    visiblePins = CAMPUS_DATA.filter(d => d.level === "state" || d.level === "university");
  }

  GLOBE.pointsData(visiblePins);
  updateStats();
}

// Update pins when user zooms or drags
container.addEventListener("wheel", () => {
  setTimeout(updatePins, 50);
});

GLOBE.controls().addEventListener("end", updatePins);

// Initial render
updatePins();

// ---- Tooltip content ----
function generateLabel(d) {
  if (d.level === "country") {
    return `
      <div class="tooltip">
        <strong>${d.name}</strong><br/>
        📍 ${d.count} campuses live
      </div>
    `;
  }

  if (d.level === "state") {
    return `
      <div class="tooltip">
        <strong>${d.name}</strong><br/>
        🎓 TALK active here
      </div>
    `;
  }

  return `
    <div class="tooltip">
      <strong>${d.name}</strong><br/>
      👥 ${d.students?.toLocaleString() || "—"} students
    </div>
  `;
}

// ---- Stats Panel ----
function updateStats() {
  const totalCountries = CAMPUS_DATA.filter(d => d.level === "country").length;
  const totalStates = CAMPUS_DATA.filter(d => d.level === "state").length;
  const totalUniversities = CAMPUS_DATA.filter(d => d.level === "university").length;
  const totalStudents = CAMPUS_DATA
    .filter(d => d.level === "university")
    .reduce((sum, d) => sum + (d.students || 0), 0);

  // Update or create stats panel
  let statsPanel = document.querySelector(".globe-stats");
  if (!statsPanel) {
    statsPanel = document.createElement("div");
    statsPanel.className = "globe-stats";
    container.parentElement.appendChild(statsPanel);
  }

  statsPanel.innerHTML = `
    <div class="stats-item">
      <span class="stats-icon">🌍</span>
      <span class="stats-text"><span class="stats-number">${totalCountries}</span><span class="stats-label">Countries</span></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">📍</span>
      <span class="stats-text"><span class="stats-number">${totalStates}</span><span class="stats-label">States</span></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">🎓</span>
      <span class="stats-text"><span class="stats-number">${totalUniversities}</span><span class="stats-label">Universities</span></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">👥</span>
      <span class="stats-text"><span class="stats-number">${(totalStudents / 1000000).toFixed(2)}M</span><span class="stats-label">Students</span></span>
    </div>
  `;
}

// Create instructions panel
function createInstructions() {
  const instructions = document.createElement("div");
  instructions.className = "globe-instructions";
  instructions.innerHTML = `
    <div class="instruction-line"><span class="instruction-key">🖱️ Drag</span> to rotate</div>
    <div class="instruction-line"><span class="instruction-key">🔍 Scroll</span> to zoom</div>
    <div class="instruction-line"><span class="instruction-key">👆 Click</span> for details</div>
  `;
  container.parentElement.appendChild(instructions);
}

createInstructions();

// Resize handling
window.addEventListener("resize", () => {
  GLOBE.width(container.parentElement.clientWidth);
  GLOBE.height(container.parentElement.clientHeight);
});
