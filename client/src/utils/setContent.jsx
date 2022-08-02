import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/error-message/error.message';

const setContent = (operation, Skeleton, Component, data) => {
    switch (operation) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'success':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default: throw new Error('Unexpected process state')
    }
}

export default setContent;