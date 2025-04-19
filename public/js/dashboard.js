// Get all the menu items ADDING ACTIVE 
const menuItems = document.querySelectorAll('.menu a');

// Function to set the active menu item based on the current URL
function setActiveMenuItem() {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Loop through each menu item
    menuItems.forEach(item => {
        // Remove 'active' class from all menu items
        item.classList.remove('active');

        // Check if the item's href matches the current path
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
}

// Run the function on page load
setActiveMenuItem();




// close sidebar and open sidebar 
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    container.classList.toggle('sidebar-closed');

    // Change the icon direction
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('closed')) {
        // Change to right arrow when sidebar is closed
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
    } else {
        // Change to left arrow when sidebar is open
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
    }
});







// HAMBURGER for small screen
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuContainer = document.getElementById("menu-container");
    const openIcon = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");

    // OPEN the menu
    hamburgerMenu.addEventListener("click", function () {
        menuContainer.classList.add("active");
        openIcon.style.display = "none";
    });

    // CLOSE the menu
    closeMenu.addEventListener("click", function () {
        menuContainer.classList.remove("active");
        openIcon.style.display = "block";
    });
});






// DRAGABLE IMAGE 
document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable-image');
    const closeButton = document.querySelector('.close-btn');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Common function to start dragging
    const startDrag = (e) => {
        isDragging = true;
        draggable.style.cursor = 'grabbing';

        const rect = draggable.getBoundingClientRect();

        // Calculate offsets for mouse or touch
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        } else if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
    };

    // Common function to drag
    const onDrag = (e) => {
        if (!isDragging) return;

        // Get cursor or touch position
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Update position of the draggable element
        draggable.style.left = `${clientX - offsetX}px`;
        draggable.style.top = `${clientY - offsetY}px`;
        draggable.style.right = 'auto'; // Prevent snapping back to right
        draggable.style.transform = 'none'; // Remove initial centering
    };

    // Common function to stop dragging
    const stopDrag = () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    };

    // Mouse events
    draggable.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    // Touch events
    draggable.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);

    // Close functionality
    closeButton.addEventListener('click', () => {
        draggable.style.display = 'none'; // Hide the draggable container
    });
});






// ALL ABOUT  SLIDE 
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".centered-content");
    let currentIndex = 0;
    let totalSlides = slides.length;

    function slideShow() {
        let currentSlide = slides[currentIndex];
        let nextIndex = (currentIndex + 1) % totalSlides;
        let nextSlide = slides[nextIndex];

        // Slide out the current slide
        currentSlide.style.transform = "translateX(-100%)";
        currentSlide.style.opacity = "0";

        // Slide in the next slide
        nextSlide.style.transform = "translateX(0)";
        nextSlide.style.opacity = "1";
        nextSlide.style.left = "0";

        // Reset previous slide position
        setTimeout(() => {
            currentSlide.style.left = "100%"; // Move it back for the next cycle
            currentSlide.style.transform = "none";
        }, 1500);

        currentIndex = nextIndex;
    }

    // Start auto-sliding every 5 seconds
    setInterval(slideShow, 5000);
});




// SHOW CURRENT TIME 
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes} ${ampm}`;

    // Set time for all elements with class "current-time"
    document.querySelectorAll('.current-time').forEach(el => {
        el.textContent = timeString;
    });
}

updateTime();
setInterval(updateTime, 60000);




//   ALL ABOUT  ACTIVE USER 

// TO ADD ACTIVE VIA GIFT CARDS 
document.addEventListener("DOMContentLoaded", function () {
    const giftCards = document.querySelectorAll(".gift-card-list span");

    giftCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Remove 'active' from all
            giftCards.forEach((c) => c.classList.remove("active"));
            // Add 'active' to the clicked one
            card.classList.add("active");
        });
    });
});




// TO FILTER ACTIVE USER VIA ALL GIFT CARDS 
// Event listener for brand filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const brand = button.getAttribute('data-brand');
        filterOffers(brand);
    });
});

// Function to filter offers based on the selected brand
function filterOffers(brand) {
    const allOffers = document.querySelectorAll('.offer-card');

    if (brand === "Active Deals") {
        // If "Active Deals" is clicked, show all cards
        allOffers.forEach(offer => {
            offer.style.display = 'block';  // Show all
        });
    } else {
        // Filter and show only the offer-cards with the selected brand
        allOffers.forEach(offer => {
            const offerBrand = offer.getAttribute('data-brand');
            if (offerBrand.includes(brand)) {
                offer.style.display = 'block';  // Show this offer-card
            } else {
                offer.style.display = 'none';  // Hide the offer-card
            }
        });
    }
}




// TO ADD LOADING SPINER 
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const spinner = document.getElementById('loading-spinner');
    const offerList = document.getElementById('offer-list');
    const offerCards = document.querySelectorAll('.offer-card');

    // Default view on load
    window.addEventListener('DOMContentLoaded', () => {
        offerCards.forEach(card => card.style.display = 'block');
        document.querySelector('.filter-btn[data-brand="Active Deals"]').classList.add('active');
        spinner.style.display = 'none';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedBrand = button.getAttribute('data-brand');

            // Set active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (selectedBrand === 'Active Deals') {
                spinner.style.display = 'none';
                offerList.style.display = 'block';
                offerCards.forEach(card => card.style.display = 'block');
            } else {
                // Show spinner
                spinner.style.display = 'flex';
                offerList.style.display = 'none';

                setTimeout(() => {
                    offerCards.forEach(card => {
                        const cardBrands = card.getAttribute('data-brand');
                        card.style.display = cardBrands.includes(selectedBrand) ? 'block' : 'none';
                    });
                    spinner.style.display = 'none';
                    offerList.style.display = 'block';
                }, 4000); // 5 seconds delay
            }
        });
    });
});




// <!-- FUNCTION TO CHANGE THE RATE OF THE AVAILABLE BALANCE IN ACTIVE BUYING USERS -->
const balanceUSD = 0.02; // base balance in USD
  const currencySelectors = document.querySelectorAll('.currency-selector'); // updated class
  const balanceEls = document.querySelectorAll('.balance'); // where the converted balance is shown

  // Build a unique localStorage key for this user
  const storageKey = `selectedCurrency-${currentUser}`;

  async function updateBalanceCurrency(selectedCurrency) {
    // Show loading spinner
    balanceEls.forEach(el => {
      el.innerHTML = `<span class="spinner"></span> converting...`;
    });

    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/43d7d7fb9abf1529254bd3cf/latest/USD');
      const data = await response.json();

      const conversionRate = data.conversion_rates[selectedCurrency];
      const convertedBalance = balanceUSD * conversionRate;

      const formattedBalance = convertedBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: selectedCurrency,
        minimumFractionDigits: 2,
      });

      // Update all balance displays
      balanceEls.forEach(el => {
        el.innerText = formattedBalance;
      });

      // Update all select boxes
      currencySelectors.forEach(select => {
        select.value = selectedCurrency;
      });

      // Store per-user setting
      localStorage.setItem(storageKey, selectedCurrency);

    } catch (error) {
      balanceEls.forEach(el => el.innerText = 'Conversion failed');
      console.error('Currency conversion failed:', error);
    }
  }

  // Listen to all select changes
  currencySelectors.forEach(select => {
    select.addEventListener('change', () => {
      updateBalanceCurrency(select.value);
    });
  });

  // On load: use stored currency or default to USD
  window.addEventListener('DOMContentLoaded', () => {
    const savedCurrency = localStorage.getItem(storageKey) || 'USD';
    updateBalanceCurrency(savedCurrency);
  });