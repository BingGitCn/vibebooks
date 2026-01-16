<template>
  <div class="killing-commendatore-world" ref="container">
    <!-- WebGL Canvas 由 Three.js 自动创建 -->

    <!-- UI 层 -->
    <transition name="fade">
      <div v-if="showText && currentPhaseText" class="phase-text">
        <p v-html="currentPhaseText"></p>
      </div>
    </transition>

    <!-- 点击提示 -->
    <transition name="fade">
      <div v-if="showClickHint" class="click-hint">
        <p>点击跳过 →</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// 容器引用
const container = ref(null)

// UI 状态
const showText = ref(false)
const showClickHint = ref(false)
const currentPhaseText = ref('')

// Three.js 核心对象
let scene = null
let camera = null
let renderer = null
let animationId = null

// 交互状态
const mouse = new THREE.Vector2()
const targetMouse = new THREE.Vector2()
let mouseSpeed = 0
let isMouseDown = false
let mouseDownTime = 0
let clickPositions = [] // 用于 Phase 6 的光痕

// Phase 管理
const phases = ['blank', 'chance', 'well', 'manifest', 'dual', 'kill', 'idea']
let currentPhase = 0
let phaseProgress = 0
let phaseStartTime = 0

// 粒子系统
let particles = null
let manifestationParticles = null // Phase 3 专用粒子
let particleCount = 10000

// 着色器材质
let gridMaterial = null
let wellMaterial = null
let dualWorldMaterial = null

// Phase 5: 杀死系统
let knightMesh = null
let isDissolving = false

// 文字配置
const phaseTexts = {
  blank: '有些东西<br>只有当你不再寻找时<br>才会出现',
  chance: '偶然<br>是必然的碎片',
  well: '井<br>通往另一个世界的入口',
  manifest: '意象<br>从画中走出',
  dual: '你站在<br>两个世界的中间',
  kill: '杀死<br>是另一种形式的记住',
  idea: '理念<br>就是那从天而降的东西'
}

// 初始化 Three.js 场景
const initThree = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 初始化各阶段
  initPhase0()
  initParticles()
  initPhase2()
  initPhase3()
  initPhase4()
  initPhase5()

  phaseStartTime = Date.now()
  transitionToPhase(0)
  animate()
}

// Phase 0: 空白的凝视
const initPhase0 = () => {
  const gridVertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseSpeed;

    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float dist = distance(uv, uMouse);
      float influence = smoothstep(0.5, 0.0, dist) * uMouseSpeed * 2.0;

      pos.z += sin(pos.x * 10.0 + uTime) * 0.02;
      pos.z += influence * 0.5 * sin(uTime * 3.0);
      pos.x += influence * 0.3;
      pos.y += influence * 0.3;

      vDisplacement = influence;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const gridFragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      float gridX = step(0.98, fract(vUv.x * 20.0));
      float gridY = step(0.98, fract(vUv.y * 20.0));
      float grid = max(gridX, gridY);

      vec3 color = mix(vec3(0.48, 0.29, 0.54), vec3(0.0, 0.0, 0.0), vDisplacement);
      color += grid * vec3(0.7, 0.7, 0.7) * (1.0 - vDisplacement);

      gl_FragColor = vec4(color, 1.0);
    }
  `

  gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseSpeed: { value: 0 }
    },
    vertexShader: gridVertexShader,
    fragmentShader: gridFragmentShader,
    transparent: true
  })

  const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)
  const mesh = new THREE.Mesh(geometry, gridMaterial)
  mesh.name = 'gridMesh'
  scene.add(mesh)
}

// Phase 1: 粒子系统
const initParticles = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const goldColor = new THREE.Color(0xd4af37)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = Math.random() * 10 + 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    velocities[i * 3] = 0
    velocities[i * 3 + 1] = -Math.random() * 0.02
    velocities[i * 3 + 2] = 0

    colors[i * 3] = goldColor.r
    colors[i * 3 + 1] = goldColor.g
    colors[i * 3 + 2] = goldColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geometry, material)
  particles.name = 'particles'
  particles.visible = false
  scene.add(particles)
}

// Phase 2: 井的显现
const initPhase2 = () => {
  const wellVertexShader = `
    uniform float uTime;
    uniform float uProgress;

    varying vec2 vUv;
    varying float vDepth;

    void main() {
      vUv = uv;
      vDepth = 0.0;
      vec3 pos = position;

      float angle = atan(pos.y, pos.x);
      float radius = length(pos.xy);
      angle += uTime * 0.5 * uProgress;

      pos.z = sin(radius * 3.0 - uTime * 2.0) * uProgress * 0.5;
      vDepth = pos.z;

      pos.x = cos(angle) * radius;
      pos.y = sin(angle) * radius;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const wellFragmentShader = `
    uniform float uTime;
    uniform float uProgress;

    varying vec2 vUv;
    varying float vDepth;

    void main() {
      vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.48, 0.29, 0.54), vDepth * 0.5 + 0.5);
      float dist = length(vUv - 0.5);
      float glow = smoothstep(0.5, 0.3, dist);
      color += glow * vec3(0.83, 0.69, 0.22) * uProgress * 0.5;
      float alpha = smoothstep(0.0, 0.3, uProgress) * (1.0 - smoothstep(0.3, 0.5, dist));

      gl_FragColor = vec4(color, alpha);
    }
  `

  wellMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 }
    },
    vertexShader: wellVertexShader,
    fragmentShader: wellFragmentShader,
    transparent: true,
    side: THREE.DoubleSide
  })

  const geometry = new THREE.CircleGeometry(2, 64)
  const well = new THREE.Mesh(geometry, wellMaterial)
  well.name = 'well'
  well.rotation.x = -Math.PI / 2
  well.position.z = -1
  well.visible = false
  scene.add(well)
}

// Phase 3: 显形 - 粒子聚合
const initPhase3 = () => {
  // 创建人形目标位置的粒子
  const manifestCount = 5000
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(manifestCount * 3)
  const targetPositions = new Float32Array(manifestCount * 3)
  const colors = new Float32Array(manifestCount * 3)

  // 生成人形轮廓（简化版）
  for (let i = 0; i < manifestCount; i++) {
    // 随机起始位置
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    // 人形目标位置（两米高的轮廓）
    const t = i / manifestCount
    const section = Math.floor(t * 5) // 头、躯干、左臂、右臂、腿

    let tx = 0, ty = 0, tz = 0

    switch(section) {
      case 0: // 头
        tx = (Math.random() - 0.5) * 0.5
        ty = 1.5 + Math.random() * 0.5
        tz = (Math.random() - 0.5) * 0.3
        break
      case 1: // 躯干
        tx = (Math.random() - 0.5) * 0.6
        ty = 0.5 + Math.random() * 1.0
        tz = (Math.random() - 0.5) * 0.4
        break
      case 2: // 左臂
        tx = -0.8 - Math.random() * 0.3
        ty = 0.2 + Math.random() * 0.8
        tz = (Math.random() - 0.5) * 0.2
        break
      case 3: // 右臂
        tx = 0.8 + Math.random() * 0.3
        ty = 0.2 + Math.random() * 0.8
        tz = (Math.random() - 0.5) * 0.2
        break
      case 4: // 腿
        tx = (Math.random() - 0.5) * 0.4
        ty = -1.5 - Math.random() * 0.5
        tz = (Math.random() - 0.5) * 0.3
        break
    }

    targetPositions[i * 3] = tx
    targetPositions[i * 3 + 1] = ty
    targetPositions[i * 3 + 2] = tz

    // 紫色到金色渐变
    const mixFactor = Math.random()
    colors[i * 3] = 0.48 + mixFactor * (0.83 - 0.48)
    colors[i * 3 + 1] = 0.29 + mixFactor * (0.69 - 0.29)
    colors[i * 3 + 2] = 0.54 + mixFactor * (0.22 - 0.54)
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  })

  manifestationParticles = new THREE.Points(geometry, material)
  manifestationParticles.name = 'manifestation'
  manifestationParticles.visible = false
  scene.add(manifestationParticles)
}

// Phase 4: 双重世界
const initPhase4 = () => {
  const dualVertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const dualFragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uProgress;

    varying vec2 vUv;

    // 简化的 metaball 函数
    float metaball(vec2 p1, vec2 p2, float r1, float r2) {
      float d = length(p1 - p2);
      return r1 * r2 / max(d, 0.001);
    }

    void main() {
      vec2 uv = vUv;

      // 左右分界线（受鼠标影响）
      float divide = 0.5 + sin(uTime * 0.5) * 0.05 + (uMouse.x - 0.5) * 0.2;

      // 两个世界的颜色
      vec3 leftColor = vec3(0.48, 0.29, 0.54); // 紫色
      vec3 rightColor = vec3(0.83, 0.69, 0.22); // 金色

      // 创建液体边界
      float dist = distance(uv, vec2(divide, 0.5));
      float boundary = smoothstep(0.15, 0.1, dist);

      // 混合颜色
      vec3 color = mix(leftColor, rightColor, uv.x);
      color = mix(color, vec3(1.0), boundary * 0.3 * sin(uTime * 3.0));

      gl_FragColor = vec4(color, 1.0);
    }
  `

  dualWorldMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 }
    },
    vertexShader: dualVertexShader,
    fragmentShader: dualFragmentShader
  })

  const geometry = new THREE.PlaneGeometry(10, 10)
  const dualMesh = new THREE.Mesh(geometry, dualWorldMaterial)
  dualMesh.name = 'dualWorld'
  dualMesh.visible = false
  scene.add(dualMesh)
}

// Phase 5: 杀死 - 瓦解系统
const initPhase5 = () => {
  // 创建一个代表"骑士团长"的几何体
  const geometry = new THREE.BoxGeometry(1, 2, 0.5)
  const material = new THREE.MeshBasicMaterial({
    color: 0x7b4b8a,
    wireframe: true,
    transparent: true,
    opacity: 0
  })

  knightMesh = new THREE.Mesh(geometry, material)
  knightMesh.name = 'knight'
  knightMesh.visible = false
  scene.add(knightMesh)
}

// 更新网格
const updateGrid = (time) => {
  if (gridMaterial) {
    mouse.lerp(targetMouse, 0.05)
    gridMaterial.uniforms.uTime.value = time
    gridMaterial.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5)
    gridMaterial.uniforms.uMouseSpeed.value = mouseSpeed
  }
  mouseSpeed *= 0.95
}

// 更新粒子
const updateParticles = () => {
  if (!particles || !particles.visible) return

  const positions = particles.geometry.attributes.position.array
  const velocities = particles.geometry.attributes.velocity.array

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += velocities[i * 3]
    positions[i * 3 + 1] += velocities[i * 3 + 1]
    positions[i * 3 + 2] += velocities[i * 3 + 2]

    if (positions[i * 3 + 1] < -10) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
  }

  particles.geometry.attributes.position.needsUpdate = true
}

// 更新井
const updateWell = (time) => {
  const well = scene.getObjectByName('well')
  if (well && well.visible) {
    wellMaterial.uniforms.uTime.value = time
    const distToCenter = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
    wellMaterial.uniforms.uProgress.value = 1.0 - Math.min(distToCenter, 1.0) * 0.5
  }
}

// 更新显形（Phase 3）
const updateManifestation = () => {
  if (!manifestationParticles || !manifestationParticles.visible) return

  const positions = manifestationParticles.geometry.attributes.position.array
  const targetPositions = manifestationParticles.geometry.attributes.targetPosition.array
  const progress = phaseProgress

  // 粒子从随机位置聚合到目标位置
  for (let i = 0; i < 5000; i++) {
    const lerpFactor = Math.min(progress * 2, 1)

    positions[i * 3] += (targetPositions[i * 3] - positions[i * 3]) * 0.02 * lerpFactor
    positions[i * 3 + 1] += (targetPositions[i * 3 + 1] - positions[i * 3 + 1]) * 0.02 * lerpFactor
    positions[i * 3 + 2] += (targetPositions[i * 3 + 2] - positions[i * 3 + 2]) * 0.02 * lerpFactor

    // 添加轻微震动
    if (progress > 0.5) {
      positions[i * 3] += (Math.random() - 0.5) * 0.01
      positions[i * 3 + 1] += (Math.random() - 0.5) * 0.01
      positions[i * 3 + 2] += (Math.random() - 0.5) * 0.01
    }
  }

  manifestationParticles.geometry.attributes.position.needsUpdate = true
  manifestationParticles.material.opacity = Math.min(progress * 2, 1)
}

// 更新双重世界（Phase 4）
const updateDualWorld = (time) => {
  const dualMesh = scene.getObjectByName('dualWorld')
  if (dualMesh && dualMesh.visible) {
    dualWorldMaterial.uniforms.uTime.value = time
    dualWorldMaterial.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5)
    dualWorldMaterial.uniforms.uProgress.value = phaseProgress
  }
}

// 更新杀死（Phase 5）
const updateKill = () => {
  if (!knightMesh || !knightMesh.visible) return

  // 显示骑士
  if (phaseProgress < 0.3) {
    knightMesh.material.opacity = phaseProgress / 0.3
    knightMesh.rotation.y += 0.01
  } else if (isDissolving) {
    // 瓦解效果
    const dissolveProgress = (phaseProgress - 0.3) / 0.7
    knightMesh.material.opacity = 1 - dissolveProgress
    knightMesh.scale.setScalar(1 + dissolveProgress * 0.5)
    knightMesh.rotation.x += dissolveProgress * 0.1
    knightMesh.rotation.z += dissolveProgress * 0.05
  }
}

// 更新理念降落（Phase 6）
const updateIdea = (time) => {
  if (!particles || !particles.visible) return

  // 粒子变成金色雨
  particles.material.opacity = 1

  // 绘制光痕
  clickPositions.forEach(pos => {
    pos.life -= 0.002
  })

  clickPositions = clickPositions.filter(pos => pos.life > 0)
}

// Phase 切换
const transitionToPhase = (phaseIndex) => {
  currentPhase = phaseIndex
  phaseProgress = 0
  phaseStartTime = Date.now()

  const grid = scene.getObjectByName('gridMesh')
  const well = scene.getObjectByName('well')
  const dual = scene.getObjectByName('dualWorld')
  const knight = scene.getObjectByName('knight')

  // 隐藏所有
  if (grid) grid.visible = false
  if (well) well.visible = false
  if (particles) particles.visible = false
  if (manifestationParticles) manifestationParticles.visible = false
  if (dual) dual.visible = false
  if (knight) knight.visible = false

  // 显示当前阶段
  switch (phaseIndex) {
    case 0: // blank
      if (grid) grid.visible = true
      scene.background = new THREE.Color(0xffffff)
      break
    case 1: // chance
      if (particles) {
        particles.visible = true
        particles.material.opacity = 0
      }
      scene.background = new THREE.Color(0x1a1a2e)
      break
    case 2: // well
      if (well) well.visible = true
      scene.background = new THREE.Color(0x0d0d1a)
      break
    case 3: // manifest
      if (manifestationParticles) {
        manifestationParticles.visible = true
        manifestationParticles.material.opacity = 0
      }
      scene.background = new THREE.Color(0x0d0d1a)
      break
    case 4: // dual
      if (dual) dual.visible = true
      scene.background = new THREE.Color(0x000000)
      break
    case 5: // kill
      if (knight) {
        knight.visible = true
        knight.material.opacity = 0
      }
      isDissolving = false
      scene.background = new THREE.Color(0x1a1a2e)
      break
    case 6: // idea
      if (particles) {
        particles.visible = true
        particles.material.opacity = 1
      }
      scene.background = new THREE.Color(0x0d0d1a)
      break
  }

  // 更新文字
  currentPhaseText.value = phaseTexts[phases[phaseIndex]]
  showText.value = true
  setTimeout(() => {
    showText.value = false
  }, 4000)
}

// Phase 管理器
const updatePhaseManager = () => {
  const elapsed = Date.now() - phaseStartTime
  phaseProgress = Math.min(elapsed / 10000, 1) // 10秒每个阶段

  // 显示点击提示
  if (phaseProgress > 0.3 && !showClickHint.value) {
    showClickHint.value = true
  }

  // 阶段5特殊处理：点击触发瓦解
  if (currentPhase === 5 && phaseProgress > 0.5 && !isDissolving) {
    // 自动开始瓦解
    isDissolving = true
  }

  // 自动切换
  if (phaseProgress >= 1) {
    showClickHint.value = false
    currentPhase = (currentPhase + 1) % phases.length
    transitionToPhase(currentPhase)
  }
}

// 主动画循环
const clock = new THREE.Clock()

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()
  const deltaTime = clock.getDelta()

  // 更新当前阶段
  updateGrid(time)
  updateParticles()
  updateWell(time)
  updateManifestation()
  updateDualWorld(time)
  updateKill()
  updateIdea(time)

  // Phase 管理
  updatePhaseManager()

  renderer.render(scene, camera)
}

// 事件处理
const onMouseMove = (event) => {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  const deltaX = targetMouse.x - mouse.x
  const deltaY = targetMouse.y - mouse.y
  mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  // Phase 6: 记录光痕
  if (currentPhase === 6) {
    clickPositions.push({
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
      life: 1.0,
      time: Date.now()
    })
  }
}

const onMouseDown = () => {
  isMouseDown = true
  mouseDownTime = Date.now()
}

const onMouseUp = () => {
  isMouseDown = false

  // 短按点击：跳过当前阶段
  if (Date.now() - mouseDownTime < 300) {
    if (currentPhase === 5 && phaseProgress > 0.3) {
      isDissolving = true
    } else {
      phaseProgress = 1 // 立即结束当前阶段
    }
  }
}

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  initThree()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('resize', onResize)

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.killing-commendatore-world {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #ffffff;
}

.killing-commendatore-world canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.phase-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  pointer-events: none;
}

.phase-text p {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.3em;
  line-height: 2;
}

.click-hint {
  position: absolute;
  bottom: 10%;
  right: 5%;
  z-index: 5;
}

.click-hint p {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.2em;
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .phase-text p {
    letter-spacing: 0.15em;
  }
}
</style>
