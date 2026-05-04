const icon = document.getElementById("menu-icon");
const sidebar = document.getElementById("side-bar");

icon.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    console.log("Bingo")
});