const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let noBtnText = 0;
const texts = [
    "ลองคิดใหม่อีกทีสิครับ",
    "ก็แค่ขอของขวัญเองง่ะ",
    "ไม่ได้จริงๆ หรอครับ",
    "ใจร้ายจัง",
    "ขอสักครั้งเถอะนะ",
    "ไม่ยอมแพ้ง่ายๆ หรอก",
    "ขออีกครั้งนะครับ",
    "พี่ๆ ครับ นะครับ",
    "ใจดีหน่อยสิครับ",
    "ขอร้องล่ะ"
];

let scale = 1;

noBtn.addEventListener('click', () => {
    // เปลี่ยนข้อความปุ่ม No
    noBtn.textContent = texts[noBtnText % texts.length];
    noBtnText++;
    
    // ขยายปุ่ม Yes
    scale += 0.5;
    yesBtn.style.transform = `scale(${scale})`;
    
    // ปรับขนาดฟอนต์ตามสัดส่วน
    yesBtn.style.fontSize = `${1.2 * scale}em`;
    
    // ถ้าปุ่มใหญ่พอแล้ว ให้ซ่อนปุ่ม No
    if (scale >= 3) {
        noBtn.style.display = 'none';
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '50%';
        yesBtn.style.left = '50%';
        yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
});

yesBtn.addEventListener('click', () => {
    // ซ่อนปุ่มทั้งหมด
    document.querySelector('.button-container').style.display = 'none';
    document.querySelector('.question').style.display = 'none';
    
    // เปลี่ยน gif
    const gifContainer = document.querySelector('.gif-container');
    const gifImage = gifContainer.querySelector('img');
    gifImage.src = 'valentine2.gif';
    
    // แสดงข้อความขอบคุณ
    const thankYou = document.createElement('h1');
    thankYou.textContent = "ขอบคุณที่ตอบตกลงครับ ♥";
    thankYou.style.color = '#d52d58';
    thankYou.style.fontSize = '3em';
    thankYou.style.textAlign = 'center';
    thankYou.style.marginTop = '20px';
    thankYou.style.fontFamily = 'Prompt, sans-serif';
    thankYou.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
    
    // เพิ่มการเคลื่อนไหวให้ข้อความ
    thankYou.style.animation = 'fadeIn 1s ease-in-out';
    document.querySelector('.content-wrapper').appendChild(thankYou);
});

// เพิ่ม keyframes animation สำหรับ fade in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);