document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('../api/get_materials.php');
      if (!response.ok) throw new Error('Failed to fetch materials');
      const materials = await response.json();
  
      const materialList = document.getElementById('materialList');
      materialList.innerHTML = materials.map(material => `
        <div class="material-card">
          <h3>${material.title}</h3>
          <a href="../uploads/${material.filename}" download>Download File</a>
          <small>Uploaded: ${formatDate(material.upload_date)}</small>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error:', error);
      materialList.innerHTML = `<p class="error">Failed to load materials. Please try again later.</p>`;
    }
  });
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }