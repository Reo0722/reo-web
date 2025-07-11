// 1. シーン作成
const scene = new THREE.Scene();

// 2. カメラ作成（視点）
const camera = new THREE.PerspectiveCamera(
  75,                      // 視野角
  window.innerWidth/window.innerHeight, // アスペクト比
  0.1,                     // ニアクリップ
  1000                     // ファークリップ
);

// 3. レンダラー作成（描画処理）
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bgCanvas'),
  alpha: true  // 背景透明にしたいとき
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. ジオメトリ作成（立方体）
const geometry = new THREE.BoxGeometry(10, 10, 10);

// 5. マテリアル作成（色つき）
const material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});

// 6. メッシュ作成（形状＋材質）
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 7. カメラ位置調整
camera.position.z = 30;

// 8. アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  // 立方体をゆっくり回す
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // レンダリング
  renderer.render(scene, camera);
}
animate();

// 9. ウィンドウサイズ変更対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
