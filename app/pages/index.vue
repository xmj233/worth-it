<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'

const { t, tf } = useI18n()

// ── Greeting based on time of day ──
const now = new Date()
const hour = now.getHours()

const greeting = computed(() => {
  if (hour < 6) return { text: t.value.greeting.night, emoji: '🌙' }
  if (hour < 12) return { text: t.value.greeting.morning, emoji: '☀️' }
  if (hour < 18) return { text: t.value.greeting.afternoon, emoji: '🌤️' }
  return { text: t.value.greeting.evening, emoji: '🌙' }
})

// ── Today's date ──
const todayDay = now.getDate()
// Formatted date based on reactive locale
const todayFormatted = computed(() => {
  return new Intl.DateTimeFormat(t.value.nav.now === 'Now' ? 'en-US' : 'zh-CN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(now)
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">

    <!-- ━━━ Greeting Header ━━━ -->
    <div class="px-5 pt-6 pb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Large date number -->
          <div class="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg shadow-gray-900/15 dark:shadow-white/15">
            <span class="text-2xl font-bold text-white dark:text-gray-900 tabular-nums">{{ todayDay }}</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              {{ greeting.text }} {{ greeting.emoji }}
            </h1>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
              {{ todayFormatted }}
            </p>
          </div>
        </div>
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-200/40 dark:shadow-orange-900/20">
          <span class="text-white text-sm font-bold">A</span>
        </div>
      </div>
    </div>

    <!-- ━━━ Moments Section ━━━ -->
    <section class="mt-6">
      <div class="flex items-center justify-between px-5 mb-3">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-camera" class="w-4 h-4 text-gray-400" />
          <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ t.sections.moments }}</h2>
        </div>
        <span class="text-xs text-gray-400 dark:text-gray-500 font-medium">{{ t.sections.seeAll }}</span>
      </div>
      <div class="px-5">
        <JournalCard />
      </div>
    </section>

    <!-- ━━━ Journal Section ━━━ -->
    <section class="mt-8 px-5">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-pen-line" class="w-4 h-4 text-gray-400" />
          <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ t.sections.journal }}</h2>
        </div>
        <span class="text-xs text-gray-400 dark:text-gray-500 font-medium">{{ tf(t.sections.entries, { n: 3 }) }}</span>
      </div>
      <div class="flex flex-col gap-3">
        <JournalDiaryCard
          time="08:15"
          mood="🌅"
          content="Woke up early today. The sunrise was beautiful — streaks of orange and pink across the sky. Made a cup of coffee and sat on the balcony for a while."
          :tags="['morning', 'mindfulness']"
        />
        <JournalDiaryCard
          time="12:30"
          mood="😊"
          content="Great lunch with the team. We talked about the upcoming project and everyone seems excited. I feel really grateful to work with such amazing people."
          :tags="['work', 'gratitude']"
        />
        <JournalDiaryCard
          time="21:00"
          mood="📖"
          content="Read a few chapters before bed. The book is getting really interesting — the protagonist just made a surprising choice that changes everything."
          :tags="['reading', 'evening']"
        />
      </div>
    </section>

    <!-- Bottom spacer for nav bar -->
    <div class="h-8" />
  </div>
</template>
