function App() {
    try {
        const [result, setResult] = React.useState(null);
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [connectionStatus, setConnectionStatus] = React.useState('testing');
        const [debugMode, setDebugMode] = React.useState(false);

        React.useEffect(() => {
            checkConnection();
            // Enable debug mode by adding ?debug=true to URL
            const urlParams = new URLSearchParams(window.location.search);
            setDebugMode(urlParams.get('debug') === 'true');
        }, []);

        const checkConnection = async () => {
            try {
                const isConnected = await testConnection();
                setConnectionStatus(isConnected ? 'connected' : 'error');
            } catch (err) {
                console.error('Connection test failed:', err);
                setConnectionStatus('error');
            }
        };

        const handleSearch = async (nisn) => {
            setLoading(true);
            setResult(null);
            setError('');

            if (debugMode) {
                console.log('Searching for NISN:', nisn);
            }

            try {
                const studentData = await searchStudentByNISN(nisn);
                
                if (debugMode) {
                    console.log('Search result:', studentData);
                }
                
                if (studentData) {
                    setResult(studentData);
                } else {
                    setError('Data tidak ditemukan. Periksa kembali NISN Anda.');
                }
            } catch (err) {
                console.error('Search error:', err);
                setError(err.message || 'Terjadi kesalahan saat mencari data.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="min-h-screen flex flex-col" data-name="app" data-file="app.js">
                <main className="flex-1">
                    <Header />
                    <hide>
                    {connectionStatus === 'error' && (
                        <div className="max-w-md mx-auto px-4 mb-4">
                            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                Koneksi database bermasalah. Coba refresh halaman.
                            </div>
                        </div>
                    )}
                    
                    {connectionStatus === 'connected' && (
                        <div className="max-w-md mx-auto px-4 mb-4">
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <i className="fas fa-check-circle mr-2"></i>
                                Database terhubung. Siap untuk pencarian.
                            </div>
                        </div>
                    )}
        </hide>
                    <div className="container mx-auto py-8">
                        <SearchForm onSearch={handleSearch} loading={loading} />
                        <ResultCard result={result} error={error} />
                    </div>
                </main>
                
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
