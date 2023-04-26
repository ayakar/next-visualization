import { useCallback, useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = useCallback(async (url: string, callback: ((data: any | null) => void) | null = null) => {
        setIsSuccess(false);
        setErrorMessage(null);

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                throw new Error();
            }
            setData(data);

            if (callback) {
                callback(data);
            }

            setIsSuccess(true);
        } catch (error) {
            console.error('Something went wrong', error);
            setErrorMessage('Something went wrong. Please try again.');
            setIsSuccess(false);
        }
    }, []);
    // May not need data or isSuccess in this app
    return {
        data,
        errorMessage,
        isSuccess,
        fetchData,
    };
};

export default useFetch;
