import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: 150, height: 150, objectFit: 'contain', margin: '0 auto'}} src={img} alt='Error'/>

    )
}

export default ErrorMessage;