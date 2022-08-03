import TextInput from './textinput';
import ErrorBoundary from '../../../error-boundary/error-boundary';
import MyGoogleMapWrapper from '../google-maps/my.google.map';
import './user.info.scss';

const UserInfo = ({address, setAddress}) => {

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
                    <h4>Your address:</h4>
                    <p className='shopping__address-text'>{address}</p>
                </li>
            </ul>
            <ErrorBoundary>
                <MyGoogleMapWrapper setAddress={setAddress}/>
            </ErrorBoundary>
        </div>
    )
}

export default UserInfo;