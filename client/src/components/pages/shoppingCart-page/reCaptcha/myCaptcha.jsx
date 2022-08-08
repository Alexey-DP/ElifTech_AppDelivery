import Reaptcha from 'reaptcha';
import axios from 'axios';

const MyCaptcha = ({setVerified, setOrderStatus, verified}) => {

    const captchaVerify = async (token) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/recaptcha`, {token})
        .then(res =>  {
            if(res.data === 'Human') {
                setVerified(true)
            } else if (res.data === 'Robot') {
                setVerified('robot');
            }
        })
        .catch((error) => {
            setOrderStatus('error')
        })
        .finally(() => {
            setTimeout(() => {
                setOrderStatus('waiting')
            }, 5000)
        })
    }

    return (
        <>
            {verified === 'robot' ?
                <div className="shopping__error">You're ROBOT!!!</div> :
                <Reaptcha className='shopping__captcha'
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    theme='dark'
                    onVerify={(token) => {
                        captchaVerify(token);
                    }}
                />}
        </>
    )
}

export default MyCaptcha;