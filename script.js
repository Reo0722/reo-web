// ローディング画面制御
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.querySelector('.main-container').classList.remove('hidden');
  }, 1500); // 1.5秒後にロード完了
});

// 音を再生
const clickSound = new Audio('click.mp3');
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Three.js パーティクル背景
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// パーティクル
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

// リサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
