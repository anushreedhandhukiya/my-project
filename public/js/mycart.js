const updateQty = (id, qty) => {
    fetch(`/cart/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty })
    })
        .then((res) => res.json())
        .then((response) => get())
        .catch((err) => console.log(err))
}

const deleted = (id) => {
    fetch(`/cart/delete/${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .then((response) => get())
        .catch((err) => console.log(err))
}

const handlePayment = async (amount) => {
    let res = await fetch("/cart/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount })
    })
    let order = await res.json()
    let option = { key: "rzp_test_aseYwd9Lw0lp7m", amount: order.amount }
    let razorpay = new Razorpay(option)
    razorpay.open()
}

const display = (data) => {
    let totalPrice = 0
    document.getElementById("box").innerHTML = ""
    data.map((element) => {
        let ele = element.productId
        totalPrice += ele.price * element.qty

        let img = document.createElement("img")
        img.src = ele.img
        img.style.width = "180px"
        img.style.height = "220px"
        let title = document.createElement("h3")
        title.innerHTML = ele.title
        let price = document.createElement("h2")
        price.innerHTML = `₹${ele.price}.00`

        let btn1 = document.createElement("button")
        btn1.innerHTML = "-"
        btn1.addEventListener("click", () => { updateQty(element._id, -1) })
        let qty = document.createElement("span")
        qty.innerHTML = element.qty
        let btn2 = document.createElement("button")
        btn2.innerHTML = "+"
        btn2.addEventListener("click", () => { updateQty(element._id, +1) })

        let btn3 = document.createElement("button")
        btn3.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        btn3.setAttribute("class", "icon")
        btn3.addEventListener("click", () => { deleted(element._id) })

        let div = document.createElement("div")
        div.append(img)
        document.getElementById("box").append(div)

        let div2 = document.createElement("div")
        div2.append(title, price)
        document.getElementById("box").append(div2)

        let div3 = document.createElement("div")
        div3.append(btn1, qty, btn2)
        document.getElementById("box").append(div3)

        let div4 = document.createElement("div")
        div4.append(btn3)
        document.getElementById("box").append(div4)

        let div5 = document.createElement("div")
        div5.setAttribute("class", "maindiv")
        div5.append(div, div2, div3, div4)

        document.getElementById("box").append(div5)
    })
    // let subTotal = document.createElement("h2")
    // subTotal.innerHTML = `Sub Total: ${totalPrice}`
    let priceBtn = document.createElement("button")
    priceBtn.innerHTML = `Total Price: ${totalPrice}`
    document.getElementById("box2").append(priceBtn)
    priceBtn.addEventListener("click", () => handlePayment(totalPrice))
    // subTotal.addEventListener("click", () => handlePayment(totalPrice))
}

function get() {
    fetch("/cart/cartdata")
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error));
}
get()
