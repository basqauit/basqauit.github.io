const repoURL = "https://api.github.com/repos/basqauit/basqauit.github.io/contents/images";

async function fetchImages() {
    try {
        const response = await fetch(repoURL);
        const data = await response.json();
        const imageGrid = document.getElementById('image-grid');

        data.forEach(image => {
            if (image.type === "file" && /\.(jpg|jpeg|png|gif|svg)$/i.test(image.name)) {
                const container = document.createElement('div');
                container.classList.add('image-container'); // Add this class
        
                const imgElement = document.createElement('img');
                imgElement.src = image.download_url;
                imgElement.alt = image.name;
        
                container.appendChild(imgElement);
                imageGrid.appendChild(container);
            }
        });
        
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchImages);
