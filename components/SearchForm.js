function SearchForm({ onSearch, loading }) {
    try {
        const [nisn, setNisn] = React.useState('');
        const [error, setError] = React.useState('');
        const [debugInfo, setDebugInfo] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            setError('');
            setDebugInfo('');
            
            if (!nisn.trim()) {
                setError('NISN tidak boleh kosong');
                return;
            }
            
            const cleanNisn = nisn.replace(/\D/g, '');
            
            if (cleanNisn.length < 8) {
                setError('NISN harus minimal 8 digit');
                return;
            }
            
            setDebugInfo(`Mencari NISN: ${cleanNisn}`);
            onSearch(cleanNisn);
        };

        const handleNisnChange = (e) => {
            const value = e.target.value.replace(/\D/g, '');
            setNisn(value);
        };

        return (
            <div className="max-w-md mx-auto px-4" data-name="search-form" data-file="components/SearchForm.js">
                <div className="bg-white rounded-2xl p-8 card-shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Nomor Induk Siswa Nasional (NISN)
                            </label>
                            <input
                                type="text"
                                value={nisn}
                                onChange={handleNisnChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                                placeholder="Contoh: 1234567890"
                                maxLength="15"
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                            {debugInfo && (
                                <p className="text-blue-500 text-sm mt-2">{debugInfo}</p>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Mencari...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <i className="fas fa-search mr-2"></i>
                                    Cek Kelulusan
                                </span>
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            <i className="fas fa-info-circle mr-1"></i>
                            Pastikan NISN sesuai dengan data di sistem
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SearchForm component error:', error);
        reportError(error);
    }
}
