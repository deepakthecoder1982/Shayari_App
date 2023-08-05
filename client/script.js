const keywordInput = document.getElementById("keywordInput");
const generateButton = document.getElementById("generateButton");
const loading = document.getElementById("loading");
const shayariContainer = document.getElementById("shayariContainer");
const clearButton = document.getElementById("clearButton");

generateButton.addEventListener("click", generateShayari);
clearButton.addEventListener("click", clearAll);
loading.style.display = "none";


document.querySelector("body").appendChild(shayariCard);
async function generateShayari() {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    alert("Please enter the details");
    return;
  }

  loading.style.display = "block";
  generateButton.disabled = true;

  try {
    const response = await fetch("http://localhost:8000/getShayari", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });

    const data = await response.json();

    const shayariCard = document.createElement("div");

    shayariCard.classList.add("shayari-card");

    shayariCard.innerHTML = `
    <p>"${data.shayari}"</p>
    <div class="child_container_shayari_button">
    <button onclick="deleteShayari(this)">Delete</button>
    <Select onchange="ChangeLanguage(this)">
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="Marathi">Marathi</option>
      <option value="tamil">Tamil</option>
      <option value="china">China</option>
    </Select>
    </div>
    `;

    shayariContainer.appendChild(shayariCard);
  } catch (error) {
    console.error("Error:", error);
  }
  loading.style.display = "none";
  generateButton.disabled = false;
}
async function ChangeLanguage(value) {
  try {
    const response = await fetch("http://localhost:8000/getShayari", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword,lang:value.value }),
    });

    const data = await response.json();
    loading.style.display = "none";

    const shayariCard = document.createElement("div");

    shayariCard.classList.add("shayari-card");

    shayariCard.innerHTML = `
    <p>"${data.shayari}"</p>
    <div class="child_container_shayari_button">
    <button onclick="deleteShayari(this)">Delete</button>
    <Select onchange="ChangeLanguage(this)">
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="Marathi">Marathi</option>
      <option value="tamil">Tamil</option>
      <option value="china">China</option>
    </Select>
    </div>
    `;

    shayariContainer.appendChild(shayariCard);
  } catch (error) {
    loading.style.display = "none";
    console.error("Error:", error);
  }
}
function deleteShayari(button) {
  const shayariCard = button.parentElement;
  shayariContainer.removeChild(shayariCard);
}

function clearAll() {
  shayariContainer.innerHTML = "";
}

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", darkModeOn);

function darkModeOn() {
  document.body.setAttribute("class", "dark-mode");
}
