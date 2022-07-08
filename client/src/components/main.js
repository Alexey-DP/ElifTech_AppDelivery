import {useState} from 'react';
import App from './app/App';
import {Context} from './pages/context';

const Main = () => {

    const [order, setOrder] = useState({});

return (
    <Context.Provider value={{order, setOrder}}>
    <App />
    </Context.Provider>
)
}

export default Main;