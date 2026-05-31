<template>
	<section class="tech-panel my-6! flex flex-col px-4 py-8 gap-3 text-center">
	<h2 class="text-2xl sm:text-4xl font-bold leading-tight tracking-tight">Our Blogs</h2>

      <div class="flex flex-col items-center gap-3 w-full">

        <!-- Full width action -->
        <RouterLink
			v-for="blog in blogs" :key="blog[1]" :to="blog[1]"
			class="tech-button p-3 secondary w-full sm:w-2/3" @click="() => {}">{{ blog[0] }}
		</RouterLink>

      </div>

    </section>
</template>

<script setup>
const blogs = [
	['Battery Health', '/battery']
]
</script>
