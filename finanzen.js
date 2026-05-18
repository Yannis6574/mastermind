function loadData() {
    return JSON.parse(localStorage.getItem("financeData")) || [];
}

function getSumPrice(data) {
    let fullPrice = 0;

    for (let item of data) {
        fullPrice += item.amount;
    }

    return fullPrice.toFixed(2);
}

function getHighestSection(data) {
    let foodatworkValue = 0;
    let foodprivatValue = 0;
    let foodfunValue = 0;
    let fuelValue = 0;
    let drinksValue = 0;
    let smokingValue = 0;
    let bushValue = 0;
    let coffeeValue = 0;
    let kscValue = 0;
    let gamblingValue = 0;
    let clothingValue = 0;

    for (let item of data) {
        if (item.type === "food-at-work") {
            foodatworkValue += item.amount;
        }
        else if (item.type === "food-privat") {
            foodprivatValue += item.amount;
        }
        
        else if (item.type === "food-fun") {
            foodfunValue += item.amount;
        }
        
        else if (item.type === "fuel") {
            fuelValue += item.amount;
        }
        
        else if (item.type === "drinks") {
            drinksValue += item.amount;
        }
        
        else if (item.type === "smoking") {
            smokingValue += item.amount;
        }
        
        else if (item.type === "bush") {
            bushValue += item.amount;
        }
        
        else if (item.type === "coffee") {
            coffeeValue += item.amount;
        }
        
        else if (item.type === "ksc") {
            kscValue += item.amount;
        }
        
        else if (item.type === "gambling") {
            gamblingValue += item.amount;
        }
        
        else if (item.type === "clothing") {
            clothingValue += item.amount;
        }
    }
    
    const sections = [
    { name: "Essen (Arbeit)", value: foodatworkValue },
    { name: "Essen (Vermeidbar)", value: foodfunValue },
    { name: "Essen (Zuhause)", value: foodprivatValue },
    { name: "Tanken", value: fuelValue },
    { name: "Kaltgetränke", value: drinksValue },
    { name: "Zigaretten", value: smokingValue },
    { name: "Hecke", value: bushValue },
    { name: "Kaffee", value: coffeeValue },
    { name: "KSC", value: kscValue },
    { name: "Zocken", value: gamblingValue },
    { name: "Kleidung", value: clothingValue }
    ];

    const filteredSections = sections.filter(section => section.value > 0);

    const highestSection = sections.reduce((max, current) => {
        return current.value > max.value ? current : max;
    });

    return {
    highestText: highestSection.name + " (" + highestSection.value + " €)",
    filteredSections: filteredSections
};
}


const data = loadData();
document.getElementById("full-price-value").innerHTML = getSumPrice(data) + " €";
const result = getHighestSection(data);

document.getElementById("highest-section-value").innerHTML =
    result.highestText;

const filteredSections = result.filteredSections;

document.getElementById("save-btn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("finance-input").value).toFixed(2);
    const type = document.getElementById("financial-type").value;

    const entry = {
        amount: parseFloat(amount),
        type: type,
        date: new Date().toISOString()
    };

    if (amount > 0) {

        // bestehende Daten holen
        let data = JSON.parse(localStorage.getItem("financeData")) || [];

        // neuen Eintrag hinzufügen
        data.push(entry);

        // zurück speichern
        localStorage.setItem("financeData", JSON.stringify(data));
        
        // Anzeige aktualisieren
        document.getElementById("full-price-value").innerHTML = getSumPrice(data) + " €";
        document.getElementById("highest-section-value").innerHTML = getHighestSection(data);

        //result = getHighestSection(data);
        //filteredSections = result.filteredSections;
        //fillChart(filteredSections);
    }
});

function fillChart(filteredSections) {
    console.log(filteredSections);
    const columnTotal = filteredSections.length;
    const parentContainer = document.getElementById("columns");
    const maxHeight = Math.max(...filteredSections.map(item => item.value));
    console.log(maxHeight);
    const factor = 100/maxHeight;

    for (let item of filteredSections) {

        // neue Kategorie einfügen
        const newSection = document.createElement("div");
        newSection.classList.add("section");
        parentContainer.appendChild(newSection);
        
        // Wert hinzufügen
        let newPTag = document.createElement("p");
        newPTag.innerHTML = item.value +"€";
        newPTag.style.fontSize = "11px";
        newSection.appendChild(newPTag);

        // Balken hinzufügen
        const newColumn = document.createElement("div");
        newColumn.classList.add("column");
        newColumn.style.height = item.value * factor * 1.8 + "px";
        newSection.appendChild(newColumn);

        // Unterschrift hinzufügen
        newPTag = document.createElement("p");
        newPTag.innerHTML = item.name;
        newPTag.style.fontSize = "11px";
        newSection.appendChild(newPTag);
    };
};

fillChart(filteredSections);