let localData = localStorage.getItem("token");
let elUser = document.querySelector(".js-user");
let elUserName = document.querySelector(".user-name");
let elLogout = document.querySelector(".js-logout");
let elList = document.querySelector(".js-list");

if (!localData) {
  location.replace("register.html");
} else {
  elUser.classList.remove("d-none");
}

// elLogout.addEventListener("click", (evt) => {
//   localStorage.clear();
//   location.reload();
// });

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
          <div class="col-12 col-sm-12 col-md-3 col-lg-3">
                <div class="card position-relative p-3" >
                    <img src="http://localhost:5000/${item.product_img}" class="img-fluid" height="200" width="233" alt="Sunset Over the Sea"/>
                    <i class="fa-solid fa-heart user-like fa-1x position-absolute"></i>
                    <div class="card-body">
                        <p class="phone__name h6 m-0">${item.product_name}</p>
                        <p class="m-0 text-black mb-2">${item.product_desc}</p>
                        <strong class="phone__price">$${item.product_price}</strong>
                        <p class="m-0 price__credit mt-2">$${bisket} 12 month</p>
                        
                    </div>
                    <a class="add-card">Add Card</a>
                    
                </div>
            </div>
          `;
        });
      }
    })
    .catch((err) => console.log(err));
}

render()
