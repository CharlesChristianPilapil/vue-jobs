<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';

interface Props {
    url?: string;
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    url: '/',
    label: 'Job Listings',
});
</script>

<template>
    <section>
        <div class="container m-auto py-6 px-6">
            <RouterLink
                :to="props.url"
                class="text-green-500 hover:text-green-600 flex items-center"
            >
                <i class="pi pi-angle-left mr-2"></i> Back to {{ props.label }}
            </RouterLink>
        </div>
    </section>
</template>
