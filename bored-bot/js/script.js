const activityDescription = document.getElementById('activity-description');
const getActivityBtn = document.getElementById('get-activity-btn');
const url = 'https://apis.scrimba.com/bored/api/activity';

getActivityBtn.addEventListener('click', () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            activityDescription.textContent = data.activity;
        });
});