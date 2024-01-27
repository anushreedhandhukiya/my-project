let url = window.location.href.split("/");
let id = url[url.length - 1];

const addmycart = (id) => {
    console.log(id);
    fetch(`/cart/mycart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id })
    })
}

document.getElementById("btn").addEventListener("click", () => {
    window.location.href = `/cart/mycart`
    addmycart(id)
    alert("Product added Successfully")
})