import './user.info.scss';


const UserInfo = ({setUserName, setUserNumber, setUserEmail, setUserAddress}) => {

        return (
            <div className="user__list">
                <ul className="user__grid">
                    <li className="user__item">
                        <label htmlFor="name">Your name:</label>
                        <input
                        name="name"
                        type="text" placeholder="Enter your name"
                        required
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}/>
                    </li>

                    <li className="user__item">
                        <label htmlFor="phone">Your phone:</label>
                        <input
                        name="phone"
                        type="text"
                        placeholder="Enter your phone number"
                        required
                        onChange={(e) => {
                            setUserNumber(e.target.value);
                        }}/>
                    </li>

                    <li className="user__item">
                        <label htmlFor="email">Your email:</label>
                        <input
                        name="name"
                        type="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                        }}/>
                    </li>

                    <li className="user__item">
                        <label htmlFor="address">Your address:</label>
                        <input
                        name="name"
                        type="text"
                        placeholder="Enter your address"
                        onChange={(e) => {
                            setUserAddress(e.target.value);
                        }}/>
                    </li>
                </ul>
            </div>
        )

}

export default UserInfo;