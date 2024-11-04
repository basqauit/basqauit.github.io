const repoURL = "https://api.github.com/repos/basqauit/basqauit.github.io/contents/images";

async function fetchImages() {
    try {
        const response = await fetch(repoURL);
        const data = await response.json();
        const imageGrid = document.getElementById('image-grid');

        data.forEach(image => {
            if (image.type === "file" && /\.(jpg|jpeg|png|gif|svg)$/i.test(image.name)) {
                const imgElement = document.createElement('img');
                imgElement.src = image.download_url;
                imgElement.alt = image.name;
                imageGrid.appendChild(imgElement);
            }
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

window.onload = fetchImages;
