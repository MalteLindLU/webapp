// Startskärm
function startApp(sectionId) {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("menu-icon").style.display = "block";
    showSection(sectionId);
  }
  
  // Visa en sektion, dölj de andra
  function showSection(sectionId) {
    ["checklist", "salary-calculator"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (id === sectionId) ? "flex" : "none";
    });
    toggleSidebar(false);
  }
  
  // Meny
  function toggleSidebar(force) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
  
    if (force === false) {
      sidebar.style.left = "-200px";
      overlay.style.display = "none";
      return;
    }
  
    const open = sidebar.style.left === "0px";
    sidebar.style.left = open ? "-200px" : "0px";
    overlay.style.display = open ? "none" : "block";
  }
  
  document.getElementById("menu-icon").addEventListener("click", toggleSidebar);
  document.getElementById("overlay").addEventListener("click", () => toggleSidebar(false));
  
  // Checklista
  document.getElementById("add-btn").addEventListener("click", () => {
    const input = document.getElementById("new-task");
    const text = input.value.trim();
    if (text === "") return;
  
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `<span class="task-text">${text}</span> <button class="delete-btn">x</button>`;
    li.querySelector(".task-text").addEventListener("click", () => {
      li.classList.toggle("completed");
    });
    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());
  
    document.getElementById("task-list").appendChild(li);
    input.value = "";
  });
  
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("task-list").innerHTML = "";
  });
  
  // Kalkylator - total lön och semesterersättning
  let totalPay = 0;
  
  document.getElementById("calc-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const date = new Date(document.getElementById("work-date").value);
    const start = toMinutes(document.getElementById("start-time").value);
    const end = toMinutes(document.getElementById("end-time").value);
    const breakStart = toMinutes(document.getElementById("break-start").value);
    const breakEnd = toMinutes(document.getElementById("break-end").value);
    const hourly = parseFloat(document.getElementById("hourly-wage").value);
  
    const day = date.getDay();
    let payForShift = 0;
  
    for (let i = start; i < end; i++) {
      if (i >= breakStart && i < breakEnd) continue;
  
      const hour = i / 60;
      let ob = 0;
  
      if (day === 0 || (day === 6 && hour >= 12)) ob = 2;
      else if (day >= 1 && day <= 5 && hour >= 20) ob = 1.7;
      else if (day >= 1 && day <= 5 && hour >= 18.25) ob = 1.5;
      else ob = 1;
  
      payForShift += hourly * ob / 60;
    }
  
    totalPay += payForShift;
    const vacationPay = totalPay * 0.12; // 12% semesterersättning
  
    document.getElementById("result").innerHTML =
      `<p><strong>Passets lön:</strong> ${payForShift.toFixed(2)} kr</p>
       <p><strong>Totalsumma (alla pass):</strong> ${totalPay.toFixed(2)} kr</p>
       <p><strong>Semesterersättning (12%):</strong> ${vacationPay.toFixed(2)} kr</p>`;
  });
  
  // Hjälpfunktion för att konvertera tid till minuter
  function toMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }
  
  // Nollställ total summa
  document.getElementById("reset-total").addEventListener("click", () => {
    totalPay = 0;
    document.getElementById("result").innerHTML = "";
  });
  