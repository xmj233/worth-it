<script setup lang="ts">
interface Props {
  time?: string
  content?: string
  tags?: string[]
  mood?: string
}

const props = withDefaults(defineProps<Props>(), {
  time: '12:30',
  content: 'Today was a great day. I finished all my tasks and had time for a walk in the park. The weather was perfect — a gentle breeze and golden sunlight filtering through the trees.',
  tags: () => ['reflection', 'gratitude'],
  mood: '😊'
})

// Mood-based subtle tint for the card
const moodTint = computed(() => {
  const tints: Record<string, string> = {
    '🌅': 'from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10',
    '😊': 'from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/10',
    '📖': 'from-indigo-50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/10',
    '🌙': 'from-slate-50 to-blue-50/50 dark:from-slate-950/20 dark:to-blue-950/10',
    '🔥': 'from-red-50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/10',
    '💪': 'from-sky-50 to-cyan-50/50 dark:from-sky-950/20 dark:to-cyan-950/10',
  }
  return tints[props.mood] || 'from-gray-50 to-gray-50/50 dark:from-gray-800/30 dark:to-gray-800/20'
})

const moodBadge = computed(() => {
  const badges: Record<string, string> = {
    '🌅': 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    '😊': 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    '📖': 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    '🌙': 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300',
    '🔥': 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    '💪': 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
  }
  return badges[props.mood] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
})
</script>

<template>
  <button
    type="button"
    class="group relative w-full text-left rounded-2xl border border-gray-200/60 dark:border-gray-700/40 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 overflow-hidden"
  >
    <!-- Mood-tinted gradient background -->
    <div :class="['absolute inset-0 bg-gradient-to-br', moodTint]" />

    <div class="relative px-4 pt-4 pb-3.5">
      <!-- Top row: mood badge + time -->
      <div class="flex items-center justify-between mb-3">
        <div :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', moodBadge]">
          <span class="text-sm leading-none">{{ props.mood }}</span>
        </div>
        <div class="flex items-center gap-1 text-gray-400 dark:text-gray-500">
          <UIcon name="i-lucide-clock-3" class="w-3 h-3" />
          <span class="text-[11px] font-semibold tabular-nums tracking-wide">
            {{ props.time }}
          </span>
        </div>
      </div>

      <!-- Content preview -->
      <p class="text-[15px] leading-relaxed text-gray-700 dark:text-gray-200 line-clamp-3">
        {{ props.content }}
      </p>

      <!-- Tags -->
      <div v-if="props.tags.length" class="flex flex-wrap gap-1.5 mt-3">
        <span
          v-for="tag in props.tags"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/70 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/30"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </button>
</template>