// TestMessageComponent.js
import React, { useEffect, useState } from 'react';
import { testMessage } from '../services/CaniService';

const TestMessageComponent = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestMessage = async () => {
            setLoading(true);
            try {
                const data = await testMessage();
                setMessage(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchTestMessage();
    }, []);

    return (
        <div>
            <h1>Test Message from Canister</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div>Message: {message}</div>
        </div>
    );
};

export default TestMessageComponent;