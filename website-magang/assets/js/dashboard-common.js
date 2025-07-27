function getCurrentPage() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    return fileName || 'dashboard.html';
}

function createSidebar(currentPage) {
    const navItems = [
        { href: 'dashboard.html', icon: 'fas fa-chart-line', text: 'Dashboard' },
        { href: 'approval-magang.html', icon: 'fas fa-check-circle', text: 'Approval Magang' },
        { href: 'bimbingan.html', icon: 'fas fa-user-graduate', text: 'Bimbingan' },
        { href: 'laporan-magang.html', icon: 'fas fa-file-alt', text: 'Laporan Magang' },
        { href: 'penilaian-magang.html', icon: 'fas fa-star', text: 'Penilaian Magang' },
        { href: 'cetak-sertifikasi.html', icon: 'fas fa-certificate', text: 'Cetak Sertifikasi' },
        { href: 'view-data-prodi.html', icon: 'fas fa-users', text: 'View Data Prodi' }
    ];

    let navHTML = '';
    navItems.forEach(item => {
        const isActive = item.href === currentPage ? 'active' : '';
        navHTML += `
            <li class="nav-item">
                <a href="${item.href}" class="nav-link ${isActive}">
                    <i class="${item.icon}"></i>
                    ${item.text}
                </a>
            </li>
        `;
    });

    return `
        <div class="sidebar">
            <div class="user-profile">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-name">Avillian Aufa</div>
            </div>
            
            <ul class="nav-menu">
                ${navHTML}
            </ul>
        </div>
    `;
}

function createHeader(pageName) {
    const pageMap = {
        'dashboard.html': 'Dashboard',
        'approval-magang.html': 'Approval Magang',
        'bimbingan.html': 'Bimbingan', 
        'laporan-magang.html': 'Laporan Magang',
        'penilaian-magang.html': 'Penilaian Magang',
        'cetak-sertifikasi.html': 'Cetak Sertifikasi',
        'view-data-prodi.html': 'View Data Prodi'
    };
    
    const displayName = pageMap[pageName] || 'Dashboard';
    
    return `
        <div class="header">
            Magang Mahasiswa D3 TI
        </div>
        
        <div class="breadcrumb-section">
            <p class="breadcrumb-text">${displayName}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = createSidebar(currentPage);
    }
    
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader(currentPage);
    }
    
    console.log(`Page loaded: ${currentPage}`);
});