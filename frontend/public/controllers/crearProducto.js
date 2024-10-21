const formCrearProduct = document.querySelector("#crearproducto")
formCrearProduct.addEventListener("submit", crearProducto)


async function crearProducto(event) {
    event.preventDefault()
    const dataFromForm = Object.fromEntries(new FormData(event.target))
    const request = await fetch("http://localhost:5000/api/Products",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(dataFromForm)
    })
    if(request.status == 200){
        alert("Producto creado correctamente")
        setTimeout(()=>{
            location.reload()
        },1000)
        return
    }
    alert("Intenta más tarde")
}