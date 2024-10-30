window.addEventListener("DOMContentLoaded", function () {
  this.alert("DOM Content loaded.");
  //Variables/data loading
  var cancelled = false;
  var cookieDebounce = false;
  var cookieCooldown = 25;

  var cookies = localStorage.getItem("cookies-1") ?? BigInt(0);
  var multiplier = localStorage.getItem("multiplier-1") ?? BigInt(1);
  var multCost = localStorage.getItem("multiplierCost-1") ?? BigInt(100);
  var workers = localStorage.getItem("workers-1") ?? BigInt(0);
  var workerCost = localStorage.getItem("workerCost-1") ?? BigInt(250);

  if (typeof cookies != BigInt) cookies = BigInt(cookies);
  if (typeof multiplier != BigInt) multiplier = BigInt(multiplier);
  if (typeof multCost != BigInt) multCost = BigInt(multCost);
  if (typeof workers != BigInt) workers = BigInt(workers);
  if (typeof workerCost != BigInt) workerCost = BigInt(workerCost);

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
    "x2 Multiplier(Costs " + multCost + " cookies)";
  workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
  workerText.textContent = "Workers = " + workers;

  /*
BUTTONS START HERE
*/

  //Epilepsy button
  epilepsyButton.addEventListener("click", () => {
    var correctPassword = false;
    cancelled = false;
    document.body.style.background = "darkgrey";

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
    //Insert stuff here to change the size when clicked
  });

  cookieButton.addEventListener("mouseup", async () => {
    if (cookieDebounce == false) {
      cookieDebounce = true;
      cookies = cookies + BigInt(1) * multiplier;
      cookieText.textContent = "Cookies = " + cookies;

      await sleep(cookieCooldown);
      cookieDebounce = false;
    }
  });

  //Multiplier button
  multiplierButton.addEventListener("click", () => {
    if (cookies >= multCost) {
      multiplier = multiplier * BigInt(2);
      multiplierText.textContent = "Multiplier = " + multiplier + "x";
      cookies = cookies - multCost;
      cookieText.textContent = "Cookies = " + cookies;
      // x ^ (a + b) = x^a * b^b
      // BigInt ^ 1 * BigInt ^ 0.3 = BigInt ^ 1.3
      // BigInt * Number(BigInt) ^ 0.3
      multCost = BigInt(Number(multCost) ** 1.3);
      multiplierButton.textContent =
        "x2 Multiplier(Costs " + multCost + " cookies)";
    }
  });

  //Clear data button
  clearDataButton.addEventListener("click", () => {
    var boolean = window.confirm(
      "Are you sure you want to clear all your data?"
    );

    if (boolean == true) {
      localStorage.clear();
      cookies = BigInt(0);
      cookieText.textContent = "Cookies = " + cookies;
      multiplier = BigInt(1);
      multiplierText.textContent = "Multiplier = " + multiplier + "x";
      multCost = BigInt(100);
      multiplierButton.textContent =
        "x2 Multiplier(Costs " + multCost + " cookies)";
      workers = BigInt(0);
      workerCost = BigInt(250);
      workerText.textContent = "Workers = " + workers;
      workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
      window.alert("All your data has been cleared");
    } else {
      alert("Your data has not been cleared.");
    }
  });

  button.addEventListener("click", () => {
    alert("???");
  });

  //Worker button
  workerButton.addEventListener("click", () => {
    if (cookies >= workerCost) {
      workers = workers + BigInt(1);
      cookies = cookies - workerCost;
      workerCost = workerCost * BigInt(3);
      workerText.textContent = "Workers: " + workers;
      workerButton.textContent = "+1 Worker(Costs " + workerCost + " cookies)";
      cookieText.textContent = "Cookies = " + cookies;

      alert("Purchased a worker");
    }
  });

  /*
BUTTONS END HERE
*/

  //Worker functionality
  setInterval(function () {
    var workerProfit = workers * (1 * multiplier);
    cookies += workerProfit;
    cookieText.textContent = "Cookies = " + cookies;
  }, 500);

  //Data saving
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("cookies-1", cookies);
    localStorage.setItem("multiplier-1", multiplier);
    localStorage.setItem("multiplierCost-1", multCost);
    localStorage.setItem("cheater-1", cheater);
    localStorage.setItem("cheaterPunishment-1", cheaterPunishment);
    localStorage.setItem("workers-1", workers);
    localStorage.setItem("workerCost-1", workerCost);
  });

  //Functions
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  var pattern = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
    "Enter",
  ];
  var current = 0;
  var keyHandler = function (event) {
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
      current = 0;
      return;
    }

    current++;

    if (pattern.length === current) {
      current = 0;
      window.alert("You found it!");
    }
  };

  document.addEventListener("keydown", keyHandler, false);
});
