import { useState, useCallback } from "react";

export const useHttp = () => {
    const [operation, setOperation] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setOperation('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error (`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setOperation('success');
            return data;

        } catch(e) {
            setOperation('error');
            throw e;
        }

    }, [])


    const clearError = useCallback(() => {
        setOperation('loading');
    }, []);

    return {request, clearError, operation, setOperation};
}