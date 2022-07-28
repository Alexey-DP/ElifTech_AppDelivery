import { useContext} from "react";
import Products from "./order.card";
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



export default OrderInfo;