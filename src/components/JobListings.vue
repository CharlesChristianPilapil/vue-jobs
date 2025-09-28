<script setup lang="ts">
import { RouterLink } from 'vue-router';
import JobListing from '@/components/JobListing.vue';
import { reactive, defineProps, toRefs, onMounted } from 'vue';
import type { IJob } from '@/utils/entities';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { base_api } from '@/api/axios';

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false,
    },
});

interface IState {
    jobs: IJob[];
    isLoading: boolean;
}

const state = reactive<IState>({
    jobs: [],
    isLoading: true,
});

onMounted(async () => {
    try {
        const res = await base_api.get('/jobs');
        state.jobs = res.data;
    } catch (error) {
        console.error('Error fetching jobs', error);
    } finally {
        state.isLoading = false;
    }
});

const { jobs, isLoading } = toRefs(state);
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="lg:px-4 lg:container mx-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Jobs</h2>
            <PulseLoader v-if="isLoading" class="text-center text-gray-500 py-6" />
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing
                    v-for="job in jobs.slice(0, limit || jobs.length)"
                    :key="job.id"
                    v-bind="{ ...job }"
                />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
            to="/jobs"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >View All Jobs</RouterLink
        >
    </section>
</template>
