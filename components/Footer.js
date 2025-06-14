function Footer() {
    try {
        return (
            <footer className="mt-16 bg-gray-800 text-white py-8" data-name="footer" data-file="components/Footer.js">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-6">
                        <p className="text-gray-300 mb-4"> © 2025 | Mas Alfy Sinau Ngoding</p>
                    </div>
                    
                    <div className="flex justify-center space-x-6 mb-6">
                        <a 
                            href="https://www.instagram.com/masalfy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-pink-300 transition-colors"
                        >
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a 
                            href="https://facebook.com/alfiannoor.arnaim/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <i className="fab fa-facebook text-2xl"></i>
                        </a>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                        <p className="text-gray-400 text-sm">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            Hubungi ulun jika terdapat kesalahan data.
                        </p>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
    }
}
