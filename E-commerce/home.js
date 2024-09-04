var popup = document.querySelector(".popup");
var closepopup = document.querySelector(".close");
var productadd = document.querySelector(".productadd");
var mainempty = document.querySelector(".empty");
var totamt = document.getElementById("totalamt");

function openPopup() {
    popup.classList.add("show")
}

closepopup.addEventListener("click", function () {
    popup.classList.remove("show")
})

var products = [
    { img: "/images/bag.jpeg", names: "Bag", price: "60", id: 1 , value : 60},
    { img: "/images/cap.jpg", names: "Cap", price: "30", id: 2 , value : 30},
    { img: "/images/earpods.jpg", names: "Earpods", price: "25", id: 3 , value : 25},
    { img: "/images/eye_glass.jpeg", names: "Eye Glass", price: "20", id: 4 , value : 20},
    { img: "/images/hoodies.jpg", names: "Hoodies", price: "40", id: 5 , value : 40},
    { img: "/images/shirts.jpeg", names: "Shirt", price: "50", id: 6 , value : 50}
]

products.forEach((val) => {
    mainempty.innerHTML += `
    <div class="list">
        <img src="${val.img}">
        <h2>${val.names}</h2>
            <div class="name">
                <p>$${val.price}</p>
                <button onclick="adding(${val.id})">+</button>
            </div>
    </div>`
});

function adding(id) {
    var x = localStorage.getItem("storage");
    var storage;

    if (x == null) {
        storage = []
    }
    else {
        storage = JSON.parse(x)
    }

    var correct = products.find(task => task.id == id);
    var already = storage.find(task1 => task1.id == id);
    if (already) {
        alert("Product already added to the cart")
    }
    else if (correct) {
        storage.push({
            img: correct.img,
            names: correct.names,
            price: correct.price,
            id: correct.id,
            value: correct.value,
            inputval: 1
        })
    }

    localStorage.setItem("storage", JSON.stringify(storage));
    setup();
}

function setup() {

    var local1 = JSON.parse(localStorage.getItem("storage")) || [];
    productadd.innerHTML = ""

    local1.forEach((clone) => {
        productadd.innerHTML += `
        <div class="list1">
            <img src="${clone.img}">
            <div class="pname">
                <h2>${clone.names}</h2>
                <div class="name1">
                    <p>$${clone.price}</p>
                    <button onclick="removing(${clone.id})">Remove</button>
                </div>
                <input type="number" value="${clone.inputval}" id="itemnumber${clone.id}" onchange="updateItemQuantity(${clone.id}, this.value)">
            </div>
        </div>
        `
    });
    updatetot();
}

function updateItemQuantity(id, value) {
    var local1 = JSON.parse(localStorage.getItem("storage")) || [];
    var item = local1.find(task => task.id == id);
    if (item) {
        item.inputval = parseInt(value);
    }
    localStorage.setItem("storage", JSON.stringify(local1));
    updatetot();
}

function updatetot() {
    var local1 = JSON.parse(localStorage.getItem("storage")) || [];
    var totalAmount = 0;

    local1.forEach((item) => {
        totalAmount += item.inputval * item.price;
    });

    totamt.textContent = `${totalAmount}`;
}

function removing(id){
    var local1 = JSON.parse(localStorage.getItem("storage")) || [];
    for(var i =0; i<local1.length; i++){
        if(local1[i].id == id){
            local1.splice(i,1);
        }
    }
    localStorage.setItem("storage", JSON.stringify(local1));
    setup();
}

function buying(){
    var local1 = JSON.parse(localStorage.getItem("storage")) || [];

    if(productadd.innerHTML == ""){
        alert("There is no item in your cart")
    }
    else{
        alert("Order placed successfully")
        local1.splice(0,local1.length);
        localStorage.setItem("storage", JSON.stringify(local1));
        setup();
    }
}

window.onload = setup;
