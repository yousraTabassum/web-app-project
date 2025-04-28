function showMaterials() {
    const materials = getMaterials();
    const listContainer = document.getElementById('materialsList');
    listContainer.innerHTML = '';
  
    if (materials.length === 0) {
      listContainer.innerHTML = '<p>No materials uploaded yet.</p>';
      return;
    }
  
    materials.forEach((mat, index) => {
      const div = document.createElement('div');
      div.className = 'material-item';
      div.innerHTML = `
        <h3>${index + 1}. ${mat.title}</h3>
        <p>${mat.content}</p>
        <small>Uploaded at: ${new Date(mat.uploadedAt).toLocaleString()}</small>
      `;
      listContainer.appendChild(div);
    });
  }
  
  window.onload = showMaterials;
  