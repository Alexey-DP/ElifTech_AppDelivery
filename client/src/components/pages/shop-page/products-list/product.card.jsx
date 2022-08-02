import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';

const ProductCard = ({card}) => {

    const {order, setOrder} = useContext(Context);
    const [isInOrder, setIsInOrder] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        order[card.dish] ? setIsInOrder(true) : setIsInOrder(false);
    })

    const goToClik = (item) => {
        setOrder(() => {
            if(!order[item.dish]) {
                return {...order, [item.dish]: {
                    name: item.dish,
                    price: item.price,
                    img: item.img2,
                    count: 1
                }}
            } else {
                return order;
            }
        })
    }

    return (
        <li className="proucts__item">
                <div className="proucts__img">
                    <img src={card.img2} alt={card.dish} />
                </div>
                <h5 className="proucts__name">{card.dish}</h5>
                <p className="proucts__price">{card.price}$</p>
                <div><button
                disabled={isInOrder}
                    className={isInOrder ? 'proucts__added' : 'proucts__btn'}
                    onClick={() => {
                        goToClik(card);
                    }}
                >{ isInOrder ? 'Added' : 'Add to Cart'}</button></div>
            </li>
    )
}

export default ProductCard;