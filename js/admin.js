let openModal = document.querySelector(".open-modal");
let elModal = document.querySelector(".modals");
let closeModal = document.querySelector(".close-modal");
let closeEditModal = document.querySelector(".edit-modal-close");
let elForm = document.querySelector(".js-form");
let elEditForm = document.querySelector(".js-edit-form");
let elName = document.querySelector(".pro-name");
let elDesc = document.querySelector(".pro-desc");
let elImg = document.querySelector("#pro-img");
let elPrice = document.querySelector(".pro-price");
let elList = document.querySelector(".js-list");
let elEditModal = document.querySelector(".editModal");
// let elTemplate = document.querySelector(".js-template").content;

let localData = localStorage.getItem("token");

if (!localData) {
  location.replace("register.html");
}

openModal.addEventListener("click", (evt) => {
  elModal.classList.remove("d-none");

  elModal.classList.add("modalOpacity");
});

closeModal.addEventListener("click", (evt) => {
  elModal.classList.add("d-none");
});

closeEditModal.addEventListener("click", (evt) => {
  elEditModal.classList.add("d-none");
});

async function render() {
  elList.innerHTML = "";
  await fetch("http://localhost:5000/product", {
    headers: {
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        data.forEach((item) => {
          let bisket = Math.floor(item.product_price / 12);
          elList.innerHTML += `
          <div class="col-md-3 ">
                <div class="card position-relative p-3" >
                    <img src="http://localhost:5000/${item.product_img}" class="img-fluid" height="200" width="233" alt="Sunset Over the Sea"/>
                    <i class="fa-solid fa-heart user-like fa-1x position-absolute"></i>
                    <div class="card-body">
                        <p class="phone__name h6 m-0">${item.product_name}</p>
                        <p class="m-0 text-black mb-2">${item.product_desc}</p>
                        <strong class="phone__price">$${item.product_price}</strong>
                        <p class="m-0 price__credit mt-2">$${bisket} / 12 month</p>
                        
                    </div>
                    <!-- <a class="add-card">Add Card</a> -->
                    <div class="d-flex justify-content-center">
                        <i data-product-id=${item.id}  class="fa-solid edit fa-pen-to-square "></i>
                        <i data-product-id=${item.id} class="fa-solid delete fa-trash ms-3"></i>
                    </div>
                </div>
            </div>
          `;
        });
      }
    })
    .catch((err) => console.log(err));
  elName.value = "";
  elPrice.value = "";
  elDesc.value = "";
}

render();

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let formData = new FormData(elForm);
  formData.append("product_name", elName.value);
  formData.append("product_desc", elDesc.value);
  formData.append("product_img", elImg.files[0]);
  formData.append("product_price", elPrice.value);

  fetch("http://localhost:5000/product", {
    method: "POST",
    headers: {
      Authorization: localData,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        location.reload();
      }
    })
    .catch((err) => console.log(err));

  render();
  elModal.classList.add("d-none");
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete")) {
    let productId = evt.target.dataset.productId;
    console.log(productId);
    fetch(`http://localhost:5000/product/${productId}`, {
      method: "Delete",
      headers: {
        Authorization: localData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          render();
        }
      });
  }

  if (evt.target.matches(".edit")) {
    evt.preventDefault();
    let productId = evt.target.dataset.productId;
    elEditModal.classList.remove("d-none");

    let elEditForm = document.querySelector(".js-edit-form");
    let elName = document.querySelector(".edit-name");
    let elDesc = document.querySelector(".edit-desc");
    let elImg = document.querySelector("#edit-img");
    let elPrice = document.querySelector(".edit-price");

    elEditForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let formData = new FormData(elForm);
      formData.append("product_name", elName.value);
      formData.append("product_desc", elDesc.value);
      formData.append("product_img", elImg.files[0]);
      formData.append("product_price", elPrice.value);

      fetch(`http://localhost:5000/product/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: localData,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // elList.innerHTML = ''
            render();
          }
        })
        .catch((err) => console.log(err));
      elEditModal.classList.add("d-none");
      elName.value = "";
      elPrice.value = "";
      elDesc.value = "";
    });
  }
});
