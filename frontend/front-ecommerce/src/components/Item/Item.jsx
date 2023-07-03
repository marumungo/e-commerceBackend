const Item = ({product}) => {
    return (
        <div className="card w-25">
            <div className="card-header">
                <p>{product.title}</p>
            </div>
            <div className="card-body">
                {/* <img className="w-100" src={product.imageUrl}  /> */}
                <p>Descripción: {product.description}</p>
                <p>Categoría: {product.category}</p>
                <p>Stock: {product.stock}</p>
                <p>Precio: {product.price}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-outline-primary w-100">Detalle</button>
            </div>
        </div>
    );
};

export default Item;