// src/App.js
import React, { useState } from 'react';

function TestingPowerShell() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Execute the mock API PowerShell script
            const command = "sample_api.ps1";

            const result = await window.electronAPI.runPowerShellCommand(command);

            if (result.success) {
                // Parse JSON from the script's output
                const parsed = JSON.parse(result.output);
                setData(parsed);
            } else {
                setData(`Error: ${result.error}`);
            }
        } catch (err) {
            setData(`Parse error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>PowerShell Data in Electron + React</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Run PowerShell & Get Mock Data'}
            </button>

            <pre>
                {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default TestingPowerShell;