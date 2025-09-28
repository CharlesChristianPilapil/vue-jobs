<script setup lang="ts">
import router from '@/router';
import type { IJob } from '@/utils/entities';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { base_api } from '@/api/axios';
import BackButton from '@/components/BackButton.vue';
import JobForm from '@/components/JobForm.vue';

const form = reactive<Omit<IJob, 'id'>>({
    type: 'Full-Time',
    title: '',
    description: '',
    salary: '',
    location: '',
    company: {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
    },
});

const toast = useToast();

const handleSubmit = async (newJob: Omit<IJob, 'id'>) => {
    try {
        const res = await base_api.post<IJob>('/jobs', newJob);
        toast.success('Job added successfully.');
        router.push(`/jobs/${res.data.id}`);
    } catch (error) {
        toast.error('Job was not added');
        console.error('Error fetching job.', error);
    }
};
</script>

<template>
    <BackButton label="Home" />
    <JobForm :modelValue="form" :onSubmit="handleSubmit" />
</template>
