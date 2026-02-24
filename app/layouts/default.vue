<template>
  <div class="flex h-dvh w-full overflow-hidden bg-gray-50 dark:bg-gray-950 items-center justify-center">
    <div class="relative w-full max-w-[450px] h-full bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col">
      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto w-full pb-20">
        <slot />
      </main>

      <!-- Bottom Floating Navigation -->
      <div class="absolute bottom-0 w-full z-10 max-w-[450px]">
        <LayoutNav />
      </div>
    </div>
  </div>
</template>
