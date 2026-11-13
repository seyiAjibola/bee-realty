// ============================================================================
// BEE REALTY GROUP — CONFIGURATION & GOOGLE SHEETS CMS
// ============================================================================
const WHATSAPP_NUMBER = "2347062227745";

// Optional: Paste published Google Sheet CSV URL here to manage listings from phone
const GOOGLE_SHEET_CSV_URL = "";

const FALLBACK_IMAGES = {
  "Nigeria": "assets/lekki-duplex.svg",
  "Dubai": "assets/dubai-tower.svg",
  "North Cyprus": "assets/cyprus-resort.svg",
  "Turkey": "assets/turkey-residence.svg",
  "Titled Land": "assets/titled-land.svg"
};

const SAMPLE_PROPERTIES = [
  {
    title: "5-Bedroom Contemporary Detached Duplex + Pool & BQ",
    location: "Lekki Phase 1, Lagos",
    country: "Nigeria",
    price: "₦380,000,000",
    type: "For Sale",
    specs: "5 Beds • 6 Baths • Cinema • Governor's Consent",
    status: "Available",
    image: "assets/lekki-duplex.svg"
  },
  {
    title: "Waterfront 2-Bedroom Luxury Sky Apartment",
    location: "Dubai Marina, UAE",
    country: "Dubai",
    price: "$490,000 (Flexible Plan)",
    type: "Off-Plan",
    specs: "2 Beds • Marina View • 8% Net Rental Yield",
    status: "Available",
    image: "assets/dubai-tower.svg"
  },
  {
    title: "Mediterranean Seafront 3-Bedroom Resort Villa",
    location: "Esentepe, Kyrenia, North Cyprus",
    country: "North Cyprus",
    price: "£265,000",
    type: "Off-Plan",
    specs: "3 Beds • Private Pool • 35% Down Payment",
    status: "Available",
    image: "assets/cyprus-resort.svg"
  },
  {
    title: "600 SQM Commercial & Residential Estate Plots",
    location: "Ibeju-Lekki (Near Lekki Free Zone), Lagos",
    country: "Nigeria",
    price: "₦28,000,000",
    type: "Titled Land",
    specs: "600 SQM • C of O • Instant Physical Allocation",
    status: "Available",
    image: "assets/titled-land.svg"
  },
  {
    title: "Bosphorus View 2+1 Executive Residence (Citizenship Eligible)",
    location: "Besiktas, Istanbul, Turkey",
    country: "Turkey",
    price: "$420,000",
    type: "For Sale",
    specs: "2 Beds • Smart Home • Turkish Citizenship Qualified",
    status: "Available",
    image: "assets/turkey-residence.svg"
  },
  {
    title: "4-Bedroom Luxury Terraced Duplex + BQ",
    location: "Chevron Drive, Lekki, Lagos",
    country: "Nigeria",
    price: "₦165,000,000",
    type: "For Sale",
    specs: "4 Beds • 24/7 Power • Gated Serviced Estate",
    status: "Available",
    image: "assets/lekki-duplex.svg"
  }
];

let allProperties = [];

function getSafeImage(prop) {
  if (prop.image && prop.image.trim() !== "") {
    return prop.image.trim();
  }
  if ((prop.type || "").toLowerCase().includes("land")) {
    return FALLBACK_IMAGES["Titled Land"];
  }
  return FALLBACK_IMAGES[prop.country] || "assets/lekki-duplex.svg";
}

function renderProperties(list) {
  const grid = document.getElementById("listings-grid");
  const counter = document.getElementById("results-counter");
  grid.innerHTML = "";

  counter.textContent = `Showing ${list.length} ${list.length === 1 ? "property" : "properties"}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white border border-stone-200 rounded-2xl p-12 text-center">
        <p class="font-serif text-2xl font-bold text-obsidian">No matching properties found</p>
        <p class="text-stone-500 text-sm mt-2">Try clearing your search filter or selecting "All Markets".</p>
        <button onclick="resetFilters()" class="mt-5 bg-obsidian text-white text-xs font-semibold px-5 py-2.5 rounded-full">Show All Properties</button>
      </div>
    `;
    return;
  }

  list.forEach(prop => {
    const isSold = (prop.status || "").toLowerCase() === "sold";
    const imgSrc = getSafeImage(prop);
    const fallbackSrc = FALLBACK_IMAGES[prop.country] || "assets/lekki-duplex.svg";
    const waText = encodeURIComponent(`Hello BEE Realty Group! I am interested in "${prop.title}" in ${prop.location} (${prop.price}). Please share more details.`);
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

    const card = `
      <article class="bg-white rounded-3xl overflow-hidden border border-stone-200/90 card-lift flex flex-col justify-between">
        <div>
          <div class="relative h-56 bg-obsidian overflow-hidden">
            <img src="${imgSrc}"
                 onerror="this.onerror=null;this.src='${fallbackSrc}';"
                 alt="${prop.title}"
                 class="w-full h-full object-cover transition duration-500 hover:scale-105" />
            <div class="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span class="bg-obsidian/85 backdrop-blur-sm text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                ${prop.country || "Nigeria"}
              </span>
              <span class="bg-white/95 text-obsidian text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                ${prop.type || "For Sale"}
              </span>
            </div>
            ${isSold ? '<span class="absolute top-3.5 right-3.5 bg-red-600 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full">Sold Out</span>' : ''}
          </div>

          <div class="p-6">
            <p class="text-xs font-bold uppercase tracking-wider text-amber-800">${prop.location}</p>
            <h3 class="font-serif text-2xl font-bold text-obsidian mt-1.5 leading-snug">${prop.title}</h3>
            <p class="text-xl font-extrabold text-obsidian mt-3">${prop.price}</p>
            <p class="text-xs text-stone-500 font-medium mt-2 pt-3 border-t border-stone-100">${prop.specs}</p>
          </div>
        </div>

        <div class="px-6 pb-6">
          <a href="${waHref}" target="_blank"
             class="w-full flex items-center justify-center gap-2 ${isSold ? 'bg-stone-200 text-stone-500 pointer-events-none' : 'bg-obsidian hover:bg-amber-700 text-white'} font-semibold text-xs py-3.5 rounded-xl transition">
            <span>${isSold ? 'Sold Out' : 'Request Brochure & Inspection'}</span>
            ${isSold ? '' : '<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>'}
          </a>
        </div>
      </article>
    `;
    grid.insertAdjacentHTML("beforeend", card);
  });
}

function applyFilters() {
  const keyword = document.getElementById("search-input").value.trim().toLowerCase();
  const country = document.getElementById("country-filter").value;
  const type = document.getElementById("type-filter").value;
  const status = document.getElementById("status-filter").value;

  const filtered = allProperties.filter(p => {
    const haystack = `${p.title} ${p.location} ${p.country} ${p.specs} ${p.type}`.toLowerCase();
    const matchKeyword = !keyword || haystack.includes(keyword);
    const matchCountry = country === "ALL" || (p.country || "").toLowerCase() === country.toLowerCase();
    const matchType = type === "ALL" || (p.type || "").toLowerCase() === type.toLowerCase();
    const matchStatus = status === "ALL" || (p.status || "Available").toLowerCase() === status.toLowerCase();
    return matchKeyword && matchCountry && matchType && matchStatus;
  });

  renderProperties(filtered);
}

function quickCountry(countryVal) {
  document.getElementById("country-filter").value = countryVal;
  document.querySelectorAll(".country-pill").forEach(btn => {
    btn.classList.remove("bg-obsidian", "text-white");
    btn.classList.add("bg-white", "text-stone-700", "border", "border-stone-300");
  });
  event.target.classList.remove("bg-white", "text-stone-700", "border", "border-stone-300");
  event.target.classList.add("bg-obsidian", "text-white");
  applyFilters();
  document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("country-filter").value = "ALL";
  document.getElementById("type-filter").value = "ALL";
  document.getElementById("status-filter").value = "ALL";
  renderProperties(allProperties);
}

document.getElementById("search-input").addEventListener("input", applyFilters);
document.getElementById("country-filter").addEventListener("change", applyFilters);
document.getElementById("type-filter").addEventListener("change", applyFilters);
document.getElementById("status-filter").addEventListener("change", applyFilters);

function init() {
  if (GOOGLE_SHEET_CSV_URL) {
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        allProperties = results.data && results.data.length ? results.data : SAMPLE_PROPERTIES;
        renderProperties(allProperties);
      },
      error: function() {
        allProperties = SAMPLE_PROPERTIES;
        renderProperties(allProperties);
      }
    });
  } else {
    allProperties = SAMPLE_PROPERTIES;
    renderProperties(allProperties);
  }
}

init();
