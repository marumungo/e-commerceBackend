import Item from "../Item/Item";

const ItemList = ({products}) => {
    return (
        <div>
            {products.map(product => <Item key={product._id} product={product} />)}
        </div>
    );
};

export default ItemList;