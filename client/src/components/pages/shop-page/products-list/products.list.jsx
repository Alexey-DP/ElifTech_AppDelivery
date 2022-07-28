import { useState, useEffect } from 'react';
import CardList from './card.list';
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

    const skeleton = productsList || loading || error ? null : <FirstMessage />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !productsList) ? <CardList productsList={productsList}/> : null;
    return (
        <div className="proucts__list">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const FirstMessage = () => {
    return (
        <p className='proucts__first'>Take the company</p>
    )
}


export default ProductsList;