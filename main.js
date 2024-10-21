var cancelled = false;
var admin = false;
var cookieDebounce = false;
var cheater = localStorage.getItem("cheater-1");
var cheaterPunishment = Number(localStorage.getItem("cheaterPunishment-1"));

var cookies = Number(localStorage.getItem("cookies-1"));
multiplier = Number(localStorage.getItem("multiplier-1"));
var multiplierCost = Number(localStorage.getItem("multiplierCost-1"));
var workers = Number(localStorage.getItem("workers-1"));

let adminButtonOne, adminButtonTwo;

if (cookies == null) {
  cookies = 0;
}
if (multiplier == null || multiplier == 0) {
  multiplier = 1;
}
if (multiplierCost == null || multiplierCost == 0) {
  multiplierCost = 100;
}
if (cheaterPunishment == null) {
  cheaterPunishment = 999999999;
}
if (workers == null) {
  workers = 0;
}

if (cheater == null || cheater == "false") {
  cheater = false;
} else if (cheater == "true") {
  cheater = true;
}

const cookieText = document.querySelector("#cookies");
const multiplierText = document.querySelector("#multiplier");
const multiplierButton = document.querySelector("#button2");

cookieText.textContent = "Cookies = " + cookies;
multiplierText.textContent = "Multiplier = " + multiplier + "x";
multiplierButton.textContent =
  "+1 Multiplier(Costs " + multiplierCost + " cookies)";

if (cheater == true) {
  window.alert(
    "You really thought you could get away? Your losses have been doubled."
  );
  cheaterPunishment += 1;
  setInterval(function () {
    if (cheater == true) {
      cookies -= cheaterPunishment * multiplier;
      cookieText.textContent = "Cookies = " + cookies;
    }
  }, 1);
}

document.querySelector("#button").addEventListener("click", () => {
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

document.querySelector("#button1").addEventListener("click", () => {
  if (cookieDebounce == false) {
    cookieDebounce = true;
    cookies = cookies + 1 * multiplier;
    cookieText.textContent = "Cookies = " + cookies;

    sleep(100).then(() => {
      cookieDebounce = false;
    });
  }
});

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

document.querySelector("#button3").addEventListener("click", () => {
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
    cheater = false;
    cheaterPunishment = 1;
    if (adminButtonOne) adminButtonOne.remove();
    if (adminButtonTwo) adminButtonTwo.remove();
    admin = false;
    window.alert("All your data has been cleared");
  }
});

document.querySelector("#button4").addEventListener("click", () => {
  var password = prompt("Enter password to acccess the admin buttons");
  var adminPassword = window.atob(
    "bWFzb253aWxsbmV2ZXJndWVzc3RoaXNwYXNzd29yZDE="
  );

  if (password == adminPassword && !document.querySelector("#adminButtonOne")) {
    admin = true;
    adminButtonOne = document.createElement("div");
    adminButtonOne.innerHTML = `<button id="adminButtonOne">Add cookies</button>`;
    document.body.appendChild(adminButtonOne);

    adminButtonTwo = document.createElement("div");
    adminButtonTwo.innerHTML = `<button>Set multiplier</button>`;
    document.body.appendChild(adminButtonTwo);

    adminButtonOne.addEventListener("click", () => {
      var cookiesAdded = Number(
        prompt("Enter the amount of cookies to add below:")
      );
      cookies = cookies + cookiesAdded;
      cookieText.textContent = "Cookies = " + cookies;
    });

    adminButtonTwo.addEventListener("click", () => {
      var newMultiplier = Number(
        prompt("Enter the multiplier value you want below:")
      );
      multiplier = newMultiplier;
      multiplierText.textContent = "Multiplier = " + multiplier + "x";
    });
  } else if (password != adminPassword) {
    if (password == "password" && cheater == false) {
      cheater = true;
      window.alert(
        "*Sigh*, what, did your parents raise you wrong or something? Did you really think that'd work? Okay, you get an F for effort, have fun losing cookies."
      );
      setInterval(function () {
        if (cheater == true) {
          cookies -= cheaterPunishment * multiplier;
          cookieText.textContent = "Cookies = " + cookies;
        }
      }, 1);
    } else if (cheater) {
      window.alert(
        "Stop, you should be embarrassed right now that you guessed password was the password."
      );
    } else if (admin) {
      window.alert("Already an admin, nothing happened");
    } else {
      window.alert("Incorrect password!");
    }
  }
});

window.addEventListener("beforeunload", function () {
  localStorage.setItem("cookies-1", cookies);
  localStorage.setItem("multiplier-1", multiplier);
  localStorage.setItem("multiplierCost-1", multiplierCost);
  localStorage.setItem("cheater-1", cheater);
  localStorage.setItem("cheaterPunishment-1", cheaterPunishment);
  localStorage.setItem("workers-1", workers);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
