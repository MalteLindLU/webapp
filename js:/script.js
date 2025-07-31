// Visa sektioner
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
    document.getElementById(id).classList.add('visible');
    closeMenu();
  }
  
  // Meny-knapp
  document.getElementById("menu-btn").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-200px" : "0px";
  });
  function closeMenu() {
    document.getElementById("sidebar").style.left = "-200px";
  }
  
  // Checklista
  const form = document.getElementById("checklist-form");
  const input = document.getElementById("item-input");
  const list = document.getElementById("checklist-items");
  const clearBtn = document.getElementById("clear-btn");
  
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
  
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;
    span.addEventListener("click", () => li.classList.toggle("checked"));
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => list.removeChild(li));
  
    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";
  });
  
  clearBtn.addEventListener("click", () => {
    list.innerHTML = "";
  });
  