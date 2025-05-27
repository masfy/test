const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwB7GI6tlCbKrwnoVCVExU3rnhyXQRAGXaINqQcntjIYy5A4l0uTyEYeBRwuNnrM_cVvQ/exec';

async function searchStudentByNISN(nisn) {
    try {
        const url = `${SCRIPT_URL}?nisn=${encodeURIComponent(nisn)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Ambil data sesuai struktur response baru dari Apps Script
        return {
            nama: data.nama || '',
            nis: data.nis || '',
            nisn: data.nisn || '',
            tempatTanggalLahir: data.ttl || '',
            namaOrangTua: data.ortu || '',
            keterangan: data.keterangan || ''
        };

    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Gagal mengambil data. Silakan coba lagi.');
    }
}
