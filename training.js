const icon = document.getElementById("menu-icon");
const sidebar = document.getElementById("side-bar");
const iconTypeDropdown = document.querySelector("#type-dropdown > img");
const iconAmountDropdown = document.querySelector("#amount-dropdown > img");
const iconMachineDropdown = document.querySelector('#machine-dropdown > img');
const TypeDropdown = document.querySelector("#type-content");
const AmountDropdown = document.querySelector("#amount-content");
const machineDropdown = document.querySelector('#machine-div');
const typeValue = document.querySelector("#type-dropdown > button")
const dropdown = document.querySelector(".dropdown");
const header = document.getElementById("header");


header.addEventListener("click", () => {
    window.location.href = "start.html";
});

icon.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});

iconTypeDropdown.addEventListener("click", () => {
    TypeDropdown.classList.toggle("show");
});

iconAmountDropdown.addEventListener("click", () => {
    AmountDropdown.classList.toggle("show");
});

iconMachineDropdown.addEventListener("click", () => {
    machineDropdown.classList.toggle("show");
});

function setValue(value, element, dropdown) {
    document.querySelector('#' + element).textContent = value;
    document.querySelector('#' + dropdown).classList.remove("show");
}