<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()

// Budget state
const budgetType = ref<'monthly' | 'daily'>('monthly')
const budgetAmount = ref(5000)

const tags = computed(() => [
  {
    id: 1, name: t.value.context.defaultTags.dining, icon: 'i-lucide-utensils',
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-100/50 dark:bg-amber-900/20',
  },
  {
    id: 2, name: t.value.context.defaultTags.transportation, icon: 'i-lucide-bus',
    colorClass: 'text-sky-500',
    bgClass: 'bg-sky-100/50 dark:bg-sky-900/20',
  },
  {
    id: 3, name: t.value.context.defaultTags.work, icon: 'i-lucide-briefcase',
    colorClass: 'text-indigo-500',
    bgClass: 'bg-indigo-100/50 dark:bg-indigo-900/20',
  },
  {
    id: 4, name: t.value.context.defaultTags.shopping, icon: 'i-lucide-shopping-bag',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-100/50 dark:bg-red-900/20',
  },
  {
    id: 5, name: t.value.context.defaultTags.entertainment, icon: 'i-lucide-popcorn',
    colorClass: 'text-emerald-500',
    bgClass: 'bg-emerald-100/50 dark:bg-emerald-900/20',
  },
  {
    id: 6, name: t.value.context.defaultTags.grocery, icon: 'i-lucide-shopping-cart',
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-100/50 dark:bg-slate-800/20',
  },
])
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 pb-24">
    <!-- ━━━ Header ━━━ -->
    <div class="px-5 pt-8 pb-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
        {{ t.context.title }}
      </h1>
    </div>

    <!-- ━━━ Budget Section ━━━ -->
    <section class="mt-4">
      <div class="px-5 mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-wallet" class="w-4 h-4 text-gray-400" />
          <h2 class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ t.context.budgetSection }}</h2>
        </div>
      </div>

      <div class="px-5">
        <div class="bg-gray-50/80 dark:bg-gray-900/40 rounded-3xl p-5 border border-gray-100 dark:border-gray-800/80 relative overflow-hidden group">
          <div class="relative space-y-5">
            <!-- Amount & Toggle Header -->
            <div class="flex items-center justify-between">
              <div class="flex items-baseline gap-1">
                <span class="text-xs font-bold text-gray-400 dark:text-gray-600">¥</span>
                <span class="text-3xl font-black text-gray-900 dark:text-white tabular-nums tracking-tight">
                  {{ budgetAmount.toLocaleString() }}
                </span>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 ml-1">Limit</span>
              </div>

              <!-- Compact Segmented Toggle -->
              <div class="flex p-0.5 bg-gray-200/50 dark:bg-gray-800/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 relative w-32">
                <div 
                  class="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white dark:bg-gray-700 rounded-lg shadow-xs transition-all duration-300 ease-out z-0"
                  :style="{ transform: budgetType === 'monthly' ? 'translateX(0)' : 'translateX(100%)' }"
                ></div>
                
                <button 
                  v-for="type in ['monthly', 'daily'] as const"
                  :key="type"
                  @click="budgetType = type"
                  class="flex-1 py-1 text-[11px] font-bold transition-colors duration-300 relative z-10"
                  :class="budgetType === type 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500'"
                >
                  {{ type === 'monthly' ? t.context.monthly : t.context.daily }}
                </button>
              </div>
            </div>

            <!-- Minimalist Slider -->
            <div class="relative h-6 flex items-center group/slider">
              <input 
                type="range" 
                v-model.number="budgetAmount" 
                min="0" 
                max="20000" 
                step="100"
                class="compact-slider w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer z-20"
              />
              <div 
                class="absolute left-0 h-1 bg-indigo-500 rounded-full z-10 pointer-events-none transition-all duration-100"
                :style="{ width: `${(budgetAmount / 20000) * 100}%` }"
              ></div>
            </div>
            
            <p class="text-[10px] text-gray-400 dark:text-gray-500 font-medium text-center">
              {{ t.context.budgetHint }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ Tags Section (Grid) ━━━ -->
    <section class="mt-8 px-5">
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-tags" class="w-4 h-4 text-gray-400" />
          <h2 class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ t.context.tagsSection }}</h2>
        </div>
        <span class="text-[10px] text-gray-400 dark:text-gray-500 font-black px-2 py-0.5 bg-gray-50 dark:bg-gray-800 rounded-lg uppercase tracking-wider">{{ tags.length }} items</span>
      </div>

      <!-- Compact 5-Column Grid -->
      <div class="grid grid-cols-5 gap-y-6 gap-x-2">
        <button
          v-for="(tag, index) in tags"
          :key="tag.id"
          type="button"
          class="flex flex-col items-center gap-2 group transition-all active:scale-95"
          :style="{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }"
          style="animation: fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Compact Icon Container -->
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-transparent group-hover:shadow-sm', tag.bgClass]">
            <UIcon :name="tag.icon" class="w-5 h-5" :class="tag.colorClass" />
          </div>
          
          <span class="text-[11px] font-bold text-gray-600 dark:text-gray-400 tracking-tight text-center leading-tight">{{ tag.name }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}


.compact-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.2s;
  z-index: 30;
}

.compact-slider:active::-webkit-slider-thumb {
  transform: scale(0.9);
}

.dark .compact-slider::-webkit-slider-thumb {
  background: #374151;
  border-color: rgba(255,255,255,0.1);
}
</style>
