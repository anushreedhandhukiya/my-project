const display = (data) => {
    document.getElementById("carts").innerHTML = ""
    data.map((ele) => {
        let img = document.createElement("img")
        img.src = ele.img
        let title = document.createElement("h3")
        title.innerHTML = ele.title
        let price = document.createElement("h2")
        price.innerHTML = `$${ele.price}.00`

        let btn = document.createElement("button")
        btn.innerHTML = "Quick View"
        btn.addEventListener("click", () => {
            window.location.href = "/cart/cartdetails"
        })

        let div = document.createElement("div")
        div.append(img, title, price, btn)
        document.getElementById("carts").append(div)
    })
}

const filterdata = (uifilter) => {
    fetch(`/cart/filter?category=${uifilter}`)
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error))
}

document.getElementById("all").addEventListener("click", () => filterdata("bags", "goods", "minigoods", "phone"))
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
