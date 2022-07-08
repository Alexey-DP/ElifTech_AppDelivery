import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";

import './order.info.scss'

const OrderInfo = ({ onTotalOrder }) => {

    const { order } = useContext(Context);

    const orderItems = Object.values(order).map((item, index) => {
        if (item) {
            return (
                <Products item={item} key={index} onTotalOrder={onTotalOrder} />
            )
        }
    })

    let res = false;

    orderItems.forEach(item => {
        if (item) {
            res = true;
        }
    })

    const content = res ? orderItems : <NoProducts />;

    return (
        <div className="order__list">
            <ul className="order__grid">
                {content}
            </ul>
        </div>
    )
}

const NoProducts = () => {
    return (
        <p className='order__no-proucts'>Add Products</p>
    )
}

const Products = ({ item, onTotalOrder }) => {

    const [totalItemPrice, setTotalItemPrice] = useState(item.price);
    const { setOrder } = useContext(Context);

    useEffect(() => {
        onTotalOrder((order) => {
            return {
                ...order, [item.name]: {
                    name: item.name,
                    price: item.price,
                    count: 1
                }
            };
        })
    }, [])



    return (
        <li className="order__item">
            <div className="order__img">
                <img src={item.img} alt={item.name} />
            </div>
            <div className="order__count">
                <p>{item.name}</p>
                <p>Total sum: <span>{totalItemPrice}</span>$</p>
                <label htmlFor="sum"></label>
                <input
                    type="number"
                    min='1'
                    defaultValue={item.count}
                    onChange={(event) => {
                        setTotalItemPrice(event.target.value * item.price)
                        onTotalOrder((order) => {
                            return {
                                ...order, [item.name]: {
                                    name: item.name,
                                    price: event.target.value * item.price,
                                    count: event.target.value
                                }
                            };
                        })

                        if(event.target.value < 1) {
                            event.target.value = 1;
                        }
                    }} />
                <div
                    className="order__delete"
                    onClick={() => {
                        setOrder(order => {
                            return { ...order, [item.name]: null };
                        })

                        onTotalOrder((order) => {
                            return {
                                ...order, [item.name]: null
                            };
                        })
                    }}
                >Delete</div>
            </div>
        </li>
    )
}

export default OrderInfo;