
const display = (data) => {
    document.getElementById("box").innerHTML = ""
    data.map((ele) => {
        // let ele = element.productId
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

        let div = document.createElement("div")
        div.append(img, title, price, btn)
        document.getElementById("box").append(div)
    })
}

fetch("/cart/cartdata")
    .then((response) => response.json())
    .then((response) => display(response))
    .catch((error) => console.log(error));
