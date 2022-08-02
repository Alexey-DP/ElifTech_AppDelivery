import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import AppHeader from "../app-header/app.header";
import Spinner from "../spinner/spinner";

import './app.scss';

const Page404 = lazy(() => import("../pages/404/404"));
const ShopPage = lazy(() => import("../pages/shop-page/shop.page"));
const ShoppingCartPage = lazy(() => import("../pages/shoppingCart-page/shoppingCart.page"));


const App = () => {
    return (
        <Router>
            <Helmet>
                <meta
                    name="description"
                    content="Web App for delivery food"/>
                <title>Delivery Food</title>
            </Helmet>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<ShopPage />} />
                            <Route path="/cart" element={<ShoppingCartPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;