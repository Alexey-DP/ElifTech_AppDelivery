import { useState, useEffect } from 'react';
import CardList from './card.list';
import useDeliveryService from '../../../../services/delivery.service';
import setContent from '../../../../utils/setContent';

import './products.list.scss'

const ProductsList = ({companyId}) => {

    const [productsList, setProductsList] = useState(null);

    const { operation, getCompanyById, } = useDeliveryService();

    useEffect(() => {
        updateProductList();
    // eslint-disable-next-line
    }, [companyId])

    const updateProductList = () => {
        if (!companyId) {
            return
        }
        getCompanyById(companyId)
            .then(onProductsListLoaded);
    }

    const onProductsListLoaded = (productsList) => {
        setProductsList(productsList);
    }

    return (
        <div className="proucts__list">
            {setContent(operation, FirstMessage, CardList, productsList)}
        </div>
    )
}

const FirstMessage = () => {
    return (
        <p className='proucts__first'>Take the company</p>
    )
}

export default ProductsList;