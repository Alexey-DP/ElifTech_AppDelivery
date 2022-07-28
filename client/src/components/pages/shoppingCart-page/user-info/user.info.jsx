import './user.info.scss';
import TextInput from './textinput';


const UserInfo = () => {

    return (
        <div className="user__list">
            <ul className="user__grid">
                <li className="user__item">
                    <TextInput
                        label="Your name:"
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                    />
                </li>
                <li className="user__item">
                <TextInput
                        label="Your phone:"
                        id="number"
                        name="number"
                        type="number"
                        required
                        placeholder="Enter your phone number"
                    />
                </li>
                <li className="user__item">
                <TextInput
                        label="Your email:"
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                    />
                </li>
                <li className="user__item">
                <TextInput
                        label="Your address:"
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                    />
                </li>
            </ul>
        </div>
    )

}

export default UserInfo;