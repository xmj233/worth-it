<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const date = shallowRef(new CalendarDate(2022, 2, 3))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 px-4 md:px-10">
    <UCard class="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <template #header>
        <div class="p-4 pb-3">
          <UInputDate v-model="date" size="lg" />
        </div>
      </template>

      <div class="flex flex-col md:flex-row items-stretch justify-center gap-6 p-4">
        <div class="hidden md:flex relative overflow-hidden min-w-[450px] rounded-lg">
          <JournalCard2 />
        </div>
        <div class="flex md:hidden rounded-lg overflow-hidden bg-white dark:bg-gray-900 min-h-[500px]">
          <JournalCard3 />
        </div>

        <div class="flex-1 min-w-[268px] flex flex-col gap-4">
          <JournalDiaryCard />
          <JournalDiaryCard />
          <JournalDiaryCard />
        </div>
      </div>

      <template #footer>
        <div class="p-4 pt-3 text-sm text-gray-600 dark:text-gray-400">
          this is tag
        </div>
      </template>
    </UCard>
  </div>
</template>
