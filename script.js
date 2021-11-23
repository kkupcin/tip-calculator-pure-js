let billInput = document.querySelector("#bill-input");
let customTip = document.querySelector("#custom-tip");
let noOfPeople = document.querySelector("#no-of-people");
let noOfPeopleEntry = document.querySelector(".no-of-people-entry");
let tipWrapper = document.querySelector(".tip-input-wrapper");
let tipTotalShown = document.querySelector(".tip-amount");
let totalShown = document.querySelector(".total-amount");
let resetBtn = document.querySelector(".reset-button");


// REDUCE PARSEFLOAT AND PARSE INT AND PUT E.TARGET.VALUE INTO VARS


// Set default values

tipTotalShown.innerText = "$0.00";
totalShown.innerText = "$0.00";

let previousBillValue;
let previousTipValue;
let defaultNoOfPeopleValue;
let currentTip;

// Add listeners for tips

tipWrapper.addEventListener("click", (e) => {
  let tipAmountList = [...tipWrapper.children];
  tipAmountList.forEach((tip) => {
    if (tip.dataset.tip === e.target.dataset.tip) {
      tip.classList.add("active");
      currentTip = parseFloat(e.target.dataset.tip);
    } else if (tip.dataset.tip !== e.target.dataset.tip) {
      tip.classList.remove("active");
    }
  });

  calculateTip();
  calculateTotal();
});

// Listen for inputs

billInput.addEventListener("input", (e) => {
  if (e.target.value.trim() === "" || parseFloat(e.target.value) < 0) {
    e.target.value = "";
  }

  // Restore reset button functionality
  if (e.target.value !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (parseFloat(e.target.value) > 9999.99 || e.target.value.includes("-")) {
    e.target.value = parseFloat(previousBillValue);
  }

  if (e.target.value.includes(".")) {
    let index = e.target.value.indexOf(".");
    let calcDecimals = e.target.value.length - index;
    if (calcDecimals > 3) {
      e.target.value = parseFloat(previousBillValue);
    }
  }

  // Prevent number fro starting with 0
  if (e.target.value.length > 1 && e.target.value.startsWith("0")) {
    e.target.value = e.target.value.replace("0", "");
  }

  previousBillValue = parseFloat(e.target.value);

  calculateTip();
  calculateTotal();
});

customTip.addEventListener("input", (e) => {
  if (e.target.focus) {
    currentTip = 0;
  }

  if (parseFloat(e.target.value) < 0 || e.target.value.trim() === "") {
    e.target.value = 0;
  }

  // Restore reset button functionality
  if (e.target.value !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (
    parseInt(e.target.value) > 100 ||
    e.target.value.includes("-") ||
    e.target.value.length > 3
  ) {
    e.target.value = parseInt(previousTipValue);
  }

  // Adjust current tip value
  if (e.target.value.trim() !== "") {
    currentTip = parseInt(e.target.value);
  }

  // Prevent number fro starting with 0
  if (e.target.value.length > 1 && e.target.value.startsWith("0")) {
    e.target.value = e.target.value.replace("0", "");
  }

  previousTipValue = parseInt(e.target.value);

  calculateTip();
  calculateTotal();
});

noOfPeople.addEventListener("input", (e) => {
  // Show error if user does not enter number of people or enters 0
  if (
    e.target.value === "" ||
    parseFloat(e.target.value === 0) ||
    parseFloat(e.target.value) < 0
  ) {
    noOfPeopleEntry.classList.add("error-label");
    return;
  }

  noOfPeopleEntry.classList.remove("error-label");

  // Restore reset button functionality
  if (e.target.value !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (
    parseInt(e.target.value) > 99 ||
    e.target.value.includes("-") ||
    e.target.value.length > 2
  ) {
    e.target.value = defaultNoOfPeopleValue;
  }

  // Prevent number fro starting with 0
  if (e.target.value.length > 1 && e.target.value.startsWith("0")) {
    e.target.value = e.target.value.replace("0", "");
  }

  defaultNoOfPeopleValue = parseInt(e.target.value);

  calculateTip();
  calculateTotal();
});

// Calculation functions for tip and total

const calculateTip = () => {
  const billValue = parseFloat(billInput.value) || 0;
  const tipValue = currentTip ? currentTip / 100 : 0;
  const noOfPeopleValue = parseInt(noOfPeople.value) || 1;

  tipTotalShown.innerText = `$${parseFloat(
    (billValue * tipValue) / noOfPeopleValue
  ).toFixed(2)}`;
};

const calculateTotal = () => {
  const billValue = parseFloat(billInput.value) || 0;
  const tipValue = currentTip ? currentTip / 100 : 0;
  const noOfPeopleValue = parseInt(noOfPeople.value) || 1;

  totalShown.innerText = `$${parseFloat(
    (billValue + billValue * tipValue) / noOfPeopleValue
  ).toFixed(2)}`;
};

// Disable reset button if clicked / no values entered

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  billInput.value = "";
  customTip.value = "";
  noOfPeople.value = "";
  resetBtn.classList.add("disabled");
});
