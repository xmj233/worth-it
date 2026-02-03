<script setup lang="ts">
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

const groupDateFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

function formatGroupLabel(ms: number) {
  return groupLabelFormatter.format(new Date(ms))
}

function formatGroupDate(ms: number) {
  return groupDateFormatter.format(new Date(ms))
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
      date: formatGroupDate(bucket.firstTakenAt),
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
  <div class="w-full flex flex-col h-full min-h-[400px]">
    <!-- Title Section -->
    <div class="px-4 pt-4 pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Photos
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Grouped by time
      </p>
    </div>

    <!-- Groups Grid Section (Bottom) -->
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="groups.length === 0" class="h-full grid place-items-center text-center px-6">
        <div>
          <div class="text-sm text-gray-600 dark:text-gray-300 font-medium">No photos yet</div>
          <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">Add images when writing a diary entry.</div>
        </div>
      </div>

      <div v-else class="grid grid-cols-2 gap-4">
        <UModal v-for="group in groups" :key="group.key">
          <template #default="{ open }">
            <button
              type="button"
              class="text-left rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 p-3 shadow-sm active:scale-[0.99] transition w-full"
              @click="openGroup(group.key, 0)"
            >
              <div class="flex items-center justify-between">
                <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ group.label }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                  {{ group.images.length }}
                </div>
              </div>

              <!-- -- stacked preview -->
              <div class="mt-3 relative aspect-[4/3]">
                <div
                  v-for="(img, i) in group.images.slice(0, 3)"
                  :key="img.id"
                  class="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md"
                  :style="{
                    transform: `translate(${i * 6}px, ${i * 6}px) rotate(${i === 0 ? 0 : i === 1 ? -3 : 3}deg)`,
                    zIndex: 10 - i
                  }"
                >
                  <img :src="img.src" :alt="img.alt || 'Photo'" class="w-full h-full object-cover" loading="lazy" />
                </div>

                <!-- count badge -->
                <div class="absolute bottom-2 right-2 z-20">
                  <div class="px-2 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium">
                    {{ group.images.length }}
                  </div>
                </div>
              </div>
            </button>
          </template>

          <template #content="{ close }">
            <div v-if="currentImage" class="relative">
              <!-- Navigation Buttons -->
              <button
                v-if="(currentGroup?.images.length || 0) > 1"
                @click.stop="navigateImage('prev')"
                class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Previous image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                v-if="(currentGroup?.images.length || 0) > 1"
                @click.stop="navigateImage('next')"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Next image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image -->
              <div class="relative w-full max-h-[80vh] flex flex-col items-center">
                <img
                  :src="currentImage.src"
                  :alt="currentImage.alt"
                  class="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                
                <!-- Image Info -->
                <div class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {{ currentGroup?.label }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ selectedIndex + 1 }} / {{ currentGroup?.images.length || 0 }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </div>
</template>
