import { useState } from 'react';
import App from './app/App';
import { Context, ShopListContext } from './pages/context';

const Main = () => {

    const [order, setOrder] = useState({});
    const [shopListContext, setShopListContext] = useState({
        companyList: [],
        isShowAllButton: false,
        firstRender: true,
        shopSelected: false,
        companyId: null
    });

    return (
        <ShopListContext.Provider value={{ shopListContext, setShopListContext }}>
            <Context.Provider value={{ order, setOrder }}>
                <App />
            </Context.Provider>
        </ShopListContext.Provider>
    )
}

export default Main;