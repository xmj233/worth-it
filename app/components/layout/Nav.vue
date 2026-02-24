<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from '~/composables/useI18n'

const route = useRoute()
const { t } = useI18n()

const items = computed(() => [
  {
    label: t.value.nav.now,
    icon: 'i-lucide-map-pin',
    to: '/',
    match: 'now'
  },
  {
    label: t.value.nav.then,
    icon: 'i-lucide-footprints',
    to: '/then',
    match: 'then'
  },
  // Primary Floating Action Button inside Tab Bar
  {
    label: t.value.nav.track,
    icon: 'i-lucide-plus',
    to: '/add',
    isAction: true
  },
  {
    label: t.value.nav.context,
    icon: 'i-lucide-layers-2',
    to: '/context',
    match: 'context'
  },
  {
    label: t.value.nav.settings,
    icon: 'i-lucide-bolt',
    to: '/settings',
    match: 'settings'
  }
])

const isActive = (item: any) => {
  if (item.to === '/') return route.path === '/'
  return route.path.includes(item.match)
}
</script>

<template>
  <nav
    class="relative px-6 py-3 flex items-center justify-between bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-t border-gray-100/50 dark:border-gray-800/50 pb-safe">
    <template v-for="(item, index) in items" :key="index">

      <!-- Primary Action Button (Floating Style) -->
      <div v-if="item.isAction" class="relative -top-6">
        <NuxtLink :to="item.to"
          class="flex items-center justify-center w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-xl shadow-black/10 dark:shadow-white/10 hover:-translate-y-1 active:scale-95 transition-all duration-300">
          <UIcon :name="item.icon" class="w-7 h-7" />
        </NuxtLink>
      </div>

      <!-- Normal Tab -->
      <NuxtLink v-else :to="item.to"
        class="flex flex-col items-center justify-center gap-1 group w-12 touch-manipulation">
        <div class="relative flex items-center justify-center p-1.5 rounded-2xl transition-all duration-300"
          :class="isActive(item) ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'">
          <UIcon :name="item.icon" class="w-6 h-6 transition-transform duration-300 group-active:scale-90"
            :class="isActive(item) ? 'scale-110' : ''" />
        </div>
        <span class="text-[10px] font-medium transition-colors"
          :class="isActive(item) ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'">
          {{ item.label }}
        </span>
      </NuxtLink>
    </template>
  </nav>
</template>

<style scoped>
/* Safe area for mobile edge-to-edge screens */
.pb-safe {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
</style>
