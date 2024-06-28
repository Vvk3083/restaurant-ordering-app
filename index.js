import { menuArray } from "./data.js";
let toDisplay = document.getElementById("to-display");
const storeMenu = document.getElementById("store-menu");
let final = document.getElementById("final-amount");
let menuListArray = [];
function renderMenu() {
  let todisplay = "";
  for (let dish of menuArray) {
    menuListArray.push({
      id: dish.id,
      name: dish.name,
      basePrice: dish.price,
      qty: 0,
    });
    todisplay += `
            <div class="desc">
                <h1>${dish.emoji}</h1>
                <div class="detail">
                    <p>${dish.name}</p>
                    <p>${[...dish.ingredients]}</p>
                    <p>$${dish.price}</p>
                </div>
                <button class="plus ${dish.id}" data-id="${dish.id}">+</button>
            </div>
            <hr>
        `;
  }
  return todisplay;
}
storeMenu.innerHTML = renderMenu();
document.addEventListener("click", function (e) {
    if(e.target.id === "final-order"){
        // document.getElementById("form").classList.remove("toggle2");
        document.getElementById("form").classList.add("toggle2");
    }
    else if(e.target.dataset.id){
        console.log(e.target.id)
        let number = Number(e.target.dataset.id);
        renderToBuy(number);
    }
});
function renderToBuy(number) {
  let menuInnerHTML = "";
  let finalAmount = 0;
  menuListArray[number].qty++;
  for (let list of menuListArray) {
    if (list.qty == 0) {
      continue;
    }
    const totalPrice = list.basePrice * list.qty;
    finalAmount += totalPrice;
    menuInnerHTML += `
        <div class="ordered-items">
            <p>${list.name}</p>
            <button>remove</button> 
            <p>$${totalPrice}</p>
        </div>
        <hr>
        `;
  }
  toDisplay.innerHTML = menuInnerHTML;
  let stringfinal = `
    <div class="inner-total">
        <p class="give-me-margin">Total price:</p>
        <p>$${finalAmount}</p> 
    </div>
    <button type="submit" class="final-order" id="final-order">Complete order</button>
    `;
  final.innerHTML = stringfinal;
  console.log(final.innerHTML);
}
const form = document.getElementById("form")
form.addEventListener("submit",function(e){
    e.preventDefault()
    const formData = new FormData(form)
    form.classList.toggle("hidden")
    document.getElementById("gratitude").innerHTML= `<p>Thanks ${formData.get("name")} your order is on the way</p>`
    document.getElementById("gratitude").classList.add("toggle")
    document.getElementById("gratitude").classList.remove("gratitude")
})

