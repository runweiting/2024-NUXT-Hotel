<script setup lang="ts"></script>

<template>
  <div class="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between space-x-4 bg-primary-900 p-4">
      <div class="flex items-center space-x-4">
        <!-- Dropdown Time Sort -->
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              class="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
              />
            </svg>
            Last 30 days
            <svg
              class="ms-2.5 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownRadio"
            class="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style="
              position: absolute;
              inset: auto auto 0px 0px;
              margin: 0px;
              transform: translate3d(522.5px, 3847.5px, 0px);
            "
          >
            <ul
              class="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    for="filter-radio-example-1"
                    class="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Last day</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-2"
                    checked
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    for="filter-radio-example-2"
                    class="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Last 7 days</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-3"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    for="filter-radio-example-3"
                    class="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Last 30 days</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-4"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    for="filter-radio-example-4"
                    class="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Last month</label
                  >
                </div>
              </li>
              <li>
                <div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    for="filter-radio-example-5"
                    class="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Last year</label
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Search Bar -->
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0"
          >
            <svg
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            id="table-search"
            type="text"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>

      <!-- Post NewItem -->
      <button class="btn">新增項目</button>
    </div>

    <!-- Table -->
    <div class="relative overflow-x-auto shadow-md">
      <table class="w-full text-left text-sm text-black rtl:text-right">
        <thead class="bg-primary-300 text-xs uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">image</th>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">title</th>
            <th scope="col" class="px-6 py-3">description</th>
            <th scope="col" class="px-6 py-3">date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b bg-white hover:bg-primary-50">
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              <img src="https://fakeimg.pl/300/" alt="fakeimg" class="h-20 rounded-lg" />
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">
              <button type="button" class="btn me-2 bg-blue-500 text-white hover:bg-blue-700">
                Edit
              </button>
              <button type="button" class="btn bg-red-500 text-white hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        class="flex-column flex flex-wrap items-center justify-between bg-primary-900 p-4 md:flex-row"
        aria-label="Table navigation"
      >
        <span class="block w-full text-sm text-white md:inline md:w-auto">Showing 1-10 of1000</span>
        <ul class="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
          <li>
            <a
              href="#"
              class="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Previous</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >1</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >2</a
            >
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              class="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >3</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >4</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >5</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
