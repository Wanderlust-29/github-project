function suppDisplay() {
  const profil = document.querySelector(".profil");
  profil.remove();
}

function displayData(data) {
  const container = document.querySelector(".container");

  let user = {
    profilPicData: data.avatar_url,
    pseudoData: data.login,
    bioData: data.bio,
    dateCreaData: data.created_at,
    reposData: data.public_repos,
  };

  // Dates
  const date = new Date(user.dateCreaData);
  const today = new Date();
  let dateData = date.toLocaleDateString("fr");
  let todayString = today.toLocaleDateString("fr");
  const difference = today - date;
  let differenceInDays = difference / (1000 * 60 * 60 * 24);
  differenceInDays = Math.round(differenceInDays);

  //Profil
  const cross = document.createElement("a");
  const profil = document.createElement("div");
  const profilPic = document.createElement("img");
  const pseudo = document.createElement("p");
  const bio = document.createElement("p");
  const dateCrea = document.createElement("p");
  const repos = document.createElement("p");
  const buttonSee = document.createElement("a");

  buttonSee.setAttribute("id", "btnSee");
  buttonSee.setAttribute("href", `https://github.com/${data.login}`);
  buttonSee.setAttribute("target", `_blank`);

  cross.classList.add("cross");
  profil.classList.add("profil");

  cross.innerText = "X";
  profilPic.src = user.profilPicData;
  pseudo.innerText = user.pseudoData;
  if (user.bioData === null) {
    bio.innerText = "Pas de biographie";
  } else {
    bio.innerText = user.bioData;
  }
  dateCrea.innerText = `Utilisateur créé le : ${dateData} il y a ${differenceInDays} jours`;
  repos.innerText = `Nombre de repos : ${user.reposData}`;
  buttonSee.innerText = "Voir";

  container.appendChild(profil);
  profil.appendChild(cross).addEventListener("click", suppDisplay);
  profil.appendChild(profilPic);
  profil.appendChild(pseudo);
  profil.appendChild(bio);
  profil.appendChild(dateCrea);
  profil.appendChild(repos);
  profil.appendChild(buttonSee);
}

function formSearch() {
  // container
  let body = document.querySelector("body");
  const container = document.createElement("section");
  container.classList.add("container");
  body.appendChild(container);

  //Formulaire
  const form = document.createElement("form");
  const input = document.createElement("INPUT");
  const displayNone = document.createElement("p");
  const btnSearch = document.createElement("button");

  displayNone.classList.add("none");
  displayNone.classList.add("defaultError");

  form.setAttribute("action", " ");
  form.setAttribute("method", "get");
  input.setAttribute("type", "text");
  input.setAttribute("id", "search");
  input.setAttribute("name", "search");
  btnSearch.setAttribute("type", "submit");
  btnSearch.setAttribute("id", "btnSearch");
  btnSearch.innerText = "Rechercher";
  displayNone.innerText =
    "* Impossible d'accéder au serveur ou pseudo invalide";

  container.appendChild(form);
  form.appendChild(input);
  form.appendChild(displayNone);
  form.appendChild(btnSearch).addEventListener("click", callApi);
}

function callApi(event) {
  event.preventDefault();

  const nameUser = document.getElementById("search").value;
  const apiUrl = `https://api.github.com/users/${nameUser}`;
  const displayNone = document.querySelector(".defaultError");

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(displayData);
      displayNone.classList.add("none");
    } else {
      displayNone.classList.remove("none");
    }
  });
}

formSearch();
