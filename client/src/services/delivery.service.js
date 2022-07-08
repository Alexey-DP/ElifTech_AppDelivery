class DeliveryService {

    getResours = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error (`Could not find ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getAllCompanys = () => {
        return this.getResours('http://localhost:7777/api/food/');
    }

    getCompanyById = (id) => {
        return this.getResours(`http://localhost:7777/api/food/${id}`);
    }

    sendOrder = async(body) => {
        const res = await fetch('http://localhost:7777/api/order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return await res.json();
    }
}

export default DeliveryService;