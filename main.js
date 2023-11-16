//alert("Probando")

// Carrito de compras
// Arrays con lista de productos en data.json

const shopContent = document.getElementById("shopContent");
const checkShopCart = document.getElementById("CheckShopCart");
const modalWindow = document.getElementById("modalWindow");
const shopCartQuantity = document.getElementById("shopCartQuantity");


// Carrito función y local storage (carrito vacio o con items guardados)

let shoppingCart = JSON.parse(localStorage.getItem("SavedItems")) || []

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

//Recorrido de productos en data.json

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "Card"
        content.innerHTML = `<img src="${product.img}"> 
        <h3 class="product-tag">${product.name}</h3>
        <p class="price-tag">${product.price} $</p>`;
        
        shopContent.append(content);

//Comprar items

        let buy = document.createElement("button")
        buy.innerText = "Buy";
        buy.className = "Buy";

        content.append(buy);

        buy.addEventListener("click", () =>{
        const repeat = shoppingCart.some((repeatedProduct) => repeatedProduct.id === product.id);
        if (repeat){
            shoppingCart.map((prod) =>{
                if(prod.id === product.id){
                    prod.quantity++;
                }
            })
        } else{
//Push al carrito

            shoppingCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: product.quantity,
            })
        }
        shopCartCounter();
        localSave();
        })
    });
}

getProducts();

//Modificaciones al carrito (Modal) interacciones
    const modifyShopCart = () => {
    modalWindow.innerHTML = "";
    modalWindow.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-tittle">Shop Cart</h1>
    `;

    modalWindow.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
        modalWindow.style.display = "none";
    });

    modalHeader.append(modalButton);

    shoppingCart.forEach((product) => {
    let shoppingCartContent = document.createElement("div");
    shoppingCartContent.className = "modal-window-content"
    shoppingCartContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.name}</h3>
    <p>${product.price} $</p>
    <span class="subtract"> - </span>
    <p>Quantity: ${product.quantity}</p>
    <span class="add"> + </span>
    <p>Total: ${product.quantity * product.price}</p>
    <span class="delete-product"> ❎ </span>
    `;
    modalWindow.append(shoppingCartContent);

//Restar cantidad

    let subtract = shoppingCartContent.querySelector(".subtract")

    subtract.addEventListener("click", () => {
        if(product.quantity !== 1){
        product.quantity--;}
        localSave();
        modifyShopCart();
    });

//Sumar cantidad

    let add = shoppingCartContent.querySelector(".add")
    add.addEventListener("click", () =>{
        product.quantity++;
        localSave();
        modifyShopCart();
    })

//Eliminar cantidad

    let eliminate = shoppingCartContent.querySelector(".delete-product");

    eliminate.addEventListener("click", () => {
        removeContent(product.id);
    })
    
    });

//Total a pagar
    const total = shoppingCart.reduce((acc, the) => acc + the.price * the.quantity, 0)
    const totalToPay = document.createElement("div");
    totalToPay.className = "total-content";
    totalToPay.innerHTML = `total to pay: ${total} $`;
    
    modalWindow.append(totalToPay);
    
}
checkShopCart.addEventListener("click", modifyShopCart)

//Remover del carrito

const removeContent = (id) => {
    const findID = shoppingCart.find((element) => element.id === id);

    shoppingCart = shoppingCart.filter((shoppingCartID) => {
        return shoppingCartID !== findID;
    })
    shopCartCounter();
    localSave();
    modifyShopCart();

    swal("Removing item...")
.then((value) => {
  swal(`Item succesfully removed: `);
});
}

//Contador carrito

const shopCartCounter = () => {
    shopCartQuantity.style.display = "block";
    const shopCartLength = shoppingCart.length;
    localStorage.setItem("shopCartLength", JSON.stringify(shopCartLength))
    shopCartQuantity.innerText = JSON.parse(localStorage.getItem("shopCartLength"))
}
shopCartCounter ();


//Local Storage

const localSave = () => {
localStorage.setItem("SavedItems", JSON.stringify(shoppingCart))
}
