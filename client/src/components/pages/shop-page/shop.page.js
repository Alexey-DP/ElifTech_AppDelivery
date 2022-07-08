import { useState } from 'react';
import './shop.page.scss';
import ShopList from './shop-list/shop.list'
import ProductsList from './products-list/products.list';

const ShopPage = ({addProduct}) => {

    const [selectedCompany, setSelectedCompany] = useState(null);

    const onCompanySelected = (id) => {
        setSelectedCompany(id);
    }

        return (
            <div className="shop">
                <ShopList onCompanySelected={onCompanySelected}/>
                <ProductsList companyId={selectedCompany} addProduct={addProduct}/>
            </div>
        )

};

export default ShopPage;