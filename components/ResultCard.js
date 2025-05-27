function ResultCard({ result, error }) {
    try {
        if (error) {
            return (
                <div className="max-w-2xl mx-auto px-4 mt-8" data-name="error-result" data-file="components/ResultCard.js">
                    <div className="error-card rounded-2xl p-8 card-shadow text-center">
                        <i className="fas fa-exclamation-triangle text-4xl text-orange-600 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Tidak Ditemukan</h3>
                        <p className="text-gray-600">
                            Periksa kembali NISN Anda atau hubungi panitia jika terdapat kesalahan data.
                        </p>
                    </div>
                </div>
            );
        }

        if (!result) return null;

        const isLulus = result.keterangan?.toUpperCase() === 'LULUS';

        return (
            <div className="max-w-2xl mx-auto px-4 mt-8" data-name="success-result" data-file="components/ResultCard.js">
                <div className="success-card rounded-2xl p-8 card-shadow">
                    <div className="text-center mb-6">
                        <i className={`fas ${isLulus ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-4xl mb-4`}></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {isLulus ? 'SELAMAT! ANDA LULUS' : 'MOHON MAAF, ANDA BELUM LULUS'}
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/50 rounded-lg p-4">
                                <label className="text-sm font-medium text-gray-600">Nama</label>
                                <p className="text-lg font-semibold text-gray-800">{result.nama}</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-4">
                                <label className="text-sm font-medium text-gray-600">NIS</label>
                                <p className="text-lg font-semibold text-gray-800">{result.nis}</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-4">
                                <label className="text-sm font-medium text-gray-600">NISN</label>
                                <p className="text-lg font-semibold text-gray-800">{result.nisn}</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-4">
                                <label className="text-sm font-medium text-gray-600">Tempat, Tanggal Lahir</label>
                                <p className="text-lg font-semibold text-gray-800">{result.tempatTanggalLahir}</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/50 rounded-lg p-4">
                            <label className="text-sm font-medium text-gray-600">Nama Orang Tua</label>
                            <p className="text-lg font-semibold text-gray-800">{result.namaOrangTua}</p>
                        </div>
                        
                        <div className="bg-white/50 rounded-lg p-4 text-center">
                            <label className="text-sm font-medium text-gray-600">Status Kelulusan</label>
                            <p className={`text-2xl font-bold ${isLulus ? 'text-green-600' : 'text-red-600'}`}>
                                {result.keterangan}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ResultCard component error:', error);
        reportError(error);
    }
}
