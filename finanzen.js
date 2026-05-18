document.getElementById("save-btn").addEventListener("click", () => {
    const amount = document.getElementById("finance-input").value;
    const type = document.getElementById("financial-type").value;

    const entry = {
        amount: parseFloat(amount),
        type: type,
        date: new Date().toISOString()
    };

    // bestehende Daten holen
    let data = JSON.parse(localStorage.getItem("financeData")) || [];

    // neuen Eintrag hinzufügen
    data.push(entry);

    // zurück speichern
    localStorage.setItem("financeData", JSON.stringify(data));

    alert("Gespeichert!");
});

function loadData() {
    let data = JSON.parse(localStorage.getItem("financeData")) || [];
    console.log(data);
}

loadData();      