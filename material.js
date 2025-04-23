document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("materialTitle").value;
    const fileInput = document.getElementById("materialFile");
    const file = fileInput.files[0];

    if (file && title) {
        const listItem = document.createElement("li");
        listItem.textContent = `${title} - ${file.name}`;
        document.getElementById("materialList").appendChild(listItem);

        // Reset form
        document.getElementById("uploadForm").reset();
    } else {
        alert("Please provide both a title and a file.");
    }
});
