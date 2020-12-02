"use strict";

const mode = localStorage.getItem("MODE");

if (mode === "DARK") {
  document.body.parentElement.classList.add("dark");
  document.querySelector("#darkModeBtn").textContent = "Light Mode";
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

const pb = document.querySelector("#progressBar");
for (let i = 0; i < 23; i++) {
  const pb = document.querySelector("#progressBar");
  pb.classList.remove("w-" + (i - 1));
  pb.classList.add("w-" + i);
  pb.textContent = i + "%";
}

fetch("/api")
  .then((t) => t.json())
  .then((res) => {
    for (let i = 23; i <= 100; i++) {
      const pb = document.querySelector("#progressBar");
      pb.classList.remove("w-" + (i - 1));
      pb.classList.add("w-" + i);
      pb.textContent = i + "%";

      if (i === 100) {
        setTimeout(() => {
          pb.parentElement.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
          pb.parentElement.remove();
        }, 2000);
      }
    }

    res.articles.forEach((article) => {
      document.querySelector("#app").appendChild(Card(article));
    });
  })
  .catch((err) => console.error(err));

document.querySelector("#darkModeBtn").addEventListener("click", (e) => {
  if (e.target.textContent == "Dark Mode") {
    document.body.parentElement.classList.add("dark");
    e.target.textContent = "Light Mode";
    localStorage.setItem("MODE", "DARK");
  } else {
    document.body.parentElement.classList.remove("dark");
    e.target.textContent = "Dark Mode";
    localStorage.setItem("MODE", "LIGHT");
  }
});
