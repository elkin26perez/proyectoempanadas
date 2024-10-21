
const containerAllProducts = document.querySelector("#all-products")

document.addEventListener("DOMContentLoaded", getAllProducts)

async function getAllProducts(event) {
    const request = await fetch("http://localhost:5000/api/Products",{
        method: "GET"
    })
    if(request.status == 200){
        const data = await request.json()
        data.forEach(element => {
            
            const link = document.createElement("a")
            link.href = `http://localhost:4321/products?id=${element.id}`
            link.classList.add("a-product")
            
            const article = document.createElement("article");
            article.classList.add("product");
            link.append(article)
            const name = document.createElement("h2");
            name.textContent = element.name;
    
            const price = document.createElement("p");
            price.classList.add("price")
            price.textContent = `$ ${element.price}`
    
            const stock = document.createElement("p");
            stock.textContent = element.stock;
    
            const description = document.createElement("p");
            description.textContent = element.description

            const image = document.createElement("img")
            if(!element.image){
                image.src = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=1024x1024&w=is&k=20&c=0dTNcBhFTZ_X9864ZYd15gVmo2reegox8yRAXEFxZ-A="
            }else{
                image.src = element.image
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
            containerAllProducts.appendChild(link)
        });
    }
}



