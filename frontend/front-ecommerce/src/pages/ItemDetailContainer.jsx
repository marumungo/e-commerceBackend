import { useEffect, useState } from "react";
import { winstonLogger } from "../../../../src/config/loggers";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});

    useEffect(()=>{
        // fetch(`http://localhost:8080/api/products/${product._id}`) 
        fetch(`http://localhost:8080/api/products/64601897ced89f02b8035fdb`) 
        .then(resp => resp.json())
        // .then(resp => setProduct(resp.payload[0]));
        .then(resp => setProduct(resp.payload));

    }, []);
    winstonLogger.info(product);

    return (
        <div className="w-25">
            <p>Nombre: {product.title}</p>
        </div>
    );
};

export default ItemDetailContainer;
