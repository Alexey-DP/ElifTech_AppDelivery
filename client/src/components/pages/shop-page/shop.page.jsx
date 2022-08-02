import { useState } from 'react';
import './shop.page.scss';
import ShopList from './shop-list/shop.list'
import ProductsList from './products-list/products.list';
import ErrorBoundary from '../../error-boundary/error-boundary';

const ShopPage = () => {

    const [selectedCompany, setSelectedCompany] = useState(null);

    const onCompanySelected = (id) => {
        setSelectedCompany(id);
    }

    return (
        <div className="shop">
            <ErrorBoundary>
                <ShopList onCompanySelected={onCompanySelected} />
            </ErrorBoundary>
            <ErrorBoundary>
                <ProductsList companyId={selectedCompany} />
            </ErrorBoundary>

        </div>
    )

};

export default ShopPage;