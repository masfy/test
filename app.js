function App() {
    try {
        const [result, setResult] = React.useState(null);
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [debugMode, setDebugMode] = React.useState(false);

        React.useEffect(() => {
            checkConnection();
            // Enable debug mode by adding ?debug=true to URL
            const urlParams = new URLSearchParams(window.location.search);
            setDebugMode(urlParams.get('debug') === 'true');
        }, []);

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
