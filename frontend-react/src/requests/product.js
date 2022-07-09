import { format } from "date-fns";
import axios from "../config/axios";
import ProductForm from "../ProductForm";

export async function getProducts () {


    const products = await axios.get('/api/products')
        .then(response => response.data)
        .catch(() => []);
    
    return products;

}

export async function addProduct(products, product, auth, updateAuth) {
    

    const payload = {
        name: product.name,
        description: product.description,
        image: product.imageUrl,
        price: product.price
    };
    const newProduct = await axios.post('/api/products', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => null);

    let newP = products;
    
    newP = [...newP, newProduct];
    return newP;


}

export async function deleteProduct(product, products, auth, updateAuth) {
    const newProducts = products.filter((td) => td.id !== product.id);

    if (auth === null) {
        return products;
    }

    const isDeleted = await axios.delete('/api/product/' + product.id)
        .then(() => true)
        .catch(() => false);

    return isDeleted ? newProducts : products;
}


