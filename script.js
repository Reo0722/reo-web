// 効果音
const clickSound = new Audio('click.mp3');
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// ローディング制御
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    const container = document.querySelector('.main-container');
    container.classList.remove('hidden');

    // アニメーション開始（GSAP）
    gsap.from("#main-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.to(".card", {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });

    gsap.to(".btn", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });

  }, 1500); // ローディング待ち時間
});

// Three.js パーティクル背景（同じ）
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.Geometry();
for (let i = 0; i < 500; i++) {
  const x = (Math.random() - 0.5) * 100;
  const y = (Math.random() - 0.5) * 100;
  const z = (Math.random() - 0.5) * 100;
  particles.vertices.push(new THREE.Vector3(x, y, z));
}
const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.5 });
const pointCloud = new THREE.Points(particles, material);
scene.add(pointCloud);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  pointCloud.rotation.x += 0.0005;
  pointCloud.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
