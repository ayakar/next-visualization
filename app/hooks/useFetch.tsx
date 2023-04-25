import { useCallback, useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = useCallback(async (url: string, callback: ((data: any | null) => void) | null = null, defaultIsLoading = true) => {
        if (defaultIsLoading) {
            setIsLoading(true);
        }

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
            setErrorMessage('Something went wrong. Please try again.');
            setIsSuccess(false);
        }

        setIsLoading(false);
    }, []);
    // May not need data or isSuccess in this app
    return { data, errorMessage, isLoading, isSuccess, fetchData };
};

export default useFetch;
