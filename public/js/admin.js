// POPOUT FETCHED GIFT CARD IMAGE
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeModal');

// Function to open the modal with the correct image
function openModal(imagePath) {
    modal.style.display = 'flex'; // Use 'flex' to center the image
    modalImg.src = imagePath;
}

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal if the user clicks outside the image (on the modal overlay)
window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});





//   CODE TO DELETE USER INFO 
function deleteCard(cardId) {
    Swal.fire({
        title: 'Are you sure?',
        html: "You are about to delete this gift card.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        width: '400px',
        didOpen: () => {
            document.querySelector(".swal2-title").style.fontSize = "16px";
            document.querySelector(".swal2-html-container").style.fontSize = "14px";
            document.querySelector(".swal2-confirm").style.fontSize = "13px";
            document.querySelector(".swal2-cancel").style.fontSize = "13px";
            document.querySelector(".swal2-confirm").style.padding = "8px 16px";
            document.querySelector(".swal2-cancel").style.padding = "8px 16px";
        }
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/admin/delete-card/${cardId}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        document.querySelector(`[data-id="${cardId}"]`).remove();
                        Swal.fire({
                            title: 'Deleted!',
                            html: 'Gift card has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6',
                            width: '400px',
                            didOpen: () => {
                                document.querySelector(".swal2-title").style.fontSize = "16px";
                                document.querySelector(".swal2-html-container").style.fontSize = "14px";
                                document.querySelector(".swal2-confirm").style.fontSize = "13px";
                                document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Failed!',
                            html: 'Failed to delete card.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#d33',
                            width: '400px',
                            didOpen: () => {
                                document.querySelector(".swal2-title").style.fontSize = "16px";
                                document.querySelector(".swal2-html-container").style.fontSize = "14px";
                                document.querySelector(".swal2-confirm").style.fontSize = "13px";
                                document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                            }
                        });
                    }
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                    Swal.fire({
                        title: 'Error!',
                        html: 'Something went wrong.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#d33',
                        width: '400px',
                        didOpen: () => {
                            document.querySelector(".swal2-title").style.fontSize = "16px";
                            document.querySelector(".swal2-html-container").style.fontSize = "14px";
                            document.querySelector(".swal2-confirm").style.fontSize = "13px";
                            document.querySelector(".swal2-confirm").style.padding = "8px 16px";
                        }
                    });
                });
        }
    });
}


// FUNCTION TO SEND A MESSAGE TO MESSAGE.EJS
function messageUser(userId) {
    const userMessages = JSON.parse(localStorage.getItem('userMessages') || '{}');
    userMessages[userId] = 'Hey! Thanks for submitting your card. We’ll get back shortly.';
    localStorage.setItem('userMessages', JSON.stringify(userMessages));
    localStorage.setItem('showUserMessage', 'true');

    Swal.fire({
        title: 'Message Sent!',
        html: 'The user has been notified.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        width: '400px',
        didOpen: () => {
            document.querySelector(".swal2-title").style.fontSize = "16px";
            document.querySelector(".swal2-html-container").style.fontSize = "14px";
            document.querySelector(".swal2-confirm").style.fontSize = "13px";
            document.querySelector(".swal2-confirm").style.padding = "8px 16px";
        }
    });
}







