const canvas = document.getElementById("scratchCard");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// พื้นปิด
ctx.fillStyle = "pink";
ctx.fillRect(0, 0, 400, 400);

let isDone = false;
let isDrawing = false;

// ===== คอม =====
canvas.addEventListener("mousedown", () => {
    isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    scratch(e.offsetX, e.offsetY);
});

// ===== มือถือ =====
canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    scratchTouch(e);
});

canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    scratchTouch(e);
});

canvas.addEventListener("touchend", () => {
    isDrawing = false;
});

// ฟังก์ชันขูด
function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    checkScratch();
}

// สำหรับมือถือ
function scratchTouch(e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    scratch(x, y);
}

// เช็คเปอร์เซ็นต์
function checkScratch() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
    }

    const percent = (transparent / (canvas.width * canvas.height)) * 100;

    if (percent > 70 && !isDone) {
        isDone = true;

        setTimeout(() => {
            window.location.href = "password.html";
        }, 500);
    }
}
