loadProducts()

let wishlistCountElem = document.querySelector("#wishlistBtn span");
let wishedItemIdsStr = localStorage.getItem("productIds");
let wishedItemIds = wishedItemIdsStr == null ? [] : JSON.parse(wishedItemIdsStr);
wishlistCountElem.innerText = wishedItemIds.length;

if (wishedItemIdsStr == null) {
    localStorage.setItem("productIds", JSON.stringify(wishedItemIds))
}


function createProductElem(product) {
    let productStr = ` <div class="col mb-5">
            <div class="card h-100">
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${wishedItemIds.indexOf(product.id) !== -1 ? "Wished" : ""}</div>
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="...">
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="productName fw-bolder">${product.name}</h5>
                        <!-- Product price-->
                        <div class="productPrice"> 
                            $${product.price}
                        </div>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center" ><a data-id="${product.id}" class="btn btn-outline-dark mt-auto add-to-wishlist" href="#">${wishedItemIds.indexOf(product.id) === -1 ? "Add to wishlist" : "Remove from wishlist"}</a></div>
                </div>
            </div>
        </div>`
    return productStr;
}

let modalListData = [];
function loadProducts() {

    let productsBox = document.getElementById("productsBox");
    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                let productElem = createProductElem(product)

                productsBox.innerHTML += productElem;


            });

            document.querySelectorAll(".add-to-wishlist")
                .forEach(elem => {
                    elem.addEventListener("click", function (e) {
                        e.preventDefault();
                        let id = +elem.getAttribute("data-id");
                        let idsArrStr = localStorage.getItem("productIds");
                        let idsArr = JSON.parse(idsArrStr);


                        let modalList = document.getElementById("modalList");
                        let productElem = elem.parentElement.parentElement.parentElement;
                        let productName = productElem.querySelector(".productName").innerText;
                        let productPrice = productElem.querySelector(".productPrice").innerText;





                        if (idsArr.indexOf(id) === -1) {
                            let td = `
                            <tr>
                                <td>${productName}</td>
                                <td>${productPrice}</td>
                            </tr>`;
                            modalList.innerHTML += td;

                            elem.innerText = "Remove from wishlist"
                            idsArr.push(id);
                            elem.parentElement.parentElement.parentElement.firstElementChild.innerText = "Wished"

                            localStorage.setItem("productIds", JSON.stringify(idsArr));

                            wishlistCountElem.innerText = idsArr.length
                        }
                        else {
                            elem.innerText = "Add to wishlist";
                            elem.parentElement.parentElement.parentElement.firstElementChild.innerText = "";
                            let index = idsArr.indexOf(id);
                            idsArr.splice(index, 1);
                            localStorage.setItem("productIds", JSON.stringify(idsArr));
                            wishlistCountElem.innerText = idsArr.length;

                            let modalListItem = modalList.querySelector("tr td");
                            while (modalListItem.firstChild) {
                                if (modalListItem.innerText === productName) {
                                    modalListItem.parentElement.remove();
                                    break;
                                }
                                modalListItem = modalListItem.parentElement.nextElementSibling.querySelector(`td:first-child`);
                            }
                        }

                    })
                })
        })
}