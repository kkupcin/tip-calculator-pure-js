let billInput = document.querySelector("#bill-input");
let customTip = document.querySelector("#custom-tip");
let noOfPeople = document.querySelector("#no-of-people");
let noOfPeopleEntry = document.querySelector(".no-of-people-entry");
let tipWrapper = document.querySelector(".tip-input-wrapper");
let tipTotalShown = document.querySelector(".tip-amount");
let totalShown = document.querySelector(".total-amount");
let resetBtn = document.querySelector(".reset-button");

// Set default values

tipTotalShown.innerText = "$0.00";
totalShown.innerText = "$0.00";

let previousBillValue;
let previousTipValue;
let defaultNoOfPeopleValue;
let currentTip;

// Add listeners for tips

tipWrapper.addEventListener("click", (e) => {
  let clickedTip = e.target.dataset.tip;
  let tipAmountList = [...tipWrapper.children];
  tipAmountList.forEach((tip) => {
    if (tip.dataset.tip === clickedTip) {
      tip.classList.add("active");
      currentTip = parseInt(clickedTip);
    } else if (tip.dataset.tip !== clickedTip) {
      tip.classList.remove("active");
    }
  });

  calculateTip();
  calculateTotal();
});

// Listen for inputs

billInput.addEventListener("input", (e) => {
  let billInputAmount = parseFloat(e.target.value);
  let billInputAmountString = e.target.value;
  if (billInputAmount === "" || billInputAmount < 0) {
    billInputAmount = "";
  }

  // Restore reset button functionality
  if (billInputAmount !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (billInputAmount > 9999.99 || billInputAmountString.includes("-")) {
    billInputAmount = previousBillValue;
  }

  if (billInputAmountString.includes(".")) {
    let index = billInputAmountString.indexOf(".");
    let calcDecimals = billInputAmountString.length - index;
    if (calcDecimals > 3) {
      billInputAmount = previousBillValue;
    }
  }

  // Prevent number fro starting with 0
  if (billInputAmountString.length > 1 && billInputAmountString.startsWith("0")) {
    billInputAmount = billInputAmountString.replace("0", "");
  }

  previousBillValue = billInputAmount;

  calculateTip();
  calculateTotal();
});

customTip.addEventListener("input", (e) => {
  let tipInputAmount = parseInt(e.target.value);
  let tipInputAmountString = e.target.value;
  if (e.target.focus) {
    currentTip = 0;
  }

  if (tipInputAmount < 0 || tipInputAmount === "") {
    tipInputAmount = 0;
  }

  // Restore reset button functionality
  if (tipInputAmount !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (
    tipInputAmount > 100 ||
    tipInputAmountString.includes("-") ||
    tipInputAmountString.length > 3
  ) {
    tipInputAmount = previousTipValue;
  }

  // Adjust current tip value
  if (tipInputAmountString.trim() !== "") {
    currentTip = tipInputAmount;
  }

  // Prevent number fro starting with 0
  if (tipInputAmountString.length > 1 && tipInputAmountString.startsWith("0")) {
    tipInputAmount = tipInputAmountString.replace("0", "");
  }

  previousTipValue = tipInputAmount;

  calculateTip();
  calculateTotal();
});

noOfPeople.addEventListener("input", (e) => {
  let noOfPeopleInputAmount = parseInt(e.target.value);
  let noOfPeopleInputAmountString = e.target.value;
  // Show error if user does not enter number of people or enters 0
  if (
    noOfPeopleInputAmount === "" ||
    noOfPeopleInputAmount === 0 ||
    noOfPeopleInputAmount < 0
  ) {
    noOfPeopleEntry.classList.add("error-label");
    return;
  }

  noOfPeopleEntry.classList.remove("error-label");

  // Restore reset button functionality
  if (noOfPeopleInputAmount !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (
    noOfPeopleInputAmount > 99 ||
    noOfPeopleInputAmountString.includes("-") ||
    noOfPeopleInputAmountString.length > 2
  ) {
    noOfPeopleInputAmount = defaultNoOfPeopleValue;
  }

  // Prevent number fro starting with 0
  if (
    noOfPeopleInputAmountString.length > 1 &&
    noOfPeopleInputAmountString.startsWith("0")
  ) {
    noOfPeopleInputAmount = noOfPeopleInputAmountString.replace("0", "");
  }

  defaultNoOfPeopleValue = noOfPeopleInputAmount;

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
