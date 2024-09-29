<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => {
    return route.path === path
}
</script>

<template>
    <div>
        <div class="border-gray-200 bg-gray-100 py-4 dark:bg-gray-900 shadow-lg">
            <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-6 mx-auto">
                <ul class="flex space-x-4">
                    <li :class="{ 'text-indigo-500': isActive('/') }" class="relative">
                        <router-link 
                            to="#" 
                            class="block font-fredoka py-2 px-3 transition-colors duration-300"
                        >
                            Home
                        </router-link>
                    </li>
                    <li :class="{ 'text-indigo-500': isActive('/products') }" class="relative">
                        <router-link 
                            to="/products" 
                            class="block font-fredoka py-2 px-3 transition-colors duration-300"
                        >
                              All Products
                        </router-link>
                    </li>
                </ul>
            <a href="/products" class="flex items-center">
          <img src="../assets/cart.svg" alt="Cart" class="w-10 h-10 me-3" />
        </a>
            </div> 
        </div>
    </div>
</template>

<style scoped>  
</style>
