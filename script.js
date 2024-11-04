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
async function fetchRandomPoetry() {
    try {
        const response = await fetch('https://poetrydb.org/random');
        const data = await response.json();
        const poetryText = data[0].lines.join(' / ');
        const poetryTextElement = document.getElementById('poem');
        poetryTextElement.innerText = str.toUpperCase(poetryText);
        const textLength = poetryText.length;
        console.log("Poem of length "  + textLength +" loaded:\n:" + poetryText)
        const scrollDuration = Math.max(10, textLength / 20); 
        poetryTextElement.style.animationDuration = `${scrollDuration}s`;
    } catch (error) {
        console.error("Error fetching poetry:", error);
        document.getElementById('poem').innerText = "Failed to fetch poetry.";
    }
}

document.addEventListener('DOMContentLoaded', fetchImages);
window.onload = fetchRandomPoetry;
