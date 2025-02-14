/* filepath: /c:/Users/AVS_KTB/Desktop/flowerforpeeyok/website/script.js */
const blingSound = new Audio('bling.mp3');

let clickCount = 0;
let isFirstClick = true;
const messages = [
    "พี่หยกเก่งที่สุด เก่งมาก ๆ",
    "พี่หยกน่ารักมาก",
    "ให้กำลังใจเสมอนะ",
    "สุขสันต์วันวาเลนไทน์",
    "อยากให้พี่หยกหายเหนื่อย",
    "ขอให้พี่หยกสุขภาพกายและใจดีเยี่ยม",
    "มีแต่สิ่งดี ๆ เข้ามานะครับ",
    "พักผ่อนนอนเยอะ ๆ นะพี่หยก",
    "พี่หยกสวยจริงจัง"
];

// เพิ่มฟังก์ชันป้องกันการซูม
function preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // ไม่ทำอะไรถ้าใช้หลายนิ้วหรือระยะห่างเวลามากเกินไป

    e.preventDefault();
    e.target.click();
}

// เพิ่ม touch event listeners
document.addEventListener('DOMContentLoaded', function() {
    const petals = document.querySelectorAll('.rose-petals > div');
    petals.forEach(petal => {
        petal.addEventListener('touchstart', preventZoom, false);
    });
});

function fallPetal(petal) {
    // ป้องกันการทำงานซ้ำถ้าเป็น touch event
    if (petal.dataset.processing) return;
    petal.dataset.processing = true;
    
    // ตรวจสอบว่าเป็นดอกที่ร่วงอยู่แล้วหรือไม่
    const petalRect = petal.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const containerMiddleY = containerRect.top + (containerRect.height / 2);

    // ถ้าดอกอยู่ต่ำกว่าครึ่งของ container ให้ไม่ทำงาน
    if (petalRect.top > containerMiddleY) {
        return;
    }

    // เล่นเสียง
    blingSound.currentTime = 0; // รีเซ็ตเสียงให้เริ่มใหม่ทุกครั้ง
    blingSound.play();

    // เพิ่มจำนวนครั้งที่คลิก
    clickCount++;
    
    // ถ้าเป็นการคลิกครั้งแรก แสดง counter
    if (isFirstClick) {
        const counter = document.querySelector('.click-counter');
        counter.style.opacity = '1';
        isFirstClick = false;
    }

    // อัพเดทตัวเลขและข้อความ
    document.getElementById('counter').textContent = clickCount;
    document.querySelector('.counter-text').textContent = 'ค่าความปราถนาตอนนี้คือ';

    // สร้างข้อความเด้ง
    createFloatingMessage(event);

    // สร้างดอกไม้ที่ร่วง
    const fallingPetal = petal.cloneNode(true);
    const styles = window.getComputedStyle(petal);
    
    fallingPetal.style.width = styles.width;
    fallingPetal.style.height = styles.height;
    fallingPetal.style.backgroundColor = styles.backgroundColor;
    fallingPetal.style.borderRadius = styles.borderRadius;
    
    fallingPetal.style.position = 'absolute';
    fallingPetal.style.left = (petalRect.left - containerRect.left) + 'px';
    fallingPetal.style.top = (petalRect.top - containerRect.top) + 'px';
    
    fallingPetal.style.animation = 'fall 1.5s ease-in-out forwards';
    fallingPetal.style.pointerEvents = 'none'; // ป้องกันการคลิกซ้ำ
    
    document.querySelector('.container').appendChild(fallingPetal);
    setTimeout(() => fallingPetal.remove(), 1500);

    setTimeout(() => {
        delete petal.dataset.processing;
    }, 100);
}

// แก้ไขฟังก์ชัน createFloatingMessage ใน script.js
function createFloatingMessage(event) {
    const message = document.createElement('div');
    message.className = 'floating-message';
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    // สุ่มตำแหน่งข้อความในพื้นที่หน้าจอที่มองเห็น
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // ตำแหน่งเริ่มต้นจะอยู่ที่ด้านล่างของหน้าจอ
    const startX = Math.random() * (viewportWidth - 200); // ลบ 200 เพื่อป้องกันข้อความเกินขอบ
    const startY = viewportHeight - 100; // เริ่มจากด้านล่าง 100px
    
    message.style.position = 'fixed';
    message.style.left = `${startX}px`;
    message.style.top = `${startY}px`;
    
    document.body.appendChild(message);
    
    // ลบข้อความหลังจากแอนิเมชันจบ
    setTimeout(() => message.remove(), 1500);
}

// เพิ่มฟังก์ชันใหม่
document.querySelector('.secret-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('warningModal').style.display = 'block';
});

function closeModal() {
    document.getElementById('warningModal').style.display = 'none';
}

function goToSecret() {
    window.location.href = 'secret.html';
}

// เมื่อคลิกนอก modal ให้ปิด
window.onclick = function(event) {
    let modal = document.getElementById('warningModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

