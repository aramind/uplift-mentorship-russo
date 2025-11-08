document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply saved theme immediately
  document.documentElement.setAttribute("data-bs-theme", savedTheme);

  // Update toggle state
  if (themeToggle) {
    themeToggle.checked = savedTheme === "dark";

    // Listen for toggle changes
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
});