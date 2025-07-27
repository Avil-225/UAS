document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    const linkMappings = {
        'Info Beasiswa': 'https://home.amikom.ac.id/beasiswa/',
        'Info Biaya Kuliah': 'https://pmb.amikom.ac.id/id/page/biaya-kuliah', 
        'Info PMB AMIKOM': 'https://cmhs.amikom.ac.id/daftar#!/'
    };
    
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkText = this.textContent.replace(/\s*→\s*$/, '').trim();
            
            const targetUrl = linkMappings[linkText];
            
            if (targetUrl) {
                window.open(targetUrl, '_blank');
            } else {
                console.log(`Link untuk "${linkText}" belum dikonfigurasi`);
                alert(`Link untuk "${linkText}" belum dikonfigurasi. Silakan hubungi administrator.`);
            }
        });
    });
    
    cardLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});