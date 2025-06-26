// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Single Page Navigation
function showSection(id) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Element References
const catBtn = document.getElementById("cat-button");
const factBtn = document.getElementById("fact-button");
const catContainer = document.getElementById("cat-container");
const likedContainer = document.getElementById("liked-container"); // Make sure this exists in your HTML
const factPara = document.getElementById("cat-fact");
const form = document.getElementById("pet-form");
const petList = document.getElementById("user-pets");

// Load liked cats from localStorage
let likedCats = JSON.parse(localStorage.getItem("likedCats")) || [];
likedCats.forEach(displayLikedCat);

// Fetch and show a random cat
catBtn.addEventListener("click", () => {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(([cat]) => {
      catContainer.innerHTML = "";

      const img = document.createElement("img");
      img.src = cat.url;
      img.className = "cat-img";

      const likeBtn = document.createElement("button");
      likeBtn.textContent = "Like";
      likeBtn.onclick = () => likeCat(cat.url);

      catContainer.append(img, likeBtn);
    })
    .catch(err => {
      alert("Failed to fetch cat image.");
      console.error(err);
    });
});

// Like a cat
function likeCat(url) {
  if (!likedCats.includes(url)) {
    likedCats.push(url);
    localStorage.setItem("likedCats", JSON.stringify(likedCats));
    displayLikedCat(url);
  } else {
    alert("You already liked this cat.");
  }
}

// Display liked cat
function displayLikedCat(url) {
  const img = document.createElement("img");
  img.src = url;
  img.className = "cat-img";
  likedContainer.appendChild(img);
}

// Fetch and display a cat fact
factBtn.addEventListener("click", () => {
  fetch("https://meowfacts.herokuapp.com/")
    .then(res => res.json())
    .then(data => {
      factPara.textContent = data.data[0];
    })
    .catch(err => {
      factPara.textContent = "Could not load cat fact.";
      console.error(err);
    });
});

// Handle user pet form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("pet-name").value.trim();
  const type = document.getElementById("pet-type").value.trim();

  if (name && type) {
    const li = document.createElement("li");
    li.textContent = `${name} the ${type}`;
    petList.appendChild(li);
    form.reset();
  } else {
    alert("Please fill in both fields.");
  }
});
