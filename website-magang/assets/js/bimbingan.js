document.addEventListener('DOMContentLoaded', function() {
    console.log('Bimbingan page loaded');
    
    const bimbinganMappings = {
        'online': 'https://docs.google.com/document/d/1xE-txdlW5JSEbaykRlqKA70muLMmViG6cztz1fjYUCo/edit?usp=drive_link',
        'offline': 'https://docs.google.com/document/d/1WtACU2ovAbUUdbW98DNsihoFpUsph6Ym7iOGHM_ocqM/edit?usp=drive_link',
        'logbook': 'https://docs.google.com/document/d/1bnJ54tVbvu8PW1z2XE3C_ajqfdQBzn-HY1yBOowU8Qg/edit?usp=drive_link'
    };
    
    function handleFileSelection(type) {
        const targetUrl = bimbinganMappings[type];
        
        if (targetUrl) {
            window.open(targetUrl, '_blank');
        } else {
            console.log(`Link untuk "${type}" belum dikonfigurasi`);
            alert(`Link untuk "${type}" belum dikonfigurasi. Silakan hubungi administrator.`);
        }
    }
    
    const fileButtons = document.querySelectorAll('.file-option-btn');
    fileButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    window.handleFileSelection = handleFileSelection;
});