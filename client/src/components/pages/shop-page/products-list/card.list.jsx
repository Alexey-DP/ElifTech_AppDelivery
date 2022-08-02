import ProductCard from './product.card';

const CardList = ({data}) => {

    const items = data.products.map((item) => {
        return (
            <ProductCard key={item.dish} card={item}/>
        )
    });

    return (
        <ul className="proucts__grid">
            {items}
        </ul>
    )
}

export default CardList;