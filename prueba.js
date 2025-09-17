// Selecciona todos los botones que tienen la clase "sidebar-toggle" (para abrir/cerrar la barra lateral)
const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");

// Selecciona el elemento que representa la barra lateral
const sidebar = document.querySelector(".sidebar");

// Selecciona el formulario de búsqueda dentro de la interfaz
const searchForm = document.querySelector(".search-form");

// Selecciona el botón que cambia el tema (oscuro/claro)
const themeToggleBtn = document.querySelector(".theme-toggle");

// Dentro del botón de tema, selecciona el ícono que se usará para indicar el estado
const themeIcon = themeToggleBtn.querySelector(".theme-icon");

// Selecciona todos los enlaces del menú
const menuLinks = document.querySelectorAll(".menu-link");

// Función para actualizar el ícono del tema dependiendo del tema actual y si la barra lateral está colapsada o no
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme"); // Verifica si el tema oscuro está activo
  themeIcon.textContent = sidebar.classList.contains("collapsed") 
    ? (isDark ? "light_mode" : "dark_mode") // Si la barra está colapsada, cambia el ícono según el tema
    : "dark_mode"; // Si no está colapsada, siempre muestra "dark_mode"
};

// Recupera el tema guardado previamente en el almacenamiento local del navegador
const savedTheme = localStorage.getItem("theme");

// Detecta si el sistema del usuario prefiere el tema oscuro
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Determina si se debe usar el tema oscuro basado en lo guardado o en la preferencia del sistema
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

// Aplica el tema oscuro si corresponde
document.body.classList.toggle("dark-theme", shouldUseDarkTheme);

// Actualiza el ícono del tema según el estado actual
updateThemeIcon();

// Cuando el usuario hace clic en el botón de cambiar tema
themeToggleBtn.addEventListener("click", () => {
  // Alterna entre tema oscuro y claro
  const isDark = document.body.classList.toggle("dark-theme");
  
  // Guarda la preferencia del usuario en el almacenamiento local
  localStorage.setItem("theme", isDark ? "dark" : "light");
  
  // Actualiza el ícono para que coincida con el nuevo estado
  updateThemeIcon();
});

// Asigna evento a cada botón de abrir/cerrar la barra lateral
sidebarToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Cambia el estado colapsado de la barra lateral
    sidebar.classList.toggle("collapsed");
    
    // Actualiza el ícono del tema
    updateThemeIcon();
  });
});

// Si se hace clic en el formulario de búsqueda
searchForm.addEventListener("click", () => {
  // Si la barra lateral está colapsada, la expande
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    
    // Pone el cursor automáticamente en el campo de entrada del formulario
    searchForm.querySelector("input").focus();
  }
});

// Si el ancho de la pantalla es mayor a 768px, expande la barra lateral por defecto
if (window.innerWidth > 768) sidebar.classList.remove("collapsed");
