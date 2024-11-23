document.addEventListener('DOMContentLoaded', function() {
  const sendButton = document.getElementById('sendToApp');
  const statusDiv = document.getElementById('status');
  const scheduleCheckbox = document.getElementById('schedule');
  const scheduleContainer = document.querySelector('.schedule-container');

  scheduleCheckbox.addEventListener('change', function() {
    scheduleContainer.style.display = this.checked ? 'block' : 'none';
  });

  sendButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentUrl = tabs[0].url;
      const downloadType = document.getElementById('downloadType').value;
      const quality = document.getElementById('quality').value;
      const isScheduled = document.getElementById('schedule').checked;
      const scheduleTime = document.getElementById('scheduleTime').value;

      const data = {
        url: currentUrl,
        type: downloadType,
        quality: quality,
        scheduled: isScheduled,
        scheduleTime: isScheduled ? scheduleTime : null
      };

      fetch('http://localhost:5000/add-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        statusDiv.textContent = 'Successfully sent to FetchEase!';
        statusDiv.style.color = 'green';
      })
      .catch(error => {
        statusDiv.textContent = 'Error: Could not connect to FetchEase';
        statusDiv.style.color = 'red';
      });
    });
  });
});