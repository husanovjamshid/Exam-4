let elForm = document.querySelector(".js-form");
let elEmail = document.querySelector(".js-email");
let elPassword = document.querySelector(".js-password");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: elEmail.value,
      password: elPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        location.replace('index.html')
      }
    })
    .catch((err) => console.log(err));
});
