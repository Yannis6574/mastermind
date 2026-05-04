const icon = document.getElementById("menu-icon");
const sidebar = document.getElementById("side-bar");
const buttonDropdown = document.querySelector(".dropdown-button");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdown = document.querySelector(".dropdown");
const chevron = document.querySelector(".dropdown img")
const header = document.getElementById("header")


icon.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});

buttonDropdown.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
});

chevron.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
});

header.addEventListener("click", () => {
    window.location.href = "start.html";
});

function setValue(value) {
    buttonDropdown.innerHTML = value;
    dropdownContent.classList.toggle("show");
}