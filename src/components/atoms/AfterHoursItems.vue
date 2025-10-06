<template>
  <div class="flex flex-wrap justify-center gap-3">
    <div
        v-for="(skill, i) in skills"
        :key="skill"
        class="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-sm
  transform transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:shadow-lg skill-badge"
        :style="{ animationDelay: `0.1s` }"
    >
      {{ skill }}
    </div>
  </div>
</template>

<script setup>
const skills = ['Photography', 'Astronomy', 'Airsoft', 'Coding', 'Cats'];
</script>

<style scoped>
.skill-badge {
  opacity: 0;
  animation: fadeInUp 1s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
