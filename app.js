const valueDay = document.getElementById("input_day");
const valueMonth = document.getElementById("input_month");
const valueYear = document.getElementById("input_year");

const emptyDay = document.getElementById("empty_day");
const invalidDay = document.getElementById("invalid_day");
const emptyMonth = document.getElementById("empty_month");
const invalidMonth = document.getElementById("invalid_month");
const emptyYear = document.getElementById("empty_year");
const invalidYear = document.getElementById("invalid_year");
const errorMessages = document.querySelectorAll(".message_error");
const titleDate = document.querySelectorAll(".title_date");
const dateInputs = document.querySelectorAll(".input_value");

const yearLife=document.getElementById("years_of_life");
const monthLife=document.getElementById("months_of_life");
const daysLife=document.getElementById("days_of_life")


const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();

let regex = /[a-zA-Z]/;

const requestValuesForm = (event) => {
  event.preventDefault();

  const userDay = valueDay.value;
  const userMonth = valueMonth.value;
  const userYear = valueYear.value;

  if (userDay === "" && userMonth === "" && userYear === "") {
    return datesEmpty();
  }
  if (regex.test(userDay)) {
    validateDayInvalid();
  }
  if (regex.test(userMonth)) {
    validateMonthInvalid();
  }
  if (regex.test(userYear)) {
    validateYearInvalid();
  }
  if (userDay === "") {
    validateDayEmpty();
  }
  if (userMonth === "") {
    validateMonthEmpty();
  }
  if (userYear === "") {
    return validateYearEmpty();
  }

  const day = parseInt(userDay, 10);
  const month = parseInt(userMonth, 10);
  const year = parseInt(userYear, 10);

  let yearsOfLife = currentYear - year;
  let monthsOfLife = (currentMonth - userMonth + 12) % 12;

  let daysInLastMonth = new Date(year, userMonth, 0).getDate();
  let daysOfLife = currentDay < userDay ? daysInLastMonth - userDay + currentDay : currentDay - userDay;

  if (day <= 0 || day > daysInLastMonth) {
    validateDayInvalid();
  }
  if (month <= 0 || month > 12) {
    validateMonthInvalid();
  }
  if (year > currentYear) {
    validateYearInvalid();
    return;
  } else {
    if ([invalidDay, invalidMonth, invalidYear].every( (element) => element.style.display === "none")) {
      yearLife.textContent=yearsOfLife;
      monthLife.textContent=monthsOfLife;
      daysLife.textContent=daysOfLife;
    }
  }
};

function validateDayInvalid() {
  invalidDay.style.display = "block";
}

function validateDayEmpty() {
  emptyDay.style.display = "block";
}

function validateMonthEmpty() {
  emptyMonth.style.display = "block";
}

function validateMonthInvalid() {
  invalidMonth.style.display = "block";
}

function validateYearEmpty() {
  emptyYear.style.display = "block";
}

function validateYearInvalid() {
  return (invalidYear.style.display = "block");
}
function errorTitleDates() {
  titleDate.forEach((title) => {
    title.style.color = "var(--color-Lightred)";
  });
}

function datesEmpty() {
  validateDayEmpty();
  validateMonthEmpty();
  validateYearEmpty();
  errorTitleDates();
}

function datesInvalids() {
  validateDayInvalid();
  validateMonthInvalid();
  validateYearInvalid();
  errorTitleDates();
}

dateInputs.forEach((input) => {
  input.addEventListener("input", clearInputValidationMessages);
});

function clearInputValidationMessages() {
  titleDate.forEach((title) => {
    title.style.color = "var(--color-Smokey-grey)";
  });

  errorMessages.forEach((label) => {
    label.style.display = "none";
  });
}
