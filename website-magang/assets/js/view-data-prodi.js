function handleSearch() {
    window.open('https://mi.amikom.ac.id/page/validasi-sertifikat-magang', '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('View Data Prodi page loaded');
    
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const nama = this.cells[1].textContent;
            const nim = this.cells[2].textContent;
            console.log(`Selected student: ${nama} (${nim})`);
        });
    });
});