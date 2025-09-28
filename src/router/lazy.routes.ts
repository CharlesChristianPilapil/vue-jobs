const HomeView = () => import('@/views/HomeView.vue');
const JobsView = () => import('@/views/JobsView.vue');
const JobView = () => import('@/views/JobView.vue');
const AddJobView = () => import('@/views/AddJobView.vue');
const EditJobView = () => import('@/views/EditJobView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

const LazyRoutes = {
    HomeView,
    JobsView,
    JobView,
    AddJobView,
    EditJobView,
    NotFoundView,
};

export default LazyRoutes;
