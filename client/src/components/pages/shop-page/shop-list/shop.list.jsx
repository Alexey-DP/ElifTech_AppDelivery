import { useEffect, useContext } from "react";
import useDeliveryService from '../../../../services/delivery.service';
import Spinner from '../../../spinner/spinner';
import ErrorMessage from '../../../error-message/error.message';
import ShowAllCompanys from "./show.all.companys";
import { Context, ShopListContext } from '../../context';

import './shop.list.scss';


const ShopList = () => {

    const { setOrder } = useContext(Context);
    const { shopListContext, setShopListContext } = useContext(ShopListContext);

    const { operation, getAllCompanys, } = useDeliveryService();

    useEffect(() => {
        if (shopListContext.firstRender) {
            onRequest();
        }
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllCompanys()
            .then(onCompanyListLoaded)
    }

    const onCompanyListLoaded = (companyList) => {
        setShopListContext(list => {
            return { ...list, companyList, firstRender: false };
        });
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className={shopListContext.shopSelected ? "shop__item shop__item_selected" : "shop__item"}
                    key={item._id}
                    onClick={() => {
                        setShopListContext(list => {
                            return {
                                ...list,
                                companyList: [item],
                                isShowAllButton: true,
                                shopSelected: true,
                                companyId: item._id
                            }
                        });
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

    const items = renderItems(shopListContext.companyList);
    const errorMessage = operation === 'error' ? <ErrorMessage /> : null;
    const spinner = operation === 'loading' ? <Spinner /> : null;

    return (
        <div className={"shop__list"}>
            {errorMessage}
            {items}
            {spinner}
            {shopListContext.isShowAllButton ? <ShowAllCompanys
                showAll={() => {
                    onRequest();
                    setShopListContext(list => {
                        return {
                            ...list,
                            isShowAllButton: !list.isShowAllButton,
                            shopSelected: false,
                            companyId: null
                        }
                    });
                    setOrder({});
                }} /> : null}
        </div>
    )
}

export default ShopList;