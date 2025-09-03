let csvData = [];
let selectedItem = null;

const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const selectButton = document.getElementById("select-button");
const infoLabel = document.getElementById("info-label");

// Cargar el archivo CSV que ya está en el proyecto
fetch('data_J&D.csv')
  .then(response => response.text())
  .then(text => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split(',');
    csvData = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
      return obj;
    });
  })
  .catch(err => {
    alert("Error cargando el archivo CSV: " + err);
  });

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  selectedItem = null;
  resultsDiv.innerHTML = "";

  if (query.length === 0) return;

  const filtered = csvData.filter(item =>
    item.nombre && item.nombre.toLowerCase().includes(query)
  );

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = item.nombre;
    div.onclick = () => {
      document.querySelectorAll(".result-item").forEach(el => el.style.background = "");
      div.style.background = "#9daaf2e7";
      div.style.color = "#000000ff";
      selectedItem = item;
      searchInput.value = item.nombre; // Update search input with selected item

    };
    resultsDiv.appendChild(div);
  });
});

selectButton.addEventListener("click", () => {
  if (selectedItem) {
    infoLabel.textContent = `Número de mesa: ${selectedItem.numero_mesa}`;
    infoLabel.classList.remove("hidden");
    infoLabel.classList.add("visible");
  } else {
    infoLabel.textContent = "Selecciona una fila primero.";
    infoLabel.classList.remove("hidden");
    infoLabel.classList.remove("visible");
  }
});
