import UserInfo from './user-info/user.info';
import DeliveryService from '../../../services/delivery.service';
import OrderInfo from './order-info/order.info';
import { useState, useContext, useEffect } from "react";
import { Context } from '../context';

import './shoppingCart.page.scss';

const ShoppingCartPage = () => {

    const [totalOrder, setTotalOrder] = useState({});
    const [userName, setUserName] = useState('Not specified');
    const [userNumber, setUserNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('Not specified');
    const [totalSum, setTotalSum] = useState(0);

    const deliveryService = new DeliveryService();

    const { setOrder } = useContext(Context);

    let fullSum = 0;
    Object.values(totalOrder).forEach(item => {
        if(item) {
            fullSum += +item.price;
        }
    })

    useEffect(() => {
        setTotalSum(fullSum);
    }, [totalOrder])

    const order = {
        name: userName,
        email: userEmail,
        number: userNumber,
        address: userAddress,
        order: totalOrder,
        totalPrice: totalSum,
        date: Date.now()
    }

    return (
        <form className="shopping__card">
            <div className="shopping__info">
                <UserInfo  setUserName={setUserName} setUserNumber={setUserNumber} setUserEmail={setUserEmail} setUserAddress={setUserAddress}/>
                <OrderInfo onTotalOrder={setTotalOrder} />
            </div>
            <div className="shopping__send">
                <p>Total price: <span>{totalSum}</span>$</p>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    let res = false;
                    for(let i = 0; i < Object.values(order.order).length; i++) {
                        if(Object.values(order.order)[i]) {
                            res = true;
                            break;
                        }
                    }
                    if(order.email && order.number && res) {
                        deliveryService.sendOrder(order)
                        .then(res => {
                            setOrder({});
                            setUserNumber('');
                            setUserEmail('');
                            setTotalSum(0);
                            e.target.innerHTML = 'Order sent';
                            e.target.style.background = 'rgb(34, 247, 19)';
                            e.target.parentElement.parentElement.reset();

                        })
                        .catch(() => {
                            e.target.innerHTML = 'Try again';
                            e.target.style.background = 'rgb(234, 47, 47)';
                        })
                        .finally(() => {
                            setTimeout(() => {
                                e.target.innerHTML = 'Send Order';
                                e.target.style.background = '';
                            }, 2500);
                        })
                    } else {
                        e.target.innerHTML = 'Enter your email, phone and choose a product';
                        e.target.style.background = 'rgb(234, 47, 47)';
                        setTimeout(() => {
                            e.target.innerHTML = 'Send Order';
                            e.target.style.background = '';
                        }, 3000)
                    }
                }}
                >Send Order</button>
            </div>
        </form>
    )
};

export default ShoppingCartPage;