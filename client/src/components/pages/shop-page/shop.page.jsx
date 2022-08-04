import ShopList from './shop-list/shop.list'
import ProductsList from './products-list/products.list';
import ErrorBoundary from '../../error-boundary/error-boundary';

import './shop.page.scss';

const ShopPage = () => {

    return (
        <div className="shop">
            <ErrorBoundary>
                <ShopList />
            </ErrorBoundary>
            <ErrorBoundary>
                <ProductsList />
            </ErrorBoundary>
        </div>
    )

};

export default ShopPage;