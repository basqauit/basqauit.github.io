document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const githubApiUrl = "https://api.github.com/repos/basqauit/basqauit.github.io/contents/posts";
    fetch(githubApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch file list: ${response.statusText}`);
        }
        return response.json();
      })
      .then(files => {
        const txtFiles = files
          .filter(file => file.type === "file" && file.name.endsWith(".txt"))
          .map(file => ({
            name: file.name,
            rawUrl: file.download_url,
          }));
        txtFiles.forEach(file => {
          fetch(file.rawUrl)
            .then(fileResponse => {
              if (!fileResponse.ok) {
                throw new Error(`Failed to fetch ${file.name}: ${fileResponse.statusText}`);
              }
              return fileResponse.text();
            })
            .then(content => {
              const fileBox = document.createElement("div");
              fileBox.className = "file-box";
  
              const fileText = document.createElement("p");
              fileText.textContent = content;
              fileBox.appendChild(fileText);
  
              const fileNameElement = document.createElement("div");
              fileNameElement.className = "file-name";
              fileNameElement.textContent = file.name.replace(".txt", "");
              fileBox.appendChild(fileNameElement);
  
              container.appendChild(fileBox);
            })
            .catch(error => console.error(`Error loading file ${file.name}: ${error.message}`));
        });
      })
      .catch(error => console.error(`Error fetching file list: ${error.message}`));
  });
  