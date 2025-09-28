<script setup lang="ts">
import { base_api } from '@/api/axios';
import BackButton from '@/components/BackButton.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import JobForm from '@/components/JobForm.vue';
import type { IJob } from '@/utils/entities';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.jobId;

interface IState {
    job: IJob | null;
    isLoading: boolean;
}

const state = reactive<IState>({
    job: null,
    isLoading: true,
});

const handleUpdate = async (updated: Omit<IJob, 'id'>) => {
    try {
        const res = await base_api.put(`/jobs/${jobId}`, updated);
        router.push(`/jobs/${res.data.id}`);
        toast.success('Job detailed updated successfully.');
    } catch (error) {
        toast.error('Failed to update job details');
        console.error('Failed to update job details.', error);
    }
};

onMounted(async () => {
    try {
        const res = await base_api.get(`/jobs/${jobId}`);
        state.job = res.data;
    } catch (error) {
        console.error('Error fetching jobs', error);
    } finally {
        state.isLoading = false;
    }
});
</script>

<template>
    <BackButton />
    <JobForm
        v-if="!state.isLoading && state.job"
        :modelValue="state.job"
        :onSubmit="handleUpdate"
    />
    <PulseLoader v-else class="text-center text-gray-500 py-6" />
</template>
