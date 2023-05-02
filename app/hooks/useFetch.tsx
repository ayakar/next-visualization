import { useCallback, useState } from 'react';

const useFetch = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = useCallback(async (url: string, callback: ((data: any | null) => void) | null = null) => {
        setErrorMessage(null);

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                throw new Error();
            }

            if (callback) {
                callback(data);
            }
        } catch (error) {
            console.error('Something went wrong', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    }, []);

    return {
        errorMessage,
        fetchData,
    };
};

export default useFetch;
