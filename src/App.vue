<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { store } from "./store/index";
import NavLink from "./components/NavLink.vue";

import { ref, computed, onMounted } from "vue";

interface Route {
  url: string;
  name: string;
  icon: string;
  label: string;
}

const routes: Route[] = [
  {
    url: "/",
    name: "profile",
    icon: "fa6-solid:user",
    label: "Profile",
  },
  {
    url: "/payment",
    name: "payment",
    icon: "fa6-brands:cc-stripe",
    label: "Payment",
  },
];

let isMenuOpen = ref(false);

const isMenuLocked = computed<boolean>(() => isMenuOpen.value);
let isMobileScreen = computed<boolean>(() => window.innerWidth < 600);

onMounted(() => {
  const sideMenu = document.querySelector(".side-menu");

  sideMenu?.addEventListener("mouseenter", function (event) {
    isMenuOpen.value = true;
  });

  sideMenu?.addEventListener("mouseleave", function (event) {
    isMenuOpen.value = false;
  });
});
</script>

<template>
  <aside :class="store.isMenuDocked ? 'side-menu-docked' : 'side-menu'">
    <div class="flex justify-end items-center">
      <Icon
        class="cursor-pointer"
        :class="store.isMenuDocked ? 'text-emerald-600' : 'text-gray-500'"
        v-if="(isMenuLocked || store.isMenuDocked) && !isMobileScreen"
        :icon="store.isMenuDocked ? store.dockedIcon : store.notDockedIcon"
        @click="store.lockMenu()"
      />
    </div>

    <nav class="w-full grid grid-cols-1">
      <NavLink v-for="route in routes" :key="route.url" :route="route" />
    </nav>
  </aside>

  <main
    class="main"
    :class="store.isMenuDocked ? 'ml-64' : 'ml-20'"
    @click="store.lockMobileMenu(isMobileScreen)"
  >
    <RouterView />
  </main>

  <footer class="mobile-nav">
    <Icon icon="ic:baseline-menu" :width="32" @click="store.lockMobileMenu()" />
  </footer>
</template>
