// Storage

const STORAGE_KEY = "financeData";
const observer = new ResizeObserver(syncWidth);

function loadData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Finance Categories

const CATEGORY_LABELS = {
    "food-at-work": "Essen (Arbeit)",
    "food-fun": "Essen (Vermeidbar)",
    "food-privat": "Essen (Zuhause)",
    "fuel": "Tanken",
    "drinks": "Kaltgetränke",
    "smoking": "Zigaretten",
    "bush": "Hecke",
    "coffee": "Kaffee",
    "ksc": "KSC",
    "gambling": "Zocken",
    "clothing": "Kleidung"
};

// Calculations

function getTotalAmount(data) {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    return total.toFixed(2);
}

function calculateCategoryTotals(data) {
    const totals = {};

    // Alle Kategorien initialisieren
    for (const key in CATEGORY_LABELS) {
        totals[key] = 0;
    }

    // Summen berechnen
    for (const item of data) {
        if (totals[item.type] !== undefined) {
            totals[item.type] += item.amount;
        }
    }

    return totals; 
}

function getCategoryOverview(data) {
    const totals = calculateCategoryTotals(data);

    const sections = Object.entries(totals).map(([key, value]) => ({
        key,
        name: CATEGORY_LABELS[key],
        value
    }));

    const filteredSections = sections.filter(section => section.value > 0);

    const highestSection = filteredSections.reduce(
        (max, current) =>
            current.value > max.value ? current : max,
        { value: 0 }
    );

    return {
        highestText:
            highestSection.value > 0
                ? `${highestSection.name} (${highestSection.value.toFixed(2)} €)`
                : "Keine Daten vorhanden",
        filteredSections
    };
}

// DOM Elements

const totalPriceElement = document.getElementById("full-price-value");
const highestSectionElement = document.getElementById("highest-section-value");

const amountInput = document.getElementById("finance-input");
const typeSelect = document.getElementById("financial-type");

const saveButton = document.getElementById("save-btn");
const chartContainer = document.getElementById("columns");

const financeOverview = document.getElementById("finance-overview");
const financeDashboard = document.getElementById("finance-dashboard");

// UI Rendering

function syncWidth() {
    financeOverview.style.width = `${financeDashboard.offsetWidth-80}px`;
}

function renderDashboard() {
    const data = loadData();

    // Gesamtsumme
    totalPriceElement.textContent = `${getTotalAmount(data)} €`;

    // Kategorien
    const overview = getCategoryOverview(data);

    highestSectionElement.textContent = overview.highestText;

    // Diagramm
    renderChart(overview.filteredSections);
}

function renderChart(sections) {
    // Vorherige Balken löschen
    chartContainer.innerHTML = "";

    if (sections.length === 0) return;

    const maxValue = Math.max(...sections.map(item => item.value));
    const heightFactor = 180 / maxValue;

    for (const section of sections) {

        // Wrapper
        const sectionElement = document.createElement("div");
        sectionElement.classList.add("section");

        // Wert
        const valueLabel = document.createElement("p");
        valueLabel.textContent = `${section.value.toFixed(2)} €`;
        valueLabel.classList.add("chart-value");

        // Balken
        const column = document.createElement("div");
        column.classList.add("column");
        column.style.height = `${section.value * heightFactor}px`;

        // Kategorie
        const categoryLabel = document.createElement("p");
        categoryLabel.textContent = section.name;
        categoryLabel.classList.add("chart-label");

        // Zusammenbauen
        sectionElement.appendChild(valueLabel);
        sectionElement.appendChild(column);
        sectionElement.appendChild(categoryLabel);

        chartContainer.appendChild(sectionElement);
    }
}

// Events

saveButton.addEventListener("click", () => {

    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    // Validierung
    if (isNaN(amount) || amount <= 0) {
        alert("Bitte gültigen Betrag eingeben.");
        return;
    }

    const newEntry = {
        amount: parseFloat(amount.toFixed(2)),
        type,
        date: new Date().toISOString()
    };

    const data = loadData();

    data.push(newEntry);

    saveData(data);

    // Inputs zurücksetzen
    amountInput.value = "";

    // UI aktualisieren
    renderDashboard();
});

renderDashboard();
syncWidth();

observer.observe(financeDashboard);