import AppHeader from "../app-header/app.header";
import ShoppingCartPage from '../pages/shoppingCart-page/shoppingCart.page';
import ShopPage from '../pages/shop-page/shop.page';
import Page404 from '../pages/404/404';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './app.scss'

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<ShopPage />}/>
                        <Route path="/cart" element={<ShoppingCartPage />}/>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;