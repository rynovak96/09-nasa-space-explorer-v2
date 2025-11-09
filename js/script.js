// Use this URL to fetch NASA APOD JSON data. 
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Get references to the button and gallery elements
const getImageBtn = document.getElementById('getImageBtn');
const gallery = document.getElementById('gallery'); 

// Add a click event to the button
getImageBtn.addEventListener('click', () => {
  // Show a loading message before fetching data
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>Loading space photos...</p>
    </div>
  `;

  // Fetch the data from the NASA APOD JSON URL 
  fetch(apodData)
    .then(response => response.json()) // Parse the response as JSON 
    .then(data => {
      // Clear the gallery 
      gallery.innerHTML = '';
      // Loop through each item in the data array 
      data.forEach(item => {
        // Create a div for each gallery item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item'; 

        // Create an image element 
        const img = document.createElement('img');
        img.src = item.url; 
        img.alt = item.title; 

        // Create a paragraph for the title
        const title = document.createElement('p');
        title.textContent = `Title: ${item.title}`; 

        // Create a paragraph for the date
        const date = document.createElement('p');
        date.textContent = `Date: ${item.date}`;

        // Add the image, title, and date to the gallery item
        itemDiv.appendChild(img); 
        itemDiv.appendChild(title); 
        itemDiv.appendChild(date); 

        // When the gallery item is clicked, show the modal 
        itemDiv.addEventListener('click', () => {
          showModal(item); 
        });

        // Add the gallery item to the gallery
        gallery.appendChild(itemDiv); 
      });
    })
    .catch(error => {
      // Show an error message if something goes wrong
      gallery.innerHTML = `
        <div class="placeholder">
          <div class="placeholder-icon">⚠️</div>
          <p>Failed to load space photos. Please try again later.</p>
        </div>
      `;
      console.error('Error fetching data:', error);
    }); 
}); 

// Function to create and show the modal 
function showModal(item) {
  // Create the modal overlay
  const modalOverlay = document.createElement('div'); 
  modalOverlay.className = 'modal-overlay';

  // Create the modal content container
  const modalContent = document.createElement('div'); 
  modalContent.className = 'modal-content'; 

  // Create the close button 
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.textContent = 'Close';

  // Add event to close the modal when button is clicked
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modalOverlay); 
  }); 

  // Add event to close the modal when clicking outside the modal content 
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  }); 

  // Create the large image
  const largeImg = document.createElement('img'); 
  largeImg.src = item.url; 
  largeImg.alt = item.title; 
  largeImg.className = 'modal-image';

  // Create the title, date, and explanation elements
  const title = document.createElement('h2');
  title.textContent = item.title; 

  const date = document.createElement('p'); 
  date.textContent = `Date: ${item.date}`;

  const explanation = document.createElement('p');
  explanation.textContent = item.explanation;

  // Add all elements to the modal content
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(largeImg);
  modalContent.appendChild(title);
  modalContent.appendChild(date);
  modalContent.appendChild(explanation);

  // Add modal content to overlay
  modalOverlay.appendChild(modalContent);

  // Add the modal overlay to the page
  document.body.appendChild(modalOverlay);
}