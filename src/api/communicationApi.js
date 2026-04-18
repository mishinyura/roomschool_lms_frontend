

export const communicationApi = {

    async getHistoryMessages() {
        
        const res = await fetch('http://localhost:8000/education/ai/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-App': 'roomschool-web'
            }
        });

        if (!res.ok) {
            const details = await res.text();
            throw new Error(`HTTP ${res.status}: ${details}`);
        }
        return res.json();
    }
};