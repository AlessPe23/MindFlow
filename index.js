function showAlert(icon, title, text) {
  Swal.fire({ icon, title, text, confirmButtonColor: "#ff5fa8" });
}

function hideAll() {
  document
    .querySelectorAll(".container")
    .forEach((c) => c.classList.add("hidden"));
  let guide = document.getElementById("guideThought");
  if (guide) guide.remove();
}

function createGuide(text) {
  let box = document.createElement("div");
  box.id = "guideThought";
  box.innerText = text;
  let container = document.querySelector(".container:not(.hidden)");
  container.prepend(box);
}

let moduleGuides = {
  miedo:
    "Aquí puedes escribir el miedo que te está rondando la mente. No te juzgues, solo suéltalo.",
  valor:
    "Escribe una mini misión y el valor que la inspira. Enfócate en lo que te importa.",
  error:
    "Convierte un error en un aprendizaje. Describe lo que pasó y qué nueva creencia quieres tener.",
  flow: "Tu sala de flujo te ayuda a enfocarte. Presiona iniciar para comenzar tu Pomodoro.",
  brujula: "Anota tus valores personales. Son tu norte en medio del caos.",
  fusion:
    "Escribe el pensamiento que te atrapó y elige una técnica para liberarte.",
  mini: "Crea pequeñas misiones que puedas completar hoy. Avanza paso a paso.",
};

function openModule(moduleName) {
  hideAll();
  document.getElementById(`mod_${moduleName}`).classList.remove("hidden");
  createGuide(moduleGuides[moduleName]);
}

function backDashboard() {
  hideAll();
  document.getElementById("dashboard").classList.remove("hidden");
}

function showRegister() {
  hideAll();
  document.getElementById("register").classList.remove("hidden");
}

function showLogin() {
  hideAll();
  document.getElementById("auth").classList.remove("hidden");
}

function register() {
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let pass = document.getElementById("regPass").value;

  if (!name || !email || !pass) {
    return showAlert(
      "warning",
      "Campos incompletos",
      "Debes llenar todos los campos"
    );
  }

  localStorage.setItem("mindflowUser", JSON.stringify({ name, email, pass }));
  showAlert("success", "¡Cuenta creada!", "Ahora puedes iniciar sesión.");
  showLogin();
}

function getAlias() {
  let alias = ["A", "B", "C"];
  return alias[Math.floor(Math.random() * alias.length)];
}

function login() {
  let stored = JSON.parse(localStorage.getItem("mindflowUser"));
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPass").value;

  if (!stored)
    return showAlert("error", "Sin cuenta", "Debes registrar una cuenta.");

  if (stored.email === email && stored.pass === pass) {
    hideAll();
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("userName").innerText = stored.name;
    // document.getElementById("userAlias").innerText = "Usuario " + getAlias();
    showAlert("success", "Bienvenido/a", "¡Qué bueno verte de nuevo!");
  } else {
    showAlert("error", "Error", "Correo o contraseña incorrectos.");
  }
}

function logout() {
  Swal.fire({
    title: "¿Cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ff5fa8",
  }).then((res) => {
    if (res.isConfirmed) location.reload();
  });
}

function guardarMiedo() {
  showAlert("success", "Registrado", "Tu pensamiento ansioso fue guardado.");
}

function guardarValor() {
  showAlert("success", "Guardado", "Tu mini misión fue creada.");
}

function guardarError() {
  showAlert(
    "success",
    "Análisis listo",
    "Convertiste un error en aprendizaje."
  );
}

function guardarBrujula() {
  showAlert(
    "success",
    "Valores guardados",
    "Tu brújula personal está actualizada."
  );
}

function guardarFusion() {
  showAlert(
    "success",
    "Técnica aplicada",
    "Has practicado una técnica de desfusión."
  );
}

function guardarMini() {
  let tarea = document.getElementById("miniTarea").value;
  if (!tarea) return;

  let ul = document.getElementById("miniList");
  let li = document.createElement("li");
  li.innerText = tarea;
  ul.appendChild(li);

  document.getElementById("miniTarea").value = "";
  showAlert("success", "Agregado", "Mini-misión añadida.");
}

let interval;
let seconds = 1500;

function updateTimer() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  document.getElementById("timer").innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startPomodoro() {
  clearInterval(interval);

  interval = setInterval(() => {
    seconds--;
    updateTimer();

    if (seconds <= 0) {
      clearInterval(interval);
      showAlert(
        "success",
        "¡Tiempo terminado!",
        "Tu sesión de enfoque ha concluido."
      );
      seconds = 1500;
      updateTimer();
    }
  }, 1000);

  showAlert("info", "Sesión iniciada", "Tu Pomodoro está en marcha.");
}

function stopPomodoro() {
  clearInterval(interval);
  showAlert("warning", "Pomodoro detenido", "La sesión fue pausada.");
}

let darkMode = false;

function updateDarkIcon() {
  const toggleBtn = document.getElementById("darkToggle");
  toggleBtn.innerText = darkMode ? "☀️" : "🌙";
}

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("mindflowDarkMode", darkMode);
  updateDarkIcon();
}

window.onload = () => {
  let savedMode = localStorage.getItem("mindflowDarkMode");
  if (savedMode === "true") {
    document.body.classList.add("dark");
    darkMode = true;
  }
  updateDarkIcon();
};
