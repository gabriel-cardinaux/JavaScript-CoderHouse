//alert("Probando")


// Carrito de compras
// Arrays con lista de productos

const shopContent = document.getElementById("shopContent");

const products = [
    {id:1, name: "English book starter", price: 2000, img;,},
    {id:2, name: "English book intermediate", price: 2500, img:,},
    {id:3, name: "English book advanced", price: 3000, img:,},
    {id:4, name: "French book starter", price: 2500, img:,},
    {id:5, name: "French book intermediate", price: 3000, img:,},
    {id:6, name: "French book advanced", price: 3500, img:,},
    {id:7, name: "Portuguese book starter", price: 1500, img:,},
    {id:8, name: "Portuguese book intermediate", price: 2500, img:,},
    {id:9, name: "Portuguese book advanced", price: 3000, img:,},

];
// Carrito función
let shoppingCart = []

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
});
let selection = prompt("Do you want to buy any product available? Yes or No?")
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
alert(`Total to pay: ${total}`)