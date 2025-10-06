<script setup lang="ts">

import HomeCardPunchline from "../atoms/HomeCardPunchline.vue";
import ToolkitAnnouncer from "../atoms/ToolkitAnnouncer.vue";
import ToolkitItems from "../atoms/ToolkitItems.vue";
import HomeHeader from "../atoms/HomeHeader.vue";
import AfterHoursPunchline from "../atoms/AfterHoursPunchline.vue";
import AfterHoursHeader from "../atoms/AfterHoursHeader.vue";
import AfterHoursItems from "../atoms/AfterHoursItems.vue";
import SocialHeader from "../atoms/SocialHeader.vue";
import SocialLinks from "../atoms/SocialLinks.vue";
</script>

<template>
  <div>
    <HomeHeader class="mb-4"/>
    <HomeCardPunchline class="font-sans text-xl mb-8"/>
    <ToolkitAnnouncer class="font-sans text-violet-500 font-bold text-sm mb-4" />
    <ToolkitItems />
    <AfterHoursHeader class="mb-1"/>
    <AfterHoursPunchline class="text-base mb-4"/>
    <AfterHoursItems class="mb-6"/>
    <SocialHeader class="text-violet-500 font-bold text-sm"/>
    <SocialLinks class=""/>
  </div>
</template>

<style scoped>

</style>