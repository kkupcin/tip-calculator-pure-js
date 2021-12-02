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
  resetBtn.classList.remove("disabled");
  customTip.value = "";
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
  if (billInputAmountString === "" || parseFloat(billInputAmount) < 0) {
    billInput.value = "";
  }

  // Restore reset button functionality
  if (billInputAmount !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (billInputAmount > 9999.99 || billInputAmountString.includes("-")) {
    billInput.value = previousBillValue;
  }

  if (billInputAmountString.includes(".")) {
    let index = billInputAmountString.indexOf(".");
    let calcDecimals = billInputAmountString.length - index;
    if (calcDecimals > 3) {
      billInput.value = previousBillValue;
    }
  }

  // Prevent number from starting with 0
  if (
    billInputAmountString.length > 1 &&
    billInputAmountString.startsWith("0")
  ) {
    billInput.value = billInputAmountString.replace("0", "");
  }

  previousBillValue = billInput.value;

  // Disable reset button if all input values are empty
  if (
    billInput.value === "" &&
    customTip.value === "" &&
    noOfPeople.value === ""
  ) {
    resetBtn.classList.add("disabled");
  }

  calculateTip();
  calculateTotal();
});

customTip.addEventListener("input", (e) => {
  let tipInputAmount = parseInt(e.target.value);
  let tipInputAmountString = e.target.value;
  if (e.target.focus) {
    currentTip = 0;
  }

  if (tipInputAmountString === "" || parseFloat(tipInputAmount) < 0) {
    customTip.value = "";
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
    customTip.value = previousTipValue;
  }

  // Adjust current tip value
  if (tipInputAmountString.trim() !== "") {
    currentTip = tipInputAmount;
  }

  // Prevent number fro starting with 0
  if (tipInputAmountString.length > 1 && tipInputAmountString.startsWith("0")) {
    customTip.value = tipInputAmountString.replace("0", "");
  }

  previousTipValue = customTip.value;

  // Disable reset button if all input values are empty
  if (
    billInput.value === "" &&
    customTip.value === "" &&
    noOfPeople.value === ""
  ) {
    resetBtn.classList.add("disabled");
  }

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
  } else {
    noOfPeopleEntry.classList.remove("error-label");
  }

  // Restore reset button functionality
  if (noOfPeopleInputAmount !== "") {
    resetBtn.classList.remove("disabled");
  }

  // Add number limits on inputs
  if (noOfPeopleInputAmount > 99 || noOfPeopleInputAmountString.length > 2) {
    noOfPeople.value = defaultNoOfPeopleValue;
  }

  if (
    noOfPeopleInputAmountString === "" ||
    parseFloat(noOfPeopleInputAmount) < 0
  ) {
    noOfPeople.value = 0;
  }

  // Prevent number fro starting with 0
  if (
    noOfPeopleInputAmountString.length > 1 &&
    noOfPeopleInputAmountString.startsWith("0")
  ) {
    noOfPeople.value = noOfPeopleInputAmountString.replace("0", "");
  }

  defaultNoOfPeopleValue = noOfPeople.value;

  // Disable reset button if all input values are empty
  if (
    billInput.value === "" &&
    customTip.value === "" &&
    noOfPeople.value === ""
  ) {
    resetBtn.classList.add("disabled");
  }

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
  let tipAmountList = [...tipWrapper.children];
  billInput.value = "";
  customTip.value = "";
  noOfPeople.value = "";
  calculateTip();
  calculateTotal();
  tipAmountList.forEach((tip) => {
    tip.classList.remove("active");
    currentTip = 0;
  });
  resetBtn.classList.add("disabled");
});
