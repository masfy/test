function Header() {
    try {
        return (
            <div className="text-center py-8 px-4" data-name="header" data-file="components/Header.js">
                <div className="mb-6">
                    <img 
                        src="https://app.trickle.so/storage/public/images/usr_10b047df68010001/7f5f0001-541f-4dab-8f6b-5b54a71b8b61.png" 
                        alt="Logo Brand" 
                        className="mx-auto h-40 w-auto mb-4"
                    />

                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Pengumuman Kelulusan
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    Masukkan NISN Anda untuk melihat status kelulusan
                </p>
                <div className="mt-4 text-white/80">
                    <p className="text-lg font-medium">Tahun Ajaran 2024/2025</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
