const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzf6vav0S78eHs4Auny3UpH5mNXuuGucXip78kty4ZsLlLaExB18SpLDGCMhC0Rizfcxg/exec';

async function searchStudentByNISN(nisn) {
    try {
        // Method 1: GET request
        const getUrl = `${SCRIPT_URL}?nisn=${encodeURIComponent(nisn)}`;
        console.log('Trying GET request:', getUrl);
        
        let response = await fetch(getUrl, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (!response.ok) {
            console.log('GET failed, trying POST...');
            // Method 2: POST request
            response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `nisn=${encodeURIComponent(nisn)}`
            });
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Check multiple possible response formats
        if (data.found === true || data.status === 'found' || data.success === true) {
            return {
                nama: data.nama || data.name || '',
                nis: data.nis || '',
                nisn: data.nisn || nisn,
                tempatTanggalLahir: data.tempatTanggalLahir || data.ttl || '',
                namaOrangTua: data.namaOrangTua || data.orangTua || '',
                keterangan: data.keterangan || data.status || ''
            };
        }
        
        return null;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Gagal mengambil data. Silakan coba lagi.');
    }
}

async function testConnection() {
    try {
        const response = await fetch(`${SCRIPT_URL}?test=true`, {
            method: 'GET',
            mode: 'cors'
        });
        return response.ok;
    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
}
