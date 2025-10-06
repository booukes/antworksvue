<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HomeHeaderText from "../atoms/HomeHeaderText.vue";

const cardEl = ref<HTMLElement | null>(null)

const rotateX = ref(0)
const rotateY = ref(0)
const isTransitionEnabled = ref(true)

const cardTransform = computed(() => {
  return `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
})

function handleMouseMove(event: MouseEvent) {
  if (!cardEl.value) return

  const maxRotate = 6

  const rect = cardEl.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = event.clientX
  const mouseY = event.clientY

  rotateY.value = ((mouseX - centerX) / (rect.width / 2)) * maxRotate
  rotateX.value = -((mouseY - centerY) / (rect.height / 2)) * maxRotate
}

function handleMouseLeave() {
  isTransitionEnabled.value = true
  rotateX.value = 0
  rotateY.value = 0
}


// Attach global mouse listener
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseout', handleMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseout', handleMouseLeave)
})
</script>

<template class="overflow-hidden">
  <div
      class="flex items-center justify-center h-screen wrapper"
      style="perspective: 500px;"

  >
    <div
        ref="cardEl"
        :style="{
        transform: cardTransform,
        transition: isTransitionEnabled ? 'transform 0.35s ease-out' : 'none'
      }"
        class="flex justify-center bg-neutral-900/20 backdrop-blur-2xl rounded-3xl w-[33rem] h-[41rem] shadow-2xl shadow-black/50"
    >
      <HomeHeaderText />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
}
.wrapper {
  transform: scale(.2);
  animation: scaleUp .7s forwards ease-in-out;
}

@keyframes scaleUp {
  to {
    transform: scale(1);
  }
}
</style>
