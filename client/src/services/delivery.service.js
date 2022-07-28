class DeliveryService {

    serverUrl = 'http://localhost:7777';

    getResours = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error (`Could not find ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getAllCompanys = () => {
        return this.getResours(`${this.serverUrl}/api/food`);
    }

    getCompanyById = (id) => {
        return this.getResours(`${this.serverUrl}/api/food/${id}`);
    }

    sendOrder = async(body) => {
        const res = await fetch(`${this.serverUrl}/api/order`, {
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