// © Macado.Net, 2023 
// Contact - support@macado.net

document.addEventListener("DOMContentLoaded", function() {
    const folderUrl = '/downloads/'; // This is the URL of the downloads folder
    let   extensions = new Set(); // Use a Set to store unique extensions
    const tablesdiv = document.getElementById("tablesdiv"); // Cache the DOM element

    // Loop through all the links and extract the file extensions        
    fetch(folderUrl)
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const links = doc.querySelectorAll('a');

        for (let i = 0; i < links.length; i++) {
            const extension = links[i].href.split('.').pop();
            
            if (extension && !extensions.has(extension) && !extension.includes("net/")) {
                extensions.add(extension);
            }
        }

        // Sort extensions set
        const tempArray = Array.from(extensions);
        tempArray.sort();
        extensions=new Set(tempArray);       

        // Create a table for each of the known extensions
        for (const extension of extensions) {
            const tablename = extension + 'table';
            tablesdiv.innerHTML += `
                <div>
                    <table id="${tablename}" class="center">
                        <caption class="tcaption">.${extension.toUpperCase()} Files</caption>
                    </table>
                </div><br>`;
        }

        // Loop through the links found and populate tables based on the file extensions in the links
        for (const link of links) {
            const filename = link.href.substring(link.href.lastIndexOf('/') + 1);
            const isFolder = link.textContent.endsWith('/');
            const extension = filename.split('.').pop();

            if (!isFolder && extensions.has(extension)) {
                const fileUrl = folderUrl + encodeURIComponent(filename);

                // Get the file size asynchronously
                fetch(fileUrl, { method: 'HEAD' })
                .then(response => {
                    const contentLength = response.headers.get('content-length');
                    const size = contentLength ? parseInt(contentLength, 10) : NaN;

                    let sizetext = '';
                    if (size < 1024) {
                        sizetext = size + " Bytes";
                    } else if (size < 1024 * 1024) {
                        sizetext = (size / 1024).toFixed(2) + " KB";
                    } else if (size < 1024 * 1024 * 1024) {
                        sizetext = (size / (1024 * 1024)).toFixed(2) + " MB";
                    } else {
                        sizetext = (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
                    }

                    // This is the HTML to be inserted whenever a DL button is needed
                    const dlbutton = `<a href="${fileUrl}"><img class="dlbutton"></a>`;
                    const linecode = `
                        <tr>
                            <td class="filecells" width="600px">${filename}</td>
                            <td class="sizecells" width="200px">${sizetext}</td>
                            <td class-"buttoncells">${dlbutton}</td>
                        </tr>`;
                    const tablename = extension + "table";
                    document.getElementById(tablename).innerHTML += linecode;
                })
                .catch(error => console.error(error));
            }
        }
    })
    .catch(error => console.error(error));
});
