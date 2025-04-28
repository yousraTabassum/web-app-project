// Load materials when page opens
document.addEventListener('DOMContentLoaded', loadMaterials);

// Upload form handler
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', document.getElementById('materialTitle').value);
  formData.append('file', document.getElementById('materialFile').files[0]);

  try {
    const response = await fetch('/api/materials', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Uploaded successfully!');
      loadMaterials(); // Refresh the list
    }
  } catch (error) {
    alert('Upload failed: ' + error);
  }
});

// Fetch and display materials
async function loadMaterials() {
  const response = await fetch('/api/materials');
  const materials = await response.json();
  const listDiv = document.getElementById('materialList');
  
  listDiv.innerHTML = materials.map(material => `
    <div class="material-item">
      <h3>${material.title}</h3>
      <a href="/uploads/${material.filename}" download>Download</a>
      <small>Uploaded: ${new Date(material.uploadDate).toLocaleString()}</small>
    </div>
  `).join('');
}