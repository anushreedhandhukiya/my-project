const addmycart = (id) => {
    console.log(id);
    fetch(`/cart/mycart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id })
    })
}

const display = (data) => {
    document.getElementById("carts").innerHTML = ""
    data.map((ele) => {
        let img = document.createElement("img")
        img.src = ele.img
        img.style.width = "315px"
        img.style.height = "400px"
        let title = document.createElement("h3")
        title.innerHTML = ele.title
        let price = document.createElement("h2")
        price.innerHTML = `₹${ele.price}.00`

        let btn = document.createElement("button")
        btn.innerHTML = "Add to Cart"
        btn.addEventListener("click", () => {
            addmycart(ele._id)
            alert("Product added successfully")
        })

        let div = document.createElement("div")
        div.append(img, title, price, btn)
        document.getElementById("carts").append(div)
    })
}

const allproducts = (alldata) => {
    fetch(`/cart/allproduct?id=${alldata}`)
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error))
}

const filterdata = (uifilter) => {
    fetch(`/cart/filter?category=${uifilter}`)
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error))
}

document.getElementById("all").addEventListener("click", () => allproducts("all"))
document.getElementById("bags").addEventListener("click", () => filterdata("bags"))
document.getElementById("goods").addEventListener("click", () => filterdata("goods"))
document.getElementById("minigoods").addEventListener("click", () => filterdata("minigoods"))
document.getElementById("phone").addEventListener("click", () => filterdata("phone"))

const pricefilter = (sortprice) => {
    fetch(`/cart/sort?sort=${sortprice}`)
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error))
}

document.getElementById("lth").addEventListener("click", () => pricefilter("lth"))
document.getElementById("htl").addEventListener("click", () => pricefilter("htl"))


fetch("/cart/create")
    .then((response) => response.json())
    .then((response) => display(response))
    .catch((error) => console.log(error));
