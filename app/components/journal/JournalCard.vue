<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'

const { t, tf } = useI18n()

type DiaryImage = {
  id: number | string
  src: string
  alt?: string
  takenAt: number
}

const images = ref<DiaryImage[]>([
  { id: 1, src: 'https://picsum.photos/900/700?random=11', alt: 'Photo 1', takenAt: 1770104226000 },
  { id: 2, src: 'https://picsum.photos/900/700?random=12', alt: 'Photo 2', takenAt: 1770104226000 },
  { id: 3, src: 'https://picsum.photos/900/700?random=13', alt: 'Photo 3', takenAt: 1770115026000 },
  { id: 4, src: 'https://picsum.photos/900/700?random=21', alt: 'Photo 4', takenAt: 1770115026000 },
  { id: 5, src: 'https://picsum.photos/900/700?random=22', alt: 'Photo 5', takenAt: 1770129426000 },
  { id: 6, src: 'https://picsum.photos/900/700?random=31', alt: 'Photo 6', takenAt: 1770129426000 }
])

const groupLabelFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

function formatGroupLabel(ms: number) {
  return groupLabelFormatter.format(new Date(ms))
}

function minuteBucket(ts: number) {
  return Math.floor(ts) / 60000
}

const groups = computed(() => {
  const map = new Map<number, { images: DiaryImage[]; firstTakenAt: number }>()
  for (const img of images.value) {
    const key = minuteBucket(img.takenAt)
    const bucket = map.get(key)
    if (bucket) bucket.images.push(img)
    else map.set(key, { images: [img], firstTakenAt: img.takenAt })
  }

  return Array.from(map.entries())
    .map(([key, bucket]) => ({
      key,
      label: formatGroupLabel(bucket.firstTakenAt),
      sortKey: key,
      images: bucket.images
    }))
    .sort((a, b) => b.sortKey - a.sortKey)
})

const selectedGroupKey = ref<number | null>(null)
const selectedIndex = ref<number>(0)

const currentGroup = computed(() => {
  if (!selectedGroupKey.value) return null
  return groups.value.find((g) => g.key === selectedGroupKey.value) ?? null
})

const currentImage = computed(() => {
  const g = currentGroup.value
  if (!g) return null
  return g.images[selectedIndex.value] ?? null
})

function openGroup(groupKey: number, startIndex = 0) {
  selectedGroupKey.value = groupKey
  selectedIndex.value = startIndex
}

function navigateImage(direction: 'prev' | 'next') {
  const g = currentGroup.value
  if (!g) return
  const total = g.images.length
  if (total <= 0) return

  if (direction === 'next') {
    selectedIndex.value = (selectedIndex.value + 1) % total
  } else {
    selectedIndex.value = (selectedIndex.value - 1 + total) % total
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Empty state -->
    <div v-if="groups.length === 0" class="py-12 text-center px-6">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
        <UIcon name="i-lucide-image" class="w-6 h-6 text-gray-400" />
      </div>
      <div class="text-[15px] text-gray-700 dark:text-gray-300 font-semibold">{{ t.moments.empty }}</div>
      <div class="mt-1 text-xs text-gray-400 dark:text-gray-500 font-medium">{{ t.moments.emptyHint }}</div>
    </div>

    <!-- Horizontal moments carousel -->
    <div v-else class="flex gap-3 overflow-x-auto scrollbar-hide snap-x px-1 py-1">
      <UModal v-for="group in groups" :key="group.key">
        <template #default="{ open }">
          <button
            type="button"
            class="snap-start shrink-0 w-[160px] rounded-2xl overflow-hidden bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.97] transition-transform duration-200 p-2.5"
            @click="openGroup(group.key, 0)"
          >
            <!-- Stacked overlapping thumbnails -->
            <div class="relative aspect-[4/3]">
              <div
                v-for="(img, i) in group.images.slice(0, 3).reverse()"
                :key="img.id"
                class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-md"
                :style="{
                  transform: `translate(${(2 - i) * 5}px, ${(2 - i) * 5}px) rotate(${(2 - i) === 0 ? 0 : (2 - i) === 1 ? -2.5 : 3}deg)`,
                  zIndex: i
                }"
              >
                <img :src="img.src" :alt="img.alt || 'Photo'" class="w-full h-full object-cover" loading="lazy" />
              </div>

              <!-- Count badge -->
              <div class="absolute -bottom-0.5 -right-0.5 z-20">
                <span class="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold shadow">
                  {{ group.images.length }}
                </span>
              </div>
            </div>

            <!-- Time label below stack -->
            <div class="mt-2.5 flex items-center justify-between">
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
                {{ group.label }}
              </span>
              <span class="text-[10px] text-gray-400 dark:text-gray-500">
                {{ tf(t.moments.photos, { n: group.images.length }) }}
              </span>
            </div>
          </button>
        </template>

        <template #content="{ close }">
          <div v-if="currentImage" class="relative">
            <!-- Navigation Buttons -->
            <button
              v-if="(currentGroup?.images.length || 0) > 1"
              @click.stop="navigateImage('prev')"
              class="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white transition-colors"
              aria-label="Previous image"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              v-if="(currentGroup?.images.length || 0) > 1"
              @click.stop="navigateImage('next')"
              class="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white transition-colors"
              aria-label="Next image"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Image -->
            <div class="relative w-full max-h-[85vh] flex flex-col items-center bg-black rounded-xl overflow-hidden">
              <img
                :src="currentImage.src"
                :alt="currentImage.alt"
                class="w-full h-auto max-h-[75vh] object-contain"
              />

              <!-- Image Info Bar -->
              <div class="w-full px-5 py-3.5 bg-gray-950 flex items-center justify-between">
                <span class="text-sm font-medium text-white">
                  {{ currentGroup?.label }}
                </span>
                <span class="text-xs text-gray-400 tabular-nums">
                  {{ selectedIndex + 1 }} / {{ currentGroup?.images.length || 0 }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
