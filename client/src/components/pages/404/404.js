import { NavLink } from 'react-router-dom';

import './404.scss';
import error404 from '../../../resources/img/404.jpg';

const Page404 = () => {
    return (
        <div className='error404__page'>
            <div className='error404__img-block'><img src={error404} alt="404" /></div>
            <NavLink
                className="error404__link"
                end
                to="/"
                >Main page</NavLink>
        </div>
    )
}

export default Page404;