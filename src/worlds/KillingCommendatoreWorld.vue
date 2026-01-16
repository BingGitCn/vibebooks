<template>
  <div class="killing-commendatore-world" ref="container">
    <!-- WebGL Canvas 由 Three.js 自动创建 -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// 容器引用
const container = ref(null)

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

// Phase 管理
const phases = ['blank', 'chance', 'well', 'manifest', 'dual', 'kill', 'idea']
let currentPhase = 0
let phaseProgress = 0

// 粒子系统
let particles = null
let particleCount = 10000

// 着色器材质
let gridMaterial = null
let wellMaterial = null

// Post-processing
let composer = null

// 初始化 Three.js 场景
const initThree = () => {
  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  scene.fog = new THREE.FogExp2(0xffffff, 0.001)

  // 相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // 渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.value.appendChild(renderer.domElement)

  // 初始化各阶段的对象
  initPhase0()
  initParticles()
  initPhase2()

  // 开始动画循环
  animate()
}

// Phase 0: 空白的凝视 - 网格系统
const initPhase0 = () => {
  // 创建自定义 shader 材质
  const gridVertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseSpeed;

    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vUv = uv;

      vec3 pos = position;

      // 计算到鼠标的距离
      float dist = distance(uv, uMouse);
      float influence = smoothstep(0.5, 0.0, dist) * uMouseSpeed * 2.0;

      // 网格变形
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
      // 创建网格线
      float gridX = step(0.98, fract(vUv.x * 20.0));
      float gridY = step(0.98, fract(vUv.y * 20.0));
      float grid = max(gridX, gridY);

      // 颜色变化（紫色到黑色）
      vec3 color = mix(
        vec3(0.48, 0.29, 0.54), // 紫色 #7b4b8a
        vec3(0.0, 0.0, 0.0),     // 黑色
        vDisplacement
      );

      // 网格线颜色
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

  // 创建平面几何体
  const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)
  const mesh = new THREE.Mesh(geometry, gridMaterial)
  mesh.name = 'gridMesh'
  scene.add(mesh)
}

// 初始化粒子系统
const initParticles = () => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const goldColor = new THREE.Color(0xd4af37)

  for (let i = 0; i < particleCount; i++) {
    // 初始位置（屏幕上方）
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = Math.random() * 10 + 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10

    // 初始速度
    velocities[i * 3] = 0
    velocities[i * 3 + 1] = -Math.random() * 0.02
    velocities[i * 3 + 2] = 0

    // 颜色（金色）
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

      // 旋转效果
      float angle = atan(pos.y, pos.x);
      float radius = length(pos.xy);
      angle += uTime * 0.5 * uProgress;

      // 井的深度效果
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
      // 黑色到深紫色的渐变
      vec3 color = mix(
        vec3(0.0, 0.0, 0.0),
        vec3(0.48, 0.29, 0.54),
        vDepth * 0.5 + 0.5
      );

      // 边缘发光
      float dist = length(vUv - 0.5);
      float glow = smoothstep(0.5, 0.3, dist);
      color += glow * vec3(0.83, 0.69, 0.22) * uProgress * 0.5;

      // 透明度
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

// 更新网格变形
const updateGrid = (time, deltaTime) => {
  if (gridMaterial) {
    // 平滑鼠标移动
    mouse.lerp(targetMouse, 0.05)

    // 更新 uniform
    gridMaterial.uniforms.uTime.value = time
    gridMaterial.uniforms.uMouse.value.set(
      mouse.x * 0.5 + 0.5,
      mouse.y * 0.5 + 0.5
    )
    gridMaterial.uniforms.uMouseSpeed.value = mouseSpeed
  }

  // 鼠标速度衰减
  mouseSpeed *= 0.95
}

// 更新粒子系统
const updateParticles = (deltaTime) => {
  if (!particles || !particles.visible) return

  const positions = particles.geometry.attributes.position.array
  const velocities = particles.geometry.attributes.velocity.array

  for (let i = 0; i < particleCount; i++) {
    // 更新位置
    positions[i * 3] += velocities[i * 3]
    positions[i * 3 + 1] += velocities[i * 3 + 1]
    positions[i * 3 + 2] += velocities[i * 3 + 2]

    // 重置落到屏幕外的粒子
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

    // 根据鼠标位置调整旋转速度
    const distToCenter = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
    wellMaterial.uniforms.uProgress.value = 1.0 - Math.min(distToCenter, 1.0) * 0.5
  }
}

// Phase 管理器
const updatePhase = (deltaTime) => {
  phaseProgress += deltaTime * 0.1 // 每10秒自动切换

  if (phaseProgress >= 1) {
    phaseProgress = 0
    currentPhase = (currentPhase + 1) % phases.length
    transitionToPhase(currentPhase)
  }
}

// 切换到指定 Phase
const transitionToPhase = (phaseIndex) => {
  const grid = scene.getObjectByName('gridMesh')
  const well = scene.getObjectByName('well')

  // 隐藏所有对象
  if (grid) grid.visible = false
  if (well) well.visible = false
  if (particles) particles.visible = false

  // 根据阶段显示对应对象
  switch (phaseIndex) {
    case 0: // blank
      if (grid) grid.visible = true
      scene.background = new THREE.Color(0xffffff)
      break
    case 1: // chance
      if (particles) {
        particles.visible = true
        particles.material.opacity = 1
      }
      scene.background = new THREE.Color(0x1a1a2e)
      break
    case 2: // well
      if (well) well.visible = true
      scene.background = new THREE.Color(0x0d0d1a)
      break
  }
}

// 主动画循环
const clock = new THREE.Clock()
let lastTime = 0

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()
  const deltaTime = clock.getDelta()

  // 更新交互
  updateGrid(time, deltaTime)

  // 更新粒子
  updateParticles(deltaTime)

  // 更新井
  updateWell(time)

  // Phase 管理
  updatePhase(deltaTime)

  // 渲染
  renderer.render(scene, camera)
}

// 事件处理
const onMouseMove = (event) => {
  // 归一化鼠标坐标 (-1 到 1)
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 计算鼠标速度
  const deltaX = targetMouse.x - mouse.x
  const deltaY = targetMouse.y - mouse.y
  mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

const onMouseDown = () => {
  isMouseDown = true
  mouseDownTime = Date.now()

  // 检测是否长按（进入井）
  setTimeout(() => {
    if (isMouseDown && Date.now() - mouseDownTime > 1000) {
      // 长按触发特殊效果
      console.log('进入井中...')
    }
  }, 1000)
}

const onMouseUp = () => {
  isMouseDown = false

  // 短按点击
  if (Date.now() - mouseDownTime < 200) {
    // 点击跳过当前阶段
    phaseProgress = 1
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

  // 初始进入第一个阶段
  transitionToPhase(0)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('resize', onResize)

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // 清理 Three.js 资源
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
</style>
