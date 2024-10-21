const formEditarProduct = document.querySelector("#form-editar-product")
const containerDetailProduct = document.querySelector("#container-product")
const idProduct = new URLSearchParams(window.location.search).get("id")

document.addEventListener("DOMContentLoaded", getDetailProduct)
formEditarProduct.addEventListener("submit", editarProducto)

async function getDetailProduct(event) {
    const request = await fetch("http://localhost:5000/api/Products/" + idProduct, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if(request.status == 200){
        const data = await request.json()
        document.getElementById('name').value = data.name;
        document.getElementById('price').value = data.price;
        document.getElementById('stock').value = data.stock;
        document.getElementById('description').value = data.description;
        document.getElementById('image').value = data.image;
        document.getElementById('category').value = data.category;
        
        const article = document.createElement("article");
        article.classList.add("product");

        const name = document.createElement("h2");
        name.textContent = data.name;

        const price = document.createElement("p");
        price.classList.add("price")
        price.textContent = `price:  $${data.price}`

        const stock = document.createElement("p");
        stock.textContent = `stock: ${data.stock}`;

        const buttonDelete = document.createElement("button")
        buttonDelete.classList.add("delete-btn")
        buttonDelete.textContent = "Eliminar"
        buttonDelete.id = "delete-btn"

        const description = document.createElement("p");
        description.textContent = `Descripción: ${data.description}`
        const image = document.createElement("img")
        if(!data.image){
            image.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }else{
            image.src = data.image
        }
        const containerImage = document.createElement("div")
        const containerInfo = document.createElement("picture")
        containerImage.append(image)
        containerInfo.appendChild(name);
        containerInfo.appendChild(price);
        containerInfo.appendChild(stock);
        containerInfo.appendChild(description);
        article.appendChild(containerImage)
        article.appendChild(containerInfo)
        containerDetailProduct.appendChild(article)
        containerDetailProduct.appendChild(buttonDelete)
        buttonDelete.addEventListener("click", eliminarProducto)
    }
}

async function editarProducto(event) {
    event.preventDefault()
    const dataFromForm = Object.fromEntries(new FormData(event.target))

            const request = await fetch("http://localhost:5000/api/Products/" + idProduct, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dataFromForm)
            })
            if(request.status == 200){
                alert("Producto editado")
                setTimeout(()=>{
                    location.reload()
                },1500)
            }
}

async function eliminarProducto(event) {
    const request = await fetch("http://localhost:5000/api/Products/" + idProduct, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
    })
    if(request.status == 200){
        alert("El producto fue eliminado, vamos a enviarte al inicio")
        setTimeout(()=>{
            location.href = "/"
        },500)
        return
    }
    alert("Algo salió mal intenta más tarde")
}
