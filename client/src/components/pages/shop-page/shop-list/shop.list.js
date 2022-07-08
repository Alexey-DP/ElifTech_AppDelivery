import { useState, useEffect, useRef } from "react";
import DeliveryService from '../../../../services/delivery.service';
import Spinner from '../../../spinner/spinner';
import ErrorMessage from '../../../error-message/error.message';

import './shop.list.scss';


const ShopList = (props) => {

    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const deliveryService = new DeliveryService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        deliveryService.getAllCompanys()
            .then(onCompanyListLoaded)
            .catch(onError)
    }

    const onCompanyListLoaded = (companyList) => {
        setCompanyList(companyList);
        setLoading(false);
    }


    const onError = () => {
        setError(true)
        setLoading(false)
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
                        <img src={item.logo} alt={item.company} />
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
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="shop__list">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default ShopList;