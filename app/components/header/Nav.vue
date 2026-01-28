<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Where It Went',
    icon: 'i-lucide-milestone',
    to: '',
    children: [
      {
        label: 'Now',
        description: 'What’s happening lately.',
        icon: 'i-lucide-map-pin'
      },
      {
        label: 'Then',
        description: 'What happened before.',
        icon: 'i-lucide-footprints'
      },
    ]
  },
  {
    label: 'Context',
    icon: 'i-lucide-layers-2',
    to: '',
    children: [
      {
        label: 'Labels',
        description: 'How you name what matters.',
        icon: 'i-lucide-tag'
      },
      {
        label: 'Mood',
        description: 'Patterns of how you feel.',
        icon: 'i-lucide-smile'
      },
      {
        label: 'Wishes',
        description: 'What you’re quietly hoping for.',
        icon: 'i-lucide-sparkles'
      },
    ]
  },
  {
    label: 'Settings',
    icon: 'i-lucide-bolt',
    to: '',
  }
])
</script>

<template>
  <UNavigationMenu arrow content-orientation="vertical" :items="items" class="w-full justify-center" />
</template>
