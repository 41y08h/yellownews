"use strict";

const modeSwitchBtn = document.querySelector("#darkModeBtn");
const progressBar = document.querySelector("#progressBar");
const appNode = document.querySelector("#app");

// Load UI mode
const mode = localStorage.getItem("MODE");
if (mode === "DARK") {
  html.classList.add("dark");
  modeSwitchBtn.textContent = "Light Mode";
}

function escapeHtml(html) {
  var text = document.createTextNode(html);
  var p = document.createElement("p");
  p.appendChild(text);
  return p.innerHTML;
}

function Card(props) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("margin-top-large");

  div.innerHTML = `
      <img src="${escapeHtml(props.urlToImage)}" alt="news image" />
      <div class="card-body">
        <h4 class="card-title">${escapeHtml(props.title)}</h4>
        <h5 class="card-subtitle">${escapeHtml(props.author)} | ${new Date(
    props.publishedAt
  ).toLocaleDateString()}</h5>
        <p class="card-text">${escapeHtml(props.description)}</p>
        <a href="${escapeHtml(props.url)}" target="_blank">Read More</a>
      </div>
      `;

  return div;
}

for (let i = 0; i < 23; i++) {
  progressBar.classList.remove("w-" + (i - 1));
  progressBar.classList.add("w-" + i);
  progressBar.textContent = i + "%";
}

fetch("/api")
  .then((t) => t.json())
  .then((res) => {
    for (let i = 23; i <= 100; i++) {
      progressBar.classList.remove("w-" + (i - 1));
      progressBar.classList.add("w-" + i);
      progressBar.textContent = i + "%";

      if (i === 100) {
        setTimeout(() => {
          progressBar.parentElement.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
          progressBar.parentElement.remove();
        }, 2000);
      }
    }

    res.articles.forEach((article) => {
      appNode.appendChild(Card(article));
    });
  })
  .catch((err) => console.error(err));

// Mode switch button
modeSwitchBtn.addEventListener("click", (e) => {
  if (e.target.textContent == "Dark Mode") {
    document.body.parentElement.classList.add("dark");
    e.target.textContent = "Light Mode";
    localStorage.setItem("MODE", "DARK");
  } else {
    document.body.parentElement.classList.remove("dark");
    e.target.textContent = "Dark Mode";
    localStorage.clear("MODE");
  }
});
