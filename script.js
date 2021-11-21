let billInput = document.querySelector("#bill-input");
let customTip = document.querySelector("#custom-tip");
let noOfPeople = document.querySelector("#no-of-people");
let tipAmountList = document.querySelectorAll("[data-tip]");
let tipTotalShown = document.querySelector(".tip-amount");
let totalShown = document.querySelector(".total-amount");
let resetBtn = document.querySelector(".reset-button");

let tipAmount = 0;
let billAmount = 0;

billInput.addEventListener("input", (e) => {
  console.log(tipAmount);
  calculateTip(tipAmount || 0);
  calculateTotal(tipAmount || 0);
  calculatePerPerson(tipAmount, parseInt(e.target.value) || 0);
});

customTip.addEventListener("input", (e) => {
  calculateTip(parseInt(e.target.value.trim()) || 0);
  calculateTotal(parseInt(e.target.value.trim()) || 0);
  calculatePerPerson(tipAmount, billAmount);
});

noOfPeople.addEventListener("input", (e) => {
  calculateTip(tipAmount || 0);
  calculateTotal(tipAmount || 0);
  calculatePerPerson(tipAmount, billAmount);
});

const calculateTip = (tip) => {
  tipAmount = parseInt(billInput.value) * (parseInt(tip) / 100);
};

const calculateTotal = (tip) => {
  billAmount = parseInt(tip) + parseInt(billInput.value);
};

calculatePerPerson = (tip, bill) => {
  totalShown.innerText = `$${
    parseFloat(billAmount).toFixed(2) /
    (parseInt(noOfPeople.value) || 1).toFixed(2)
  }`;
  tipTotalShown.innerText = `$${
    parseFloat(tipAmount).toFixed(2) /
    (parseInt(noOfPeople.value) || 1).toFixed(2)
  }`;
};
