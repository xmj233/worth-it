<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'

const { t, locale, setLocale } = useI18n()

const languages = [
  { value: 'zh' as const, label: '中文', flag: '🇨🇳' },
  { value: 'en' as const, label: 'English', flag: '🇺🇸' },
]
</script>

<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-900 pb-20">
    <!-- Header -->
    <div class="px-5 pt-8 pb-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
        {{ t.settings.title }}
      </h1>
    </div>

    <!-- Language Section -->
    <section class="px-5 mt-4">
      <div class="mb-3">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-languages" class="w-4 h-4 text-gray-400" />
          <h2 class="text-[15px] font-semibold text-gray-900 dark:text-gray-100">{{ t.settings.language }}</h2>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ t.settings.languageHint }}</p>
      </div>

      <div class="flex flex-col gap-2.5">
        <button
          v-for="lang in languages"
          :key="lang.value"
          type="button"
          class="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98] touch-manipulation border"
          :class="
            locale === lang.value
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md border-transparent'
              : 'bg-white dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md'
          "
          @click="setLocale(lang.value)"
        >
          <span class="text-xl leading-none">{{ lang.flag }}</span>
          <span class="text-[15px] font-semibold">{{ lang.label }}</span>
          <UIcon
            v-if="locale === lang.value"
            name="i-lucide-check"
            class="w-4 h-4 ml-auto"
          />
        </button>
      </div>
    </section>
  </div>
</template>
