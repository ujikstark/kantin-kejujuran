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
    
    
    const date = product.created_at ? format(product.date, 'yyyy-MM-dd hh:mm:ss a') : null;

    const payload = {
        name: product.name,
        description: product.description,
        created_at: date,
        image: product.imageUrl,
        price: product.price
    };
    const newProducts = await axios.post('/api/products', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => null);
    console.log(products);
    let newP = products;
    newP = [...newP, product];
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


