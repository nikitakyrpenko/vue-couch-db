<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-2 mr-0" href="#">Student board</a>
            <ul class="navbar-nav px-3">
                <button type="button" class="btn btn-link"
                        :disabled="!selected || applied"
                        @click="apply"
                        v-if="section === 'courseworks'">
                    Подати запит
                </button>
            </ul>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <router-link :to="{ path: '/logout' }" class="nav-link">Sign out</router-link>
                </li>
            </ul>
        </nav>
        <div class="container-fluid">
            <div class="row">

                <nav class="col-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <b-nav-item :active="section === 'dashboard'" @click="section = 'dashboard'">
                                Dashboard
                            </b-nav-item>
                            <b-nav-item :active="section === 'courseworks'" @click="section = 'courseworks'">
                                Courseworks
                            </b-nav-item>
                            <b-nav-item :active="section === 'profile'" @click="section = 'profile'">
                                Profile
                            </b-nav-item>
                        </ul>
                    </div>
                </nav>

                <main role="main" class="ml-sm-auto col-10" style="padding-top:20px;">

                    <b-alert variant="success" :show="!!message" style="margin:0 0 20px 0; text-align:center;">
                        {{message}}
                    </b-alert>
                    <b-list-group v-if="section === 'courseworks'">
                        <b-list-group-item
                                href="#"
                                v-on:click="selected = item._id"
                                :active="selected === item._id"
                                class="list-group-item list-group-item-action"
                                v-for="item in availableCourseworks" v-bind:key="item._id"
                        >
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{item.coursework.topic}}</h5>
                                <small>{{item.coursework.complexity}}</small>
                            </div>
                            <p class="mb-1">{{item.coursework.description}}</p>
                            <p class="mb-1">{{item.teacherInfo.fName}}  {{item.teacherInfo.lName}}  ( {{item.teacherInfo.phone}} )</p>
                            <small>{{item.coursework.requirements}}</small>
                        </b-list-group-item>
                    </b-list-group>

                    <Dashboard v-if="section === 'dashboard'"/>

                    <Profile v-if="section === 'profile'"/>

                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Profile from './Profile'
    import Dashboard from './Dashboard'
    import auth from '../../auth'

    export default {
        components: {
            Profile,
            Dashboard
        },
        data() {
            return {
                message: null,
                selected: null,
                courseworks: [],
                section: 'dashboard'
            }
        },
        computed: {
            availableCourseworks() {
                return this.courseworks.filter(_ => !_.hasOwnProperty('studentId') || _.studentId === null)
            },
            applied() {
                let user = auth.getUser();
                return this.courseworks.some( _ => _.studentId === user._id);
            }
        },
        methods: {
            apply() {
                let user = auth.getUser();
                this.db.patch(this.selected, {studentId: user._id, status: 'applied'}).then(doc => {
                    let coursework = this.courseworks.find(_ => _._id === this.selected);
                    Object.assign(coursework, doc)

                });
            }
        },
        mounted() {
            this.db.find(
                {selector: {type: 'teacher'}}
            ).then(({docs}) => {
                let user = auth.getUser();

                this.teachers = docs;
                this.db.find({
                    selector: {
                        type: 'assignment',
                        facultyId: user.faculty,
                        coursework: {'$exists': true},
                        course: user.course
                    }
                }).then(({docs}) => {
                    this.courseworks = docs.map(
                        doc => Object.assign( doc, { teacherInfo: this.teachers.find( t => t._id === doc.teacherId)} )
                    );
                });
            });


            //  TODO don;t need this. just check courseworks list if there is one assigned to current user
            /*this.api.get(`/users/student/status/${user.id}`).then( ({data}) => {
                if (data.status === 'closed') this.applied = 1
            });*/
        }
    }
</script>

<style scoped>
    /*
     * Sidebar
     */


</style>