import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";

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
    // eslint-disable-next-line
    }, []);

    const changeTotalOrder = (elem) => {
        onTotalOrder((order) => {
            return {
                ...order, [item.name]: {
                    name: item.name,
                    price: +elem.value * item.price,
                    count: +elem.value
                }
            };
        })
    }

    return (
        <li className="order__item">
            <div className="order__img">
                <img src={item.img} alt={item.name} />
            </div>
            <div className="order__count">
                <p>{item.name}</p>
                <p>Total sum: <span>{totalItemPrice}</span>$</p>
                <label htmlFor="sum"></label>
                <div className="order__amount-block">
                    <input
                        type="text"
                        defaultValue={item.count}
                        onChange={(event) => {
                            event.target.value = event.target.value.replace(/\D/gi, '');

                            if (event.target.value <= 0 && event.target.value !== '') {
                                event.target.value = 0;
                            }
                            setTotalItemPrice(event.target.value * item.price)
                            changeTotalOrder(event.target);

                        }}/>
                        <div className="order__amount" onClick={(e) => {
                            const elem = e.target.previousElementSibling;
                            elem.value =  +elem.value + 1;
                            setTotalItemPrice(+elem.value * item.price);
                            changeTotalOrder(elem);

                        }}>+</div>
                        <div className="order__amount" onClick={(e) => {
                            const elem = e.target.previousElementSibling.previousElementSibling;
                            if(elem.value >= 2) {
                                elem.value =  +elem.value - 1;
                                setTotalItemPrice(+elem.value * item.price);
                                changeTotalOrder(elem);
                            }
                        }}>-</div>
                </div>
                <div
                    className="order__delete"
                    onClick={() => {
                        setOrder(order => {
                            delete order[item.name];
                            return { ...order };
                        })

                        onTotalOrder((order) => {
                            delete order[item.name];
                            return { ...order };
                        })
                    }}
                >Delete</div>
            </div>
        </li>
    )
}

export default Products;