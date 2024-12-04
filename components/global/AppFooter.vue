<script setup lang="ts"></script>

<template>
  <footer class="bg-black px-3 py-20">
    <div class="container px-4">
      <!-- Upper Section -->
      <div
        class="mb-20 flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-0"
      >
        <!-- Logo and Social Links -->
        <div>
          <img class="mb-10" src="/images/logo-white.svg" alt="logo" />
          <div class="flex items-center gap-4">
            <a
              href="#"
              class="rounded-full border text-white transition-colors hover:border-primary-100"
            >
              <Icon name="bi:line" class="p-2 text-2xl" />
            </a>
            <a
              href="#"
              class="rounded-full border text-white transition-colors hover:border-primary-100"
            >
              <Icon name="mdi:instagram" class="p-2 text-2xl" />
            </a>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="flex flex-col gap-4 md:flex-row md:gap-20">
          <!-- Phone and Fax -->
          <address class="mb-0 flex flex-col">
            <p class="mb-4 font-bold text-white md:mb-10">
              TEL
              <a
                href="tel:+886-7-1234567"
                class="mt-2 block text-sm font-normal text-neutral-400 no-underline transition-colors hover:text-primary-100 md:text-base"
              >
                +886-7-1234567
              </a>
            </p>

            <p class="mb-0 font-bold text-white">
              FAX
              <a
                href="fax:+886-7-1234567"
                class="mt-2 block text-sm font-normal text-neutral-400 no-underline transition-colors hover:text-primary-100 md:text-base"
              >
                +886-7-1234567
              </a>
            </p>
          </address>

          <!-- Email and Web -->
          <address class="mb-0 flex flex-col">
            <p class="mb-4 font-bold text-white md:mb-10">
              MAIL
              <a
                href="mailto:elh@hexschool.com"
                class="mt-2 block text-sm font-normal text-neutral-400 no-underline transition-colors hover:text-primary-100 md:text-base"
              >
                elh@hexschool.com
              </a>
            </p>

            <p class="mb-0 font-bold text-white">
              WEB
              <a
                href="https://www.elhhexschool.com.tw/"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-2 block text-sm font-normal text-neutral-400 no-underline transition-colors hover:text-primary-100 md:text-base"
              >
                www.elhhexschool.com.tw
              </a>
            </p>
          </address>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="flex flex-col gap-4 text-sm text-white md:flex-row md:items-center md:justify-between md:gap-0 md:text-base"
      >
        <address class="mb-0">806023 台灣高雄市新興區六角路123號</address>
        <p class="mb-0">© 享樂酒店 {{ new Date().getFullYear() }} All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>
