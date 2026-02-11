document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const talks = document.querySelectorAll('.talk-card');
    const noResults = document.getElementById('no-results');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        talks.forEach(talk => {
            const title = talk.dataset.title.toLowerCase();
            const category = talk.dataset.category.toLowerCase();
            const speakers = talk.dataset.speakers.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm) || speakers.includes(searchTerm)) {
                talk.style.display = 'flex';
                visibleCount++;
            } else {
                talk.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    });
});
