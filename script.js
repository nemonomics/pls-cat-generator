window.onload = function() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const backgroundUpload = document.getElementById('backgroundUpload');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const catImg = new Image();
    catImg.src = 'pls-cat-transparent.png'; // Replace with your transparent cat image URL

    let backgroundImg = new Image();
    let uploadedImg = new Image();
    let isDraggingCat = false;
    let catX = canvas.width / 2 - 150; // Adjusted for larger cat image
    let catY = canvas.height / 2 - 150; // Adjusted for larger cat image
    let uploadedImgX = canvas.width / 4;
    let uploadedImgY = canvas.height / 4;
    let offsetX, offsetY;
    const catWidth = 300; // Increased cat image width
    const catHeight = 300; // Increased cat image height

    catImg.onload = () => {
        drawCanvas();
    };

    canvas.addEventListener('mousedown', (e) => {
        if (isOverCat(e.offsetX, e.offsetY)) {
            isDraggingCat = true;
            offsetX = e.offsetX - catX;
            offsetY = e.offsetY - catY;
        } else if (isOverUploadedImg(e.offsetX, e.offsetY)) {
            isDraggingEntity = true;
            offsetX = e.offsetX - uploadedImgX;
            offsetY = e.offsetY - uploadedImgY;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDraggingCat) {
            catX = e.offsetX - offsetX;
            catY = e.offsetY - offsetY;
            drawCanvas();
        } else if (isDraggingEntity) {
            uploadedImgX = e.offsetX - offsetX;
            uploadedImgY = e.offsetY - offsetY;
            drawCanvas();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDraggingCat = false;
        isDraggingEntity = false;
    });

    backgroundUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                backgroundImg.src = event.target.result;
                backgroundImg.onload = () => {
                    drawCanvas();
                };
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener('click', () => {
        backgroundImg.src = '';
        uploadedImg.src = '';
        drawCanvas();
    });

    downloadBtn.addEventListener('click', () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'meme.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (backgroundImg.src) {
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(catImg, catX, catY, catWidth, catHeight);

        if (uploadedImg.src) {
            ctx.drawImage(uploadedImg, uploadedImgX, uploadedImgY, uploadedImg.width, uploadedImg.height);
        }
    }

    function isOverCat(x, y) {
        return x > catX && x < catX + catWidth && y > catY && y < catY + catHeight;
    }

    function isOverUploadedImg(x, y) {
        return x > uploadedImgX && x < uploadedImgX + uploadedImg.width && y > uploadedImgY && y < uploadedImgY + uploadedImg.height;
    }
};
