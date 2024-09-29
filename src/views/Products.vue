<template>
  <div>
    <div class="max-w-7xl mx-auto p-10">
      <div class="flex items-center mb-6">
        <h1 class="font-fredoka text-3xl flex-shrink-0">Fresh & Trending Products</h1>
        <div class="flex-1 mx-4">
          <hr class="border-t border-gray-300" />
        </div>
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-6 mx-auto">
          <div class="relative">
            <button @click="isDropdownOpen = !isDropdownOpen">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <div v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-64 bg-white rounded-md shadow-lg">
              <div class="p-4">
                <p class="block font-fredoka text-gray-700 mb-3 dark:text-gray-300 mb-3">Advanced Search</p>
 
                <label for="productName" class="block mb-1 text-xs text-gray-500 mt-2 mb-2 ">Product Name</label>
                <input v-model="searchQuery" id="productName" type="text" placeholder="Search for products..."
                  class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2" />
 
                <div class="flex space-x-2 mb-2">
                  <div class="w-1/2">
                    <label for="minPrice" class="block mb-1 text-xs text-gray-500 mt-2 mb-2 ">Min Price</label>
                    <input v-model.number="minPrice" type="number" id="minPrice" placeholder="Min Price"
                      class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div class="w-1/2">
                    <label for="maxPrice" class="block mb-1 text-xs text-gray-500 mt-2 mb-2 ">Max Price</label>
                    <input v-model.number="maxPrice" type="number" id="maxPrice" placeholder="Max Price"
                      class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <!-- Search button -->
                <div class="flex justify-end">
                  <button @click="searchProducts"
                    class="bg-red-600 text-white rounded-md py-1 px-3 hover:bg-red-700 transition duration-200 mt-2">Search</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Products grid -->
      <div v-if="filteredProducts.length > 0"
        class="grid grid-flow-row auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product._id"
          class="w-72 px-4 py-3 bg-white shadow-md rounded-xl relative transition-transform duration-200 hover:scale-105 border border-transparent hover:border-orange-400">

          <a :href="product.detailUrl" class="relative block h-48 w-full">
            <img :src="product.imgUrl" alt="Product" class="h-48 w-full object-cover rounded-xl shadow-lg">

            <div
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
              Click for more detail
            </div>
          </a>

          <div class="absolute top-3 right-3">
            <a class="bg-red-500 text-white py-1 px-3 rounded-md text-xs font-bold">¥ {{ product.currentPrice }}</a>
          </div>

          <div class="py-3 mt-3">
            <div class="text-gray-400 uppercase text-xs mb-1">
              <span v-for="(service, index) in product.services" :key="index" class="text-red-500">
                {{ service }}<span v-if="index !== product.services.length - 1">, </span>
              </span>
            </div>
            <span class="text-gray-800 font-fredoka uppercase text-md">{{ product.title }}</span>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500 text-center p-10">
        No products available at the moment.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      errorMessage: '',
      searchQuery: '',
      minPrice: '',
      maxPrice: Infinity,
      isDropdownOpen: false,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const isWithinPriceRange = product.currentPrice >= this.minPrice && product.currentPrice <= this.maxPrice;
        const matchesSearchQuery = this.searchQuery.trim() === '' || product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return isWithinPriceRange && matchesSearchQuery;
      });
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api.anan-cargo.com/api/preproduct/list');
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
          this.products = response.data.data;
        } else {
          this.errorMessage = 'No products available.';
        }
      } catch (error) {
        this.errorMessage = 'Error fetching data: ' + error.message;
      }
    },
    searchProducts() { },
  },
  mounted() {
    this.fetchData();
  }
};
</script>