const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.maxHeight;

    document.querySelectorAll(".faq-answer").forEach(item => {
      item.style.maxHeight = null;
    });

    document.querySelectorAll(".faq-question span").forEach(icon => {
      icon.textContent = "+";
    });

    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      button.querySelector("span").textContent = "−";
    }
  });
});

const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const business = document.getElementById("business");
  const budget = document.getElementById("budget");
  const message = document.getElementById("message");

  let valid = true;

  clearErrors();

  if (name.value.trim().length < 2) {
    showError(name, "Please enter your name");
    valid = false;
  }

  if (!validateEmail(email.value.trim())) {
    showError(email, "Please enter a valid email");
    valid = false;
  }

  if (business.value.trim().length < 2) {
    showError(business, "Please enter your business name");
    valid = false;
  }

  if (budget.value.trim() === "") {
    showError(budget, "Please select a budget");
    valid = false;
  }

  if (message.value.trim().length < 12) {
    showError(message, "Please add a few project details");
    valid = false;
  }

  if (valid) {
    formSuccess.textContent = "Your request has been submitted successfully.";
    form.reset();
  } else {
    formSuccess.textContent = "";
  }
});

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
  input.style.borderColor = "#fca5a5";
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(error => {
    error.textContent = "";
  });

  document.querySelectorAll("input, textarea, select").forEach(input => {
    input.style.borderColor = "";
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const revealItems = document.querySelectorAll(".section, .hero, .brands");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal", "show");
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach(item => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});