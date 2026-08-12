const photos = [
  { id: 1, title: "Mountain Sunrise", tags: ["nature", "landscape"], colors: ["#f97316", "#4338ca"], likes: 42 },
  { id: 2, title: "City Lights", tags: ["urban", "night"], colors: ["#0f172a", "#7c3aed"], likes: 31 },
  { id: 3, title: "Wedding Day", tags: ["wedding", "portrait"], colors: ["#f9a8d4", "#7c3aed"], likes: 65 },
  { id: 4, title: "Ocean Escape", tags: ["nature", "travel"], colors: ["#06b6d4", "#1d4ed8"], likes: 54 },
  { id: 5, title: "Forest Path", tags: ["nature", "wildlife"], colors: ["#84cc16", "#14532d"], likes: 27 },
  { id: 6, title: "Studio Portrait", tags: ["portrait", "professional"], colors: ["#94a3b8", "#334155"], likes: 36 },
  { id: 7, title: "Desert Road", tags: ["travel", "landscape"], colors: ["#fbbf24", "#b45309"], likes: 19 },
  { id: 8, title: "Street Market", tags: ["urban", "travel"], colors: ["#ef4444", "#7e22ce"], likes: 24 },
  { id: 9, title: "Wild Encounter", tags: ["wildlife", "nature"], colors: ["#a3e635", "#365314"], likes: 48 }
];

const availableTags = [...new Set(photos.flatMap(photo => photo.tags))].sort();
const app = document.querySelector("#app");
let selectedTags = new Set();
let searchQuery = "";

const hero = (title, description) => `
  <section class="hero container">
    <h1>${title}</h1>
    <p>${description}</p>
  </section>`;

const photoCard = photo => `
  <article class="card photo-card" data-title="${photo.title.toLowerCase()}" data-tags="${photo.tags.join(" ")}">
    <div class="photo" style="--photo-start:${photo.colors[0]};--photo-end:${photo.colors[1]}">📷</div>
    <div class="photo-info">
      <h3>${photo.title}</h3>
      <div class="tags">${photo.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      <div class="actions">
        <span>♥ ${photo.likes}</span>
        <button class="button secondary" data-photo-id="${photo.id}">View Details</button>
      </div>
    </div>
  </article>`;

function homePage() {
  return `<div class="page">
    ${hero("Professional Photo Gallery & Portfolio", "Upload, organize, and share your photography with a simple portfolio that runs entirely on .NET.")}
    <section class="section container">
      <div class="grid features">
        <article class="card"><span class="feature-icon">⚡</span><h3>Fast & Simple</h3><p>Browse a responsive gallery without a client framework or package manager.</p></article>
        <article class="card"><span class="feature-icon">🏷️</span><h3>Smart Organization</h3><p>Find photos quickly with built-in search and tag filters.</p></article>
        <article class="card"><span class="feature-icon">🔒</span><h3>Client Ready</h3><p>Use the dashboard to manage public and private galleries.</p></article>
      </div>
    </section>
    <section class="section container">
      <div class="section-header"><h2>Quick Upload</h2><a href="/upload" data-link>Upload page →</a></div>
      ${uploadZone()}
    </section>
    <section class="section container">
      <div class="section-header"><h2>Recent Uploads</h2><a href="/gallery" data-link>View all →</a></div>
      <div class="grid gallery">${photos.slice(0, 6).map(photoCard).join("")}</div>
    </section>
    ${photoDialog()}
  </div>`;
}

function galleryPage() {
  return `<div class="page">
    ${hero("Photo Gallery", "Browse and discover amazing photography.")}
    <section class="section container">
      <div class="toolbar">
        <input id="photo-search" class="input" type="search" placeholder="Search photos..." aria-label="Search photos">
        <button id="clear-filters" class="button secondary">Clear filters</button>
      </div>
      <div id="tag-filters" class="filter-panel" aria-label="Filter by tag">
        ${availableTags.map(tag => `<button class="tag" data-filter="${tag}">${tag}</button>`).join("")}
      </div>
      <div id="gallery-grid" class="grid gallery">${photos.map(photoCard).join("")}</div>
      <p id="empty-gallery" class="card empty" hidden>No photos match those filters.</p>
    </section>
    ${photoDialog()}
  </div>`;
}

function uploadZone() {
  return `<div id="drop-zone" class="drop-zone">
    <div class="feature-icon">☁️</div>
    <h3>Drop photos here</h3>
    <p>or select files from your computer</p>
    <label class="button" for="file-input">Choose photos</label>
    <input id="file-input" type="file" accept="image/*" multiple>
    <div id="file-list" class="file-list" aria-live="polite"></div>
  </div>`;
}

function uploadPage() {
  return `<div class="page">
    ${hero("Upload Your Photos", "Add photography to your portfolio with native browser file handling.")}
    <section class="section container">${uploadZone()}</section>
    <section class="section container">
      <div class="section-header"><h2>Upload Settings</h2></div>
      <form class="card grid form-grid" id="upload-form">
        <div class="field"><label for="gallery">Assign to Gallery</label><select class="input" id="gallery"><option>Nature Portfolio</option><option>Street Photography</option><option>Client Review</option></select></div>
        <div class="field"><label for="visibility">Visibility</label><select class="input" id="visibility"><option>Public</option><option>Private</option><option>Draft</option></select></div>
        <div class="field full"><label for="tags">Tags (comma-separated)</label><input class="input" id="tags" placeholder="wedding, portrait, outdoor"></div>
        <div class="field full"><label for="copyright">Copyright Notice</label><input class="input" id="copyright" placeholder="© Your Photography Studio"></div>
        <div><button class="button" type="submit">Upload & Process</button></div>
      </form>
    </section>
  </div>`;
}

function adminPage() {
  const galleries = [
    ["Wedding - Sarah & John", "Client Review", 124, "Active"],
    ["Nature Portfolio", "Public", 86, "Published"],
    ["Corporate Headshots", "Private", 42, "Active"],
    ["Street Photography", "Portfolio", 67, "Draft"]
  ];
  return `<div class="page">
    ${hero("Admin Dashboard", "Manage your galleries, clients, and portfolio.")}
    <section class="section container">
      <div class="section-header"><h2>Stats Overview</h2></div>
      <div class="grid stats">
        <article class="card stat">Total Photos<strong>319</strong></article>
        <article class="card stat">Active Galleries<strong>12</strong></article>
        <article class="card stat">Client Projects<strong>8</strong></article>
        <article class="card stat">Monthly Views<strong>8,429</strong></article>
      </div>
      <div class="section-header"><h2>Recent Galleries</h2><a class="button" href="/upload" data-link>Upload Photos</a></div>
      <div class="card table-wrap">
        <table>
          <thead><tr><th>Gallery Name</th><th>Type</th><th>Photos</th><th>Status</th></tr></thead>
          <tbody>${galleries.map(item => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td><span class="status">${item[3]}</span></td></tr>`).join("")}</tbody>
        </table>
      </div>
    </section>
  </div>`;
}

const photoDialog = () => `<dialog id="photo-dialog"><div class="modal-content"><button class="modal-close" aria-label="Close">×</button><div id="modal-details"></div></div></dialog>`;

function bindGallery() {
  const grid = document.querySelector("#gallery-grid");
  const search = document.querySelector("#photo-search");
  const applyFilters = () => {
    const visible = photos.filter(photo =>
      photo.title.toLowerCase().includes(searchQuery) &&
      [...selectedTags].every(tag => photo.tags.includes(tag)));
    grid.innerHTML = visible.map(photoCard).join("");
    document.querySelector("#empty-gallery").hidden = visible.length > 0;
    bindPhotoDialogs();
  };

  search?.addEventListener("input", event => {
    searchQuery = event.target.value.trim().toLowerCase();
    applyFilters();
  });
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    selectedTags.has(button.dataset.filter) ? selectedTags.delete(button.dataset.filter) : selectedTags.add(button.dataset.filter);
    button.classList.toggle("selected");
    applyFilters();
  }));
  document.querySelector("#clear-filters")?.addEventListener("click", () => {
    selectedTags.clear();
    searchQuery = "";
    search.value = "";
    document.querySelectorAll("[data-filter]").forEach(button => button.classList.remove("selected"));
    applyFilters();
  });
}

function bindPhotoDialogs() {
  const dialog = document.querySelector("#photo-dialog");
  document.querySelectorAll("[data-photo-id]").forEach(button => button.addEventListener("click", () => {
    const photo = photos.find(item => item.id === Number(button.dataset.photoId));
    document.querySelector("#modal-details").innerHTML = `<h2>${photo.title}</h2><p>Tags: ${photo.tags.join(", ")}</p><p>${photo.likes} likes</p>`;
    dialog.showModal();
  }));
  document.querySelector(".modal-close")?.addEventListener("click", () => dialog.close());
}

function bindUpload() {
  const zone = document.querySelector("#drop-zone");
  const input = document.querySelector("#file-input");
  const showFiles = files => {
    const fileList = document.querySelector("#file-list");
    fileList.replaceChildren();
    [...files].filter(file => file.type.startsWith("image/")).forEach(file => {
      const row = document.createElement("div");
      const name = document.createElement("span");
      const size = document.createElement("span");
      row.className = "file-row";
      name.textContent = file.name;
      size.textContent = `${Math.ceil(file.size / 1024)} KB`;
      row.append(name, size);
      fileList.append(row);
    });
  };
  input?.addEventListener("change", () => showFiles(input.files));
  zone?.addEventListener("dragover", event => { event.preventDefault(); zone.classList.add("dragging"); });
  zone?.addEventListener("dragleave", () => zone.classList.remove("dragging"));
  zone?.addEventListener("drop", event => { event.preventDefault(); zone.classList.remove("dragging"); showFiles(event.dataTransfer.files); });
  document.querySelector("#upload-form")?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Demo upload complete.");
  });
}

function render() {
  const routes = { "/": homePage, "/gallery": galleryPage, "/upload": uploadPage, "/admin": adminPage };
  app.innerHTML = (routes[window.location.pathname] || homePage)();
  document.querySelectorAll(".nav-links a").forEach(link => link.classList.toggle("active", link.pathname === window.location.pathname));
  if (window.location.pathname === "/gallery") bindGallery();
  if (window.location.pathname === "/upload" || window.location.pathname === "/") bindUpload();
  bindPhotoDialogs();
}

document.addEventListener("click", event => {
  const link = event.target.closest("a[data-link]");
  if (!link || link.origin !== window.location.origin) return;
  event.preventDefault();
  history.pushState({}, "", link.href);
  render();
});
window.addEventListener("popstate", render);
render();
