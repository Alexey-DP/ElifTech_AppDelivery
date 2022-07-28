import UserInfo from './user-info/user.info';
import DeliveryService from '../../../services/delivery.service';
import OrderInfo from './order-info/order.info';
import { useState, useContext, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Context } from '../context';

import './shoppingCart.page.scss';

const ShoppingCartPage = () => {

    const [totalOrder, setTotalOrder] = useState({});
    const [totalSum, setTotalSum] = useState(0);
    const [hasOrder, setHasOrder] = useState(false);

    const [sendForn, setSendForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const deliveryService = new DeliveryService();

    const { setOrder } = useContext(Context);

    let fullSum = 0;
    Object.values(totalOrder).forEach(item => {
        if (item) {
            fullSum += +item.price;
        }
    })

    useEffect(() => {
        setTotalSum(fullSum);
    }, [totalOrder])

    const sendOrder = (values, onSubmitProps) => {
        setHasOrder(false);
        const now = new Date();
        const order = {
            ...values,
            order: totalOrder,
            totalPrice: totalSum,
            date: now
        }

        if (Object.values(totalOrder).every(el => el === null)) {
            setHasOrder(true);
            return;
        }

        deliveryService.sendOrder(order)
            .then(res => {
                setOrder({});
                setTotalSum(0);
                setSendForm(true);
                setTotalOrder({});
                onSubmitProps.setSubmitting(false);
                onSubmitProps.resetForm();

            })
            .catch(() => {
                setErrorForm(true);
            })
            .finally(() => {
                setTimeout(() => {
                    setHasOrder(false);
                    setSendForm(false);
                    setErrorForm(false);
                }, 5000)
            })
    }


    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                number: '',
                address: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(3, 'Must be at least 3 letters')
                    .required('Enter your name'),
                email: Yup.string()
                    .email('Wrong email')
                    .required('Enter your email'),
                number: Yup.string()
                    .min(9, 'Must be at least 10 digits')
                    .required('Required field'),
                address: Yup.string()
            })}
            onSubmit={(values, onSubmitProps) => sendOrder(values, onSubmitProps)}>
            <Form id='sendorder' className="shopping__card">
                <div className="shopping__info">
                    <UserInfo />
                    <OrderInfo onTotalOrder={setTotalOrder} />
                </div>
                {hasOrder ? <div className="shopping__error">Сhoose tasty food</div> : null}
                {sendForn ? <div className="shopping__success">Your order has been sent, you will be contacted soon</div> : null}
                {errorForm ? <div className="shopping__error">Something went wrong, try again</div> : null}
                <div className="shopping__send">
                    <p>Total price: <span>{totalSum}</span>$</p>
                    <button
                        disabled={sendForn || errorForm ? true : false}
                        type="submit"
                        form='sendorder'>
                        Send Order
                    </button>
                </div>
            </Form>
        </Formik>

    )
};

export default ShoppingCartPage;