import { NavLink } from 'react-router-dom';

import './app.header.scss';

const AppHeader = () => {

    return (
        <header className="app__header">
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        end
                        to="/"
                        style={({isActive}) => ({color: isActive ? '#235ef4' : ""})}
                        >Shop</NavLink></li>
                    /
                    <li><NavLink
                        end
                        to="/cart"
                        style={({isActive}) => ({color: isActive ? '#235ef4' : ""})}
                        >Shopping cart</NavLink></li>
                </ul>
            </nav>
            <h1 className="app__title">
                <a href="/">
                    <span>Delivery</span> Food
                </a>
            </h1>
        </header>
    )
}

export default AppHeader;