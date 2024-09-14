document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const processButton = document.getElementById('processButton');
    const downloadButton = document.getElementById('downloadButton');
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    const fileNameDisplay = document.getElementById('fileName');

    let uploadedFileName = '';

    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            uploadedFileName = event.target.files[0].name;
            fileNameDisplay.textContent = uploadedFileName;
        } else {
            fileNameDisplay.textContent = '';
        }
    });

    processButton.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            uploadedFileName = file.name;
            processImage(file);
        } else {
            alert('Please select a file first.');
        }
    });

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `old_man_yells_at_${uploadedFileName}`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    function processImage(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const uploadedImg = new Image();
            uploadedImg.onload = function() {
                const yells = new Image();
                yells.onload = function() {
                    // Set canvas size
                    canvas.width = 400;
                    canvas.height = 300;

                    // Draw scaled yells.png to fill the canvas
                    ctx.drawImage(yells, 0, 0, canvas.width, canvas.height);

                    // Calculate dimensions for the uploaded image (35% of canvas height)
                    const uploadedImgHeight = canvas.height * 0.35;
                    const aspectRatio = uploadedImg.width / uploadedImg.height;
                    const uploadedImgWidth = uploadedImgHeight * aspectRatio;

                    // Calculate position for the uploaded image
                    const uploadedImgX = canvas.width * 0.05; // 5% from the left
                    const uploadedImgY = 0; // Top of the canvas

                    // Draw the uploaded image
                    ctx.drawImage(uploadedImg, uploadedImgX, uploadedImgY, uploadedImgWidth, uploadedImgHeight);

                    // Show the download button
                    downloadButton.style.display = 'block';
                };
                yells.src = 'yells.png'; // Make sure this path is correct
            };
            uploadedImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});