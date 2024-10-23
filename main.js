//Variables/data loading
var cancelled = false;
var cookieDebounce = false;
var cookieCooldown = 25;

var cookies = Number(localStorage.getItem("cookies-1"));
var multiplier = Number(localStorage.getItem("multiplier-1"));
var multiplierCost = Number(localStorage.getItem("multiplierCost-1"));
var workers = Number(localStorage.getItem("workers-1"));
var workerCost = Number(localStorage.getItem("workerCost-1"));

//New player check
if (cookies == null) {
  cookies = 0;
}
if (multiplier == null || multiplier == 0) {
  multiplier = 1;
}
if (multiplierCost == null || multiplierCost == 0) {
  multiplierCost = 100;
}
if (workers == null) {
  workers = 0;
}

if (workerCost == null || workerCost == 0) {
  workerCost = 250;
}

//Cookie click cooldown
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    cookieCooldown = 100;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    cookieCooldown = 25;
  }
});

//Document elements(Buttons, text, etc.)
const cookieText = document.querySelector("#cookies");
const multiplierText = document.querySelector("#multiplier");
const multiplierButton = document.querySelector("#button2");
const workerButton = document.querySelector("#button5");
const workerText = document.querySelector("#workers");
const epilepsyButton = document.querySelector("#button");
const cookieButton = document.querySelector("#button1");
const clearDataButton = document.querySelector("#button3");

//Setting the content of buttons and text
cookieText.textContent = "Cookies = " + cookies;
multiplierText.textContent = "Multiplier = " + multiplier + "x";
multiplierButton.textContent =
  "+1 Multiplier(Costs " + multiplierCost + " cookies)";
workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
workerText.textContent = "Workers = " + workers;

//Worker functionality
setInterval(function () {
  var workerProfit = workers * (1 * multiplier);
  cookies += workerProfit;
  cookieText.textContent = "Cookies = " + cookies;
}, 500);

/*
BUTTONS START HERE
*/

//Epilepsy button
epilepsyButton.addEventListener("click", () => {
  var correctPassword = false;
  cancelled = false;
  document.body.style.background = "white";

  while (correctPassword == false && cancelled == false) {
    var password = prompt(
      "Enter password(Hint: There's 8 characters):",
      "Enter Password Here"
    );

    if (password == "Hint: There's 8 characters") {
      correctPassword = true;
      window.alert("Good job, I hope you don't have epilepsy!");
      setInterval(function () {
        var randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.background = randomColor;
      }, 0.01);
    } else if (password == "password" || password == "12345678") {
      window.alert("Really? No. Stop.");
    } else if (password == null || password == "Enter Password Here") {
      cancelled = true;
    } else {
      window.alert("Incorrect");
    }
  }
});

//Cookie button
cookieButton.addEventListener("mousedown", () => {
  e;
});

cookieButton.addEventListener("mouseup", () => {
  if (cookieDebounce == false) {
    cookieDebounce = true;
    cookies = cookies + 1 * multiplier;
    cookieText.textContent = "Cookies = " + cookies;

    sleep(cookieCooldown).then(() => {
      cookieDebounce = false;
    });
  }
});

//Multiplier button
multiplierButton.addEventListener("click", () => {
  if (cookies >= multiplierCost) {
    multiplier = multiplier * 2;
    multiplierText.textContent = "Multiplier = " + multiplier + "x";
    cookies = cookies - multiplierCost;
    cookieText.textContent = "Cookies = " + cookies;
    multiplierCost *= multiplierCost;
    multiplierButton.textContent =
      "+1 Multiplier(Costs " + multiplierCost + " cookies)";
  }
});

//Clear data button
clearDataButton.addEventListener("click", () => {
  var boolean = window.confirm("Are you sure you want to clear all your data?");

  if (boolean == true) {
    localStorage.clear();
    cookies = 0;
    cookieText.textContent = "Cookies = " + cookies;
    multiplier = 1;
    multiplierText.textContent = "Multiplier = " + multiplier + "x";
    multiplierCost = 100;
    multiplierButton.textContent =
      "+1 Multiplier(Costs " + multiplierCost + " cookies)";
    workers = 0;
    workerCost = 250;
    workerText.textContent = "Workers = " + workers;
    workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
    cheater = false;
    cheaterPunishment = 1;
    if (adminButtonOne) adminButtonOne.remove();
    if (adminButtonTwo) adminButtonTwo.remove();
    admin = false;
    window.alert("All your data has been cleared");
  } else {
    alert("Your data has not been cleared.");
  }
});

//Worker button
workerButton.addEventListener("click", () => {
  if (cookies >= workerCost) {
    workers = workers + 1;
    cookies = cookies - workerCost;
    workerCost = workerCost * 3;
    workerText.textContent = "Workers: " + workers;
    workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
    cookieText.textContent = "Cookies = " + cookies;

    alert("Purchased a worker");
  }
});

/*
BUTTONS END HERE
*/

//Data saving
window.addEventListener("beforeunload", function () {
  localStorage.setItem("cookies-1", cookies);
  localStorage.setItem("multiplier-1", multiplier);
  localStorage.setItem("multiplierCost-1", multiplierCost);
  localStorage.setItem("cheater-1", cheater);
  localStorage.setItem("cheaterPunishment-1", cheaterPunishment);
  localStorage.setItem("workers-1", workers);
  localStorage.setItem("workerCost-1", workerCost);
});

//Functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
