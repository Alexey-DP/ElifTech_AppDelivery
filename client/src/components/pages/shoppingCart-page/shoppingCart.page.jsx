import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState, useContext, useEffect } from "react";
import { Context } from '../context';
import { Helmet } from 'react-helmet';
import UserInfo from './user-info/user.info';
import useDeliveryService from '../../../services/delivery.service';
import OrderInfo from './order-info/order.info';
import ErrorBoundary from '../../error-boundary/error-boundary';

import './shoppingCart.page.scss';

const ShoppingCartPage = () => {

    const [totalOrder, setTotalOrder] = useState({});
    const [totalSum, setTotalSum] = useState(0);
    const [address, setAddress] = useState('Take your address');

    const [orderStatus, setOrderStatus] = useState('waiting');

    const { sendOrder } = useDeliveryService();

    const { setOrder } = useContext(Context);

    const updateAddress = (address) => {
        setAddress(address);
    }

    let fullSum = 0;
    Object.values(totalOrder).forEach(item => {
        if (item) {
            fullSum += +item.price;
        }
    })

    useEffect(() => {
        setTotalSum(fullSum);
    }, [fullSum])

    const goSendOrder = (values, onSubmitProps) => {
        setOrderStatus('waiting')
        const now = new Date();
        const order = {
            ...values,
            address,
            order: totalOrder,
            totalPrice: totalSum,
            date: now
        }

        if (Object.values(totalOrder).every(el => el === null)) {
            setOrderStatus('noGoods')
            return;
        }

        sendOrder(order)
            .then(res => {
                setOrder({});
                setTotalSum(0);
                setOrderStatus('success');
                setTotalOrder({});
                onSubmitProps.setSubmitting(false);
                onSubmitProps.resetForm();

            })
            .catch(() => {
                setOrderStatus('error')
            })
            .finally(() => {
                setTimeout(() => {
                    setOrderStatus('waiting')
                }, 5000)
            })
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Shopping cart of delivery food" />
                <title>Shopping cart</title>
            </Helmet>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    number: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, 'Must be at least 3 letters')
                        .required('Enter your name'),
                    email: Yup.string()
                        .email('Wrong email')
                        .required('Enter your email'),
                    number: Yup.string()
                        .required('Required field'),
                })}
                onSubmit={(values, onSubmitProps) => goSendOrder(values, onSubmitProps)}>
                <Form id='sendorder' className="shopping__card">
                    <div className="shopping__info">
                        <ErrorBoundary>
                            <UserInfo address={address} setAddress={updateAddress} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <OrderInfo onTotalOrder={setTotalOrder} />
                        </ErrorBoundary>
                    </div>
                    {orderStatus === 'noGoods' ? <div className="shopping__error">Сhoose tasty food</div> : null}
                    {orderStatus === 'success' ? <div className="shopping__success">Your order has been sent, you will be contacted soon</div> : null}
                    {orderStatus === 'error' ? <div className="shopping__error">Something went wrong, try again</div> : null}
                    <div className="shopping__send">
                        <p>Total price: <span>{totalSum}</span>$</p>
                        <button
                            disabled={orderStatus === 'success' || orderStatus === 'error' ? true : false}
                            type="submit"
                            form='sendorder'>
                            Send Order
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
};

export default ShoppingCartPage;