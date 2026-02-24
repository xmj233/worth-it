<template>
  <div class="grid grid-rows-[auto_1fr] h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
    <header class="flex justify-center border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
      <div class="w-full max-w-[450px]">
        <LayoutNav />
      </div>
    </header>
    <div class="overflow-y-auto flex justify-center">
      <main class="w-full max-w-[450px] min-h-full bg-white dark:bg-gray-900 shadow-2xl">
        <slot />
      </main>
    </div>
  </div>
</template>
