import { useState, useEffect, useContext } from 'react';
import CardList from './card.list';
import useDeliveryService from '../../../../services/delivery.service';
import setContent from '../../../../utils/setContent';
import {ShopListContext} from '../../context';

import './products.list.scss'

const ProductsList = () => {

    const [productsList, setProductsList] = useState(null);
    const { operation, getCompanyById, } = useDeliveryService();

    const { shopListContext } = useContext(ShopListContext);

    useEffect(() => {
        updateProductList();
    // eslint-disable-next-line
    }, [shopListContext.companyId])

    const updateProductList = () => {
        if (!shopListContext.companyId) {
            return
        }
        getCompanyById(shopListContext.companyId)
            .then(onProductsListLoaded);
    }

    const onProductsListLoaded = (productsList) => {
        setProductsList(productsList);
    }

    return (
        <div className="proucts__list">
            {shopListContext.companyId ? setContent(operation, FirstMessage, CardList, productsList) : <FirstMessage/>}
        </div>
    )
}

const FirstMessage = () => {
    return (
        <p className='proucts__first'>Take the company</p>
    )
}

export default ProductsList;