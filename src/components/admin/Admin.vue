<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <span class="navbar-brand col-2 mr-0">Methodologiest</span>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <router-link :to="{ path: '/logout' }" class="nav-link" >Sign out</router-link>
                </li>
            </ul>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <nav class="col-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <b-nav-item :active = "section === 'teachers'" @click = "section = 'teachers'">Teachers</b-nav-item>
                            <b-nav-item :active = "section === 'faculties'" @click = "section = 'faculties'">Faculties</b-nav-item>
                            <b-nav-item :active = "section === 'workload'" @click = "section = 'workload'">Workloads</b-nav-item>
                        </ul>
                    </div>
                </nav>

                <main role="main" class="ml-sm-auto col-10" style = "padding-top:20px;">
                    <Teachers :items="teachers" v-if="section === 'teachers'" />
                    <Faculties :items="faculties" v-if="section === 'faculties'" />
                    <Workload :faculties="faculties" :teachers="teachers" v-if="section === 'workload'" />
                    <b-alert variant="success" :show="!!message" style="margin:0 0 20px 0; text-align:center;">
                        {{message}}
                    </b-alert>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Teachers from './Teachers'
    import Faculties from './Faculties'
    import Workload from './Workload'
    export default {
        components: {
            Teachers,
            Faculties,
            Workload
        },
        data() {
            return {
                message: null,
                teachers: [],
                faculties: [],
                section: 'teachers'
            }
        },
        mounted() {
            this.db.find({selector: {type: 'teacher'}}).then( ({docs}) => this.teachers = docs );
            this.db.find({selector: {type: 'faculty'}}).then( ({docs}) => this.faculties = docs );
        },
    }
</script>

<style scoped>

</style>