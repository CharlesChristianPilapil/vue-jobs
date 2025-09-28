<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    interface ITodos {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    }

    const name = ref('Vuentong Man');
    const status = ref('active');
    const tasks = ref(['task1', 'task2', 'task3']);
    const task = ref('');

    const toggleStatus = () => {
        if (status.value === "active") {
            status.value = "pending";
        }
        
        else if (status.value === "pending") {
            status.value = "inactive";
        }

        else {
            status.value = "active";
        }
    }

    const addTask = () => {
        if (task.value.trim() !== '') {
            tasks.value.push(task.value);
            task.value = '';
        }
    }

    const removeTask = (index: number) => {
        tasks.value.splice(index, 1);
    }

    onMounted(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data: ITodos[] = await response.json();
            tasks.value = data.map((task) => task.title);
        } catch (error) {
            console.error(error);
        }
    });
</script>

<template>
    <h1>{{ name }}</h1>
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>

    <form @submit.prevent="addTask">
        <label for="task">Add Task</label>
        <br>
        <input type="text" id="task" v-model="task"/>
        <button type="submit">Submit</button>
    </form>

    <h2> Tasks </h2>
    <ul>
        <li v-for="(task, index) in tasks" :key="task">
            <span> {{ task }} </span>
            <button @click="removeTask(index)">❌</button>
        </li>
    </ul>
    <!-- <a :href="link" target="_blank">Click for google</a> -->
    <!-- <br> -->
    <button @click="toggleStatus">Change Status</button>
</template>