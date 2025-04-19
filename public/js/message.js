// <!-- SHOW CHART  -->
// Show the message in the modal
function showMessage(message) {
    document.getElementById('modalText').innerText = message;

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.left = '0'; // Slide in the modal
    }, 10);
}





// Close the modal, slide it out, and clear localStorage
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.left = '-300px'; // Slide out the modal

    setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal

        // Clear localStorage once the modal is closed
        localStorage.removeItem('userMessages');
        localStorage.removeItem('showUserMessage');
        localStorage.removeItem('userMessageSeen');

        // Optionally, update the notification badge (set to 0 since no message)
        const badge = document.querySelector('.active-message');
        if (badge) {
            badge.textContent = 0; // Reset badge count to 0
        }
    }, 500); // Wait for the slide-out animation to finish before hiding
}

