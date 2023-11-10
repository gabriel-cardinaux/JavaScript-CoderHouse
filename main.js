//alert("Probando")


// Carrito de compras
// Arrays con lista de productos

const shopContent = document.getElementById("shopContent");
const checkShopCart = document.getElementById("CheckShopCart");
const modalWindow = document.getElementById("modalWindow");
const shopCartQuantity = document.getElementById("shopCartQuantity");

const products = [
    {id:1, name: "English book starter", price: 2000, img:"https://acdn.mitiendanube.com/stores/934/273/products/9780194202374-es1-ba9db924c279c4cf5e15541542013234-480-0.jpg", quantity: 1,},
    {id:2, name: "English book intermediate", price: 2500, img:"https://pictures.abebooks.com/isbn/9780194648851-us.jpg", quantity: 1,},
    {id:3, name: "English book advanced", price: 3000, img:"https://images.cdn1.buscalibre.com/fit-in/360x360/0f/cf/0fcfa824a655009603bde4ad8409485e.jpg", quantity: 1,},
    {id:4, name: "French book starter", price: 2500, img:"https://m.media-amazon.com/images/I/51ESyWeXLAL.jpg", quantity: 1,},
    {id:5, name: "French book intermediate", price: 3000, img:"https://m.media-amazon.com/images/I/61C85PXsDqL._AC_UF1000,1000_QL80_.jpg", quantity: 1,},
    {id:6, name: "French book advanced", price: 3500, img:"https://m.media-amazon.com/images/I/61KoaZt55KL._AC_UF1000,1000_QL80_.jpg", quantity: 1,},
    {id:7, name: "Portuguese book starter", price: 1500, img:"https://m.media-amazon.com/images/I/61OGQfuwoCL._AC_UF1000,1000_QL80_.jpg", quantity: 1,},
    {id:8, name: "Portuguese book intermediate", price: 2500, img:"https://m.media-amazon.com/images/I/71+Twv3C3jL._AC_UF1000,1000_QL80_.jpg", quantity: 1,},
    {id:9, name: "Portuguese book advanced", price: 3000, img:"https://static.wixstatic.com/media/42698f_8f168ab4ba954609965fea8fc947657b~mv2.jpg/v1/fill/w_562,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Aquarela%20Advanced_COVER_2021.jpg", quantity: 1,},

];
// Carrito función
let shoppingCart = JSON.parse(localStorage.getItem("SaveItems")) || []

products.forEach((product) => {
    let content = document.createElement("div");
    content.className = "Card"
    content.innerHTML = `<img src="${product.img}"> 
    <h3 class="product-tag">${product.name}</h3>
    <p class="price-tag">${product.price} $</p>`;
    
    shopContent.append(content);
    let buy = document.createElement("button")
    buy.innerText = "Buy";
    content.append(buy)
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





/*let selection = prompt("Do you want to buy any product available? Yes or No?")
//Bucle inicial
while(selection != "Yes" && selection != "No"){
    alert("Please select Yes or No")
    selection = prompt("Yes or No?")
}
if(selection == "Yes"){
    alert("Products available")
    let listOfProducts = products.map((product) => product.name + "-" + "$" + product.price);
    alert(listOfProducts.join(" - "))
}
else if(selection == "No"){
    alert("Thanks for your visit")
}
//Bucle difiero de No
while(selection != "No"){
    let product = prompt("Select an item to add to your shopping cart")
    let price = 0
//Casos por producto con switch
    if (product == "English book starter" || product == "English book intermediate" || product == "English book advanced" ||
        product == "French book starter" || product == "French book intermediate" || product == "French book advanced" ||
        product == "Portuguese book starter" || product == "Portuguese book intermediate" || product == "Portuguese book advanced"){
            switch(product){
                case "English book starter":
                price = 2000;
                break;
                case "English book intermediate":
                price = 2500;
                break;
                case "English book advanced":
                price = 3000;
                break;
                case "French book starter":
                price = 2500;
                break;
                case "French book intermediate":
                price = 3000;
                break;
                case "French book advanced":
                price = 3500;
                break;
                case "Portuguese book starter":
                price = 1500;
                break;
                case "Portuguese book intermediate":
                price = 2500;
                break;
                case "Portuguese book advanced":
                price = 3000;
                break;
            }
//Cantidad
            let quantity = parseInt(prompt("How many items do you want to purchase?"))

            shoppingCart.push({product, quantity, price})
            console.log(shoppingCart)
        }
        else {
            alert("Product unavailable")
        }
        selection = prompt("Do you want to add any other product")
//Cierre de bucle     
       while(selection == "No"){
          alert("Thanks for your purchase")
            shoppingCart.forEach((shoppingCartTotal) =>{
                alert(`product: ${shoppingCartTotal.product}, quantity: ${shoppingCartTotal.quantity}, Total to pay ${shoppingCartTotal.quantity * shoppingCartTotal.price}`)
            })
            break;
        }
}
// Metodo reduce
const total = shoppingCart.reduce((acc, the) => acc + the.price * the.quantity, 0)
alert(`Total to pay: ${total}`)*/