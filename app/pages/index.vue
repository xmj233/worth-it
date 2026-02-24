<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const date = shallowRef(new CalendarDate(2022, 2, 3))
</script>

<template>
  <div class="min-h-screen py-4 px-4 bg-white dark:bg-gray-900">
    <UCard class="border-0 shadow-none bg-transparent">
      <template #header>
        <div class="px-2 pt-2">
          <UInputDate v-model="date" size="lg" />
        </div>
      </template>

      <div class="flex flex-col gap-6">
        <div class="rounded-lg overflow-hidden bg-white dark:bg-gray-900 min-h-[500px]">
          <JournalCard />
        </div>

        <div class="flex flex-col gap-4">
          <JournalDiaryCard />
          <JournalDiaryCard />
          <JournalDiaryCard />
        </div>
      </div>

      <template #footer>
        <div class="px-2 pb-2 text-sm text-gray-600 dark:text-gray-400">
          this is tag
        </div>
      </template>
    </UCard>
  </div>
</template>
