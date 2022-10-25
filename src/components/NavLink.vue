<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

import { store } from "../store/index";

const currentRoute = useRoute();

const props = defineProps({
  route: { type: Object },
});

let isMobileScreen = computed<boolean>(() => window.innerWidth < 600);
</script>

<template>
  <RouterLink
    :to="route?.url"
    class="nav-item"
    :class="{
      active: currentRoute.name == route?.name,
      'border-b py-5': isMobileScreen,
    }"
  >
    <Icon :icon="route?.icon" :width="24" />
    <span :class="store.isMenuDocked ? 'nav-label-docked' : 'nav-label'">
      {{ route?.label }}
    </span>
  </RouterLink>
</template>
