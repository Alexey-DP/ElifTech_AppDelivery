import { useState, useEffect, useContext, Children } from 'react';
import { Context } from '../../context';
import Spinner from '../../../spinner/spinner';
import ErrorMessage from '../../../error-message/error.message';
import DeliveryService from '../../../../services/delivery.service';

import './products.list.scss'

const ProductsList = (props) => {

    const [productsList, setProductsList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const deliveryService = new DeliveryService();

    useEffect(() => {
        updateProductList();
    }, [props.companyId])

    const updateProductList = () => {
        const { companyId } = props;
        if (!companyId) {
            return
        }
        onProductsListLoading();
        deliveryService.getCompanyById(companyId)
            .then(onProductsListLoaded)
            .catch(onError);
    }


    const onProductsListLoaded = (productsList) => {
        setProductsList(productsList);
        setLoading(false);
    }

    const onProductsListLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const skeleton = productsList || loading || error ? null : <First />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !productsList) ? <View productsList={productsList} addProduct={props.addProduct}/> : null;
    return (
        <div className="proucts__list">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({productsList, addProduct}) => {
    const {order, setOrder} = useContext(Context);
    const items = productsList.products.map((item, index) => {
        return (
            <li className="proucts__item"
                key={index}>
                <div className="proucts__img">
                    <img src={item.img} alt={item.dish} />
                </div>
                <h5 className="proucts__name">{item.dish}</h5>
                <p className="proucts__price">{item.price}$</p>
                <div><button
                    className="proucts__btn"
                    onClick={(e) => {
                        setOrder(() => {
                            if(!order[item.dish]) {
                                return {...order, [item.dish]: {
                                    name: item.dish,
                                    price: item.price,
                                    img: item.img,
                                    count: 1
                                }}
                            } else {
                                return order;
                            }
                        })
                        const thisElem = e.target;
                        thisElem.innerHTML = 'Added';
                        thisElem.classList.add('proucts__added');
                        setTimeout(() => {
                            thisElem.innerHTML = 'Add to Cart';
                            thisElem.classList.remove('proucts__added');
                        }, 1000)
                    }}
                >Add to Cart</button></div>
            </li>
        )
    });

    return (
        <ul className="proucts__grid">
            {items}
        </ul>
    )
}

const First = () => {
    return (
        <p className='proucts__first'>Take the company</p>
    )
}


export default ProductsList;