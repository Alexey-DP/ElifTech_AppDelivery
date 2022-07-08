import AppHeader from "../app-header/app.header";
import ShoppingCartPage from '../pages/shoppingCart-page/shoppingCart.page';
import ShopPage from '../pages/shop-page/shop.page';
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
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;