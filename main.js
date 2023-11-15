//alert("Probando")


// Carrito de compras
// Arrays con lista de productos en data.json

const shopContent = document.getElementById("shopContent");
const checkShopCart = document.getElementById("CheckShopCart");
const modalWindow = document.getElementById("modalWindow");
const shopCartQuantity = document.getElementById("shopCartQuantity");


// Carrito función
let shoppingCart = JSON.parse(localStorage.getItem("SaveItems")) || []

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "Card"
        content.innerHTML = `<img src="${product.img}"> 
        <h3 class="product-tag">${product.name}</h3>
        <p class="price-tag">${product.price} $</p>`;
        
        shopContent.append(content);
        let buy = document.createElement("button")
        buy.innerText = "Buy";
        content.append(buy);
        buy.className = "buy";
    
        buy.addEventListener("click", () =>{
        const repeat = shoppingCart.some((repeatedProduct) => repeatedProduct.id === product.id);
        if (repeat){
            shoppingCart.map((prod) =>{
                if(prod.id === product.id){
                    prod.quantity++;
                }
            })
        } else{
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


checkShopCart.addEventListener("click", () =>{
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
    <p>Quantity: ${product.quantity}</p>
    <p>Total: ${product.quantity * product.price}</p>
    `;
    modalWindow.append(shoppingCartContent);
    

    let eliminate = document.createElement("span");
    eliminate.innerText = "❎";
    eliminate.className = "delete-product";
    shoppingCartContent.append(eliminate);
    eliminate.addEventListener("click", removeContent)
    });

    const total = shoppingCart.reduce((acc, the) => acc + the.price * the.quantity, 0)
    const totalToPay = document.createElement("div");
    totalToPay.className = "total-content";
    totalToPay.innerHTML = `total to pay: ${total} $`;
    modalWindow.append(totalToPay)
    
});

const removeContent = () => {
    const findID = shoppingCart.find((element) => element.id);

    shoppingCart = shoppingCart.filter((shoppingCartID) => {
        return shoppingCartID !== findID;
    })
    shopCartCounter();
    localSave();
}

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
