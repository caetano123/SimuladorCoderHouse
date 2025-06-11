const authSection = document.getElementById("authSection");
const mainApp = document.getElementById("mainApp");
const logoutBtn = document.getElementById("logoutBtn");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function saveUsers(users) {
  localStorage.setItem("usuarios", JSON.stringify(users));
}

function saveLoggedUser(user) {
  localStorage.setItem("usuarioActivo", JSON.stringify(user));
}

function getLoggedUser() {
  return JSON.parse(localStorage.getItem("usuarioActivo"));
}

function logout() {
  localStorage.removeItem("usuarioActivo");
  showAuth();
}

function showAuth() {
  authSection.style.display = "block";
  mainApp.style.display = "none";
  logoutBtn.style.display = "none";
}

function showApp(user) {
  authSection.style.display = "none";
  mainApp.style.display = "block";
  logoutBtn.style.display = "inline-block";
  // Opcional: mostrar nombre en algún lado
}

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("regNombre").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  let usuarios = getUsers();
  if (usuarios.some(u => u.email === email)) {
    alert("Ese correo ya está registrado.");
    return;
  }

  usuarios.push({ nombre, email, password });
  saveUsers(usuarios);
  alert("Registro exitoso. Ahora podés iniciar sesión.");
  registerForm.reset();
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const usuarios = getUsers();
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (usuario) {
    saveLoggedUser(usuario);
    showApp(usuario);
  } else {
    alert("Datos incorrectos.");
  }

  loginForm.reset();
});

logoutBtn.addEventListener("click", logout);

// Mostrar app si ya hay usuario activo
window.addEventListener("DOMContentLoaded", () => {
  const user = getLoggedUser();
  if (user) {
    showApp(user);
  } else {
    showAuth();
  }
});
