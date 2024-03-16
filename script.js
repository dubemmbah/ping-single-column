"use strict";

const emailInput = document.querySelector(".input__wrapper input");
const errorMsg = document.querySelector(".error-msg");
const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-notify");
const popup = document.querySelector(".popup");

const validateEmail = function (email) {
  if (typeof email !== "string" || email.indexOf("@") === -1) return false;
  //   Validating that the email is a string and that it contains an '@' symbol

  const [localPart, domain] = email.split("@");

  if (localPart.length === 0 || domain.length < 3) return false;

  const domainExtension = domain.split(".");

  if (
    domainExtension.length < 2 ||
    domainExtension[domainExtension.length - 1].length < 2
  )
    return false;

  return true;
};

function displayError() {
  errorMsg.style.display = "block";
  emailInput.classList.add("error");
}

emailInput.addEventListener("input", () => {
  if (!validateEmail(emailInput.value)) {
    displayError();
  } else {
    errorMsg.style.display = "none";
    emailInput.classList.remove("error");

    emailInput.classList.remove("error-input");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the default behavior whereby the form reloads the page on submission

  console.log("Form submitted");

  if (!validateEmail(emailInput.value)) {
    displayError();

    emailInput.classList.add("error-input");
    emailInput.placeholder = "email@example/com";
    emailInput.value = "";
  }

  if (validateEmail(emailInput.value)) {
    errorMsg.style.display = "none";
    emailInput.classList.remove("error");

    emailInput.classList.remove("error-input");
    emailInput.placeholder = "Your email address...";

    // Clear email input field
    emailInput.value = "";

    // Remove focus
    emailInput.blur();

    // Remove .show class from thankyou message
    popup.classList.remove("show");

    // Trigger reflow i.e., force browser to recalculate position and place in initial position
    void popup.offsetWidth;

    // Add .show class
    popup.classList.add("show");
  }
});

// validateEmail("dubemmbah@gmail.com");
