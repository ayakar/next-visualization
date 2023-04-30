'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-center">
                <h2 className="mb-2">Something went wrong!</h2>
                <button
                    className="bg-primary text-white rounded-sm px-3 py-2"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again!
                </button>
            </div>
        </div>
    );
}
