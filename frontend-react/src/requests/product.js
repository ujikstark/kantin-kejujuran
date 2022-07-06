import { format } from "date-fns";
import axios from "../config/axios";
import ProductForm from "../ProductForm";

export async function getProducts () {


    const products = await axios.get('/api/products')
        .then(response => response.data)
        .catch(() => []);
    

    return products;

}

export async function addProduct(product) {
    
    
    const date = product.created_at ? format(product.date, 'yyyy-MM-dd hh:mm:ss a') : null;

    const payload = {
        name: product.name,
        description: product.description,
        created_at: date,
        image: product.imageUrl,
        price: product.price
    };
    console.log(payload);
    const newProducts = await axios.post('/api/products', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => null);
    
    return newProducts;
}

export async function deleteProduct(product, auth) {

    if (auth === null) {
        return null;
    }

    const isDeleted = await axios.delete('/api/product/' + product.id)
        .then(() => true)
        .catch(() => false);

   return isDeleted;
}



