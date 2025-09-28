import { createRouter, createWebHistory } from 'vue-router';
import LazyRoutes from './lazy.routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LazyRoutes.HomeView,
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: LazyRoutes.JobsView,
        },
        {
            path: '/jobs/:jobId',
            name: 'job',
            component: LazyRoutes.JobView,
        },
        {
            path: '/add-job',
            name: 'add-job',
            component: LazyRoutes.AddJobView,
        },
        {
            path: '/jobs/edit/:jobId',
            name: 'edit-job',
            component: LazyRoutes.EditJobView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: LazyRoutes.NotFoundView,
        },
    ],
});

export default router;
