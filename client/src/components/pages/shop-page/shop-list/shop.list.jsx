import { useState, useEffect, useRef } from "react";
import useDeliveryService from '../../../../services/delivery.service';
import Spinner from '../../../spinner/spinner';
import ErrorMessage from '../../../error-message/error.message';

import './shop.list.scss';


const ShopList = (props) => {

    const [companyList, setCompanyList] = useState([]);

    const { operation, getAllCompanys, } = useDeliveryService();

    useEffect(() => {
        onRequest();
    // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllCompanys()
            .then(onCompanyListLoaded)
    }

    const onCompanyListLoaded = (companyList) => {
        setCompanyList(companyList);
    }


    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('shop__item_selected'));
        itemRefs.current[id].classList.add('shop__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="shop__item"
                    key={item._id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCompanySelected(item._id);
                        focusOnItem(i);
                    }}>
                    <div className="shop__img">
                        <img src={item.logo2} alt={item.company} />
                    </div>
                    <p className="shop__name">{item.company}</p>
                </li>
            )
        });
        return (
            <ul className="shop__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(companyList);
    const errorMessage = operation === 'error' ? <ErrorMessage/> : null;
    const spinner = operation === 'loading' ? <Spinner/> : null;

    return (
        <div className="shop__list">
            {errorMessage}
            {spinner}
            {items}
        </div>
    )
}

export default ShopList;