import { useEffect, useState } from "react"
import ItemList from "../components/ItemList/ItemList"
import { winstonLogger } from "../../../../src/config/loggers";

const ItemListContainer = () => {
    const [ products, setProducts ] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8080/api/products')
        .then(resp => resp.json())
        .then(resp => setProducts(resp.payload))
        .catch(error =>  winstonLogger.error(error))
    }, []);
    winstonLogger.info(products);
    
    return (
        <>
            <ItemList products={products} />
        </>
    );
};

export default ItemListContainer;
