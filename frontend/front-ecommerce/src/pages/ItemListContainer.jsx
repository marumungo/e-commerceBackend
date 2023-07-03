import { useEffect, useState } from "react"
import ItemList from "../components/ItemList/ItemList"

const ItemListContainer = () => {
    const [ products, setProducts ] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8080/api/products')
        .then(resp => resp.json())
        .then(resp => setProducts(resp.payload))
        .catch(error => console.log(error))
    }, []);
    console.log(products);
    
    return (
        <>
            <ItemList products={products} />
        </>
    );
};

export default ItemListContainer;
