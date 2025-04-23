document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard Loaded");
    
    const buttons = document.querySelectorAll(".capture-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            alert(`Feature: ${this.textContent} - Coming Soon!`);
        });
    });
});
