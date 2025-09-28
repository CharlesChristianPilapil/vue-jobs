<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import type { IJob } from '@/utils/entities';

const { id, title, type, description, location, salary } = defineProps<IJob>();
const showFullDescription = ref(false);

const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
    const desc = description || '';

    if (showFullDescription.value) {
        return desc;
    }

    return desc.length > 90 ? desc.substring(0, 90) + '...' : desc;
});
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="flex flex-col justify-between p-4 h-full">
            <div class="mb-5">
                <div class="mb-6">
                    <div class="text-gray-600 my-2">{{ type }}</div>
                    <h3 class="text-xl font-bold">{{ title }}</h3>
                </div>

                <div class="mb-5">
                    <div>
                        {{ truncatedDescription }}
                    </div>
                    <button
                        v-if="description?.length > 90"
                        @click="toggleFullDescription"
                        class="text-green-500 hover:text-green-600 mb-5 cursor-pointer"
                    >
                        {{ showFullDescription ? 'Less' : 'More' }}
                    </button>
                </div>
            </div>
            <div class="border-t border-t-gray-200 mb-4 pt-4 space-y-4">
                <h3 class="text-green-500 mb-2">{{ salary }}</h3>
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <div class="text-orange-700">
                        <i class="pi pi-map-marker text-orange-700"></i>
                        {{ location }}
                    </div>
                    <RouterLink
                        :to="`/jobs/${id}`"
                        class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Read More
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
