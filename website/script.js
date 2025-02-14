/* filepath: /c:/Users/AVS_KTB/Desktop/flowerforpeeyok/website/script.js */
let clickCount = 0;

function fallPetal(petal) {
    // เพิ่มจำนวนครั้งที่คลิก
    clickCount++;
    document.getElementById('counter').textContent = clickCount;

    // โค้ดเดิมสำหรับเอฟเฟกต์ดอกไม้ร่วง
    const fallingPetal = petal.cloneNode(true);
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const petalRect = petal.getBoundingClientRect();
    
    // copy styles from original petal
    const styles = window.getComputedStyle(petal);
    fallingPetal.style.width = styles.width;
    fallingPetal.style.height = styles.height;
    fallingPetal.style.backgroundColor = styles.backgroundColor;
    fallingPetal.style.borderRadius = styles.borderRadius;
    
    // set position relative to container
    fallingPetal.style.position = 'absolute';
    fallingPetal.style.left = (petalRect.left - containerRect.left) + 'px';
    fallingPetal.style.top = (petalRect.top - containerRect.top) + 'px';
    
    // add falling animation
    fallingPetal.style.animation = 'fall 1.5s ease-in-out forwards';
    fallingPetal.style.pointerEvents = 'none';
    
    // add to container and remove after animation
    document.querySelector('.container').appendChild(fallingPetal);
    setTimeout(() => fallingPetal.remove(), 1500);
}

