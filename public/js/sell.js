// UPLOAD GIFT CARD IMAGE 
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

uploadBox.addEventListener('click', () => {
  if (previewContainer.children.length < 1) { // Change this from 2 to 1
    fileInput.click();
  } else {
    alert("You can upload only 1 image.");
  }
});

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);
  const currentCount = previewContainer.children.length;
  const remaining = 1 - currentCount; // Change this to 1

  files.slice(0, remaining).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  // ⚠️ Do not clear fileInput.value here to ensure form submission works
});
