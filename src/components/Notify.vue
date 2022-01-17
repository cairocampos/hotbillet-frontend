<template>
  <div>
    <NotificationGroup group="success">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md z-50"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="flex items-center justify-center w-12 bg-green-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-green-500">{{ notification.title }}</span>
              <p class="text-sm text-gray-600">{{ notification.text }}</p>
            </div>
          </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>


<NotificationGroup group="error">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="flex items-center justify-center w-12 bg-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-red-500">{{ notification.title }}</span>
              <p class="text-sm text-gray-600">{{ notification.text }}</p>
            </div>
          </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>

<NotificationGroup group="info">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="flex items-center justify-center w-12 bg-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-blue-500">{{ notification.title }}</span>
              <p class="text-sm text-gray-600">{{ notification.text }}</p>
            </div>
          </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>

<NotificationGroup group="warning">
  <div
    class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50"
  >
    <div class="w-full max-w-sm">
      <Notification
        v-slot="{ notifications }"
        enter="transform ease-out duration-300 transition"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="transition duration-500"
        move-delay="delay-300"
      >
        <div
          class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="flex items-center justify-center w-12 bg-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-yellow-500">{{ notification.title }}</span>
              <p class="text-sm text-gray-600">{{ notification.text }}</p>
            </div>
          </div>
        </div>
      </Notification>
    </div>
  </div>
</NotificationGroup>
  </div>
</template>
