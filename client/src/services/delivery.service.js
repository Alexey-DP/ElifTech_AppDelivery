import {
    useHttp
} from './http.hook';

const useDeliveryService = () => {

    const {
        request,
        clearError,
        operation,
        setOperation
    } = useHttp();

    const serverUrl = 'http://localhost:7777';

    const getAllCompanys = async () =>
        await request(`${serverUrl}/api/food`);


    const getCompanyById = async (id) =>
        await request(`${serverUrl}/api/food/${id}`);


    const sendOrder = async (body) =>
        await request(`${serverUrl}/api/order`, "POST", JSON.stringify(body));

    return {
        clearError,
        operation,
        setOperation,
        getAllCompanys,
        getCompanyById,
        sendOrder
    };
}

export default useDeliveryService;