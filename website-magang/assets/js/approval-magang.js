document.addEventListener('DOMContentLoaded', function() {
    console.log('Approval Magang page loaded');
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.stat-title').textContent;
            console.log(`Clicked on: ${title}`);
        });
    });
});