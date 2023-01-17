let elForm = document.querySelector(".js-form");
let elName = document.querySelector(".js-name");
let elPhone = document.querySelector(".js-phone");
let elEmail = document.querySelector(".js-email");
let elPassword = document.querySelector(".js-password");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elName.value,
      phone: elPhone.value,
      email: elEmail.value,
      password: elPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace('index.html')
      }
    })
    .catch((err) => console.log(err));
});
