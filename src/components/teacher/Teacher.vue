<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand pr-3 pl-3" href="#">Teacher</a>
            <div class="navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <b-link class="nav-link" @click="modify" :disabled="!this.selected">Define coursework</b-link>
                    </li>
                </ul>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <b-link class="nav-link" @click="approve(true)" :disabled="!this.selected || this.selected.status !== 'applied'">Approve</b-link>
                    </li>
                    <li class="nav-item">
                        <b-link class="nav-link" @click="approve(false)" :disabled="!this.selected || this.selected.status !== 'applied'">Reject</b-link>
                    </li>
                </ul>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <router-link :to="{ path: '/logout' }" class="nav-link" >Sign out</router-link>
                    </li>
                </ul>
            </div>
        </nav>



        <div class="container-fluid editor">
            <div class="row">

                <main role="main" class="ml-sm-auto col-12" style = "padding-top:20px;">

                    <b-alert variant="success" :show="!!message" style="margin:0 0 20px 0; text-align:center;">
                        {{message}}
                    </b-alert>
                    <div :style="{display: editing ? 'none' : 'block'}">
                        <b-table :fields="fields"
                                 id = "_id"
                                 ref="table"
                                 selectable
                                 select-mode="single"
                                 selectedVariant="success"
                                 :items="items"
                                 @row-selected="rowSelected"
                        />
                    </div>
                    <b-form v-if="editing">

                        <legend >{{selectedFaculty}}</legend>
                        <b-form-group label="Topic:" label-cols="3" label-align="right">
                            <b-form-input
                                    type="text"
                                    v-model="editing.coursework.topic"
                                    required
                                    placeholder="Enter topic" />
                        </b-form-group>
                        <b-form-group label="Complexity:" label-cols="3" label-align="right">
                            <b-form-input
                                    type="text"
                                    v-model.number="editing.coursework.complexity"
                                    required
                                    placeholder="Specify complexity" />
                        </b-form-group>
                        <b-form-group label="Description:"  label-cols="3" label-align="right">
                            <b-form-input
                                    type="text"
                                    v-model="editing.coursework.description"
                                    required
                                    placeholder="Enter description" />
                        </b-form-group>
                        <b-form-group label="Requirements:" label-cols="3" label-align="right">
                            <b-form-textarea
                                    v-model="editing.coursework.requirements"
                                    required
                                    rows="5"
                                    max-rows="8"
                                    placeholder="Enter requirements" />
                        </b-form-group>




                        <b-button @click="save" variant="primary" style="float:right;">Submit</b-button>
                        <b-button @click="editing = null" style="float:right;">Cancel</b-button>
                    </b-form>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../../auth'
    export default {
        computed: {
            selectedFaculty() {
                return this.faculties.find( _ => _._id ===this.editing.facultyId).name + " Course: " + this.editing.course;
            }
        },
        data() {
            return {
                fields: [{
                    key: 'studentId', label: 'Student', sortable: true, formatter: (studentId) => {
                        let text = '';
                        if (studentId) {
                            let student = this.students.find(_ => _._id === studentId);
                            text = student.fName + " " + student.lName;
                        }
                        return text;
                    }
                }, {
                    key: 'coursework.topic', sortable: true, label: 'Topic'
                }, {
                    key: 'facultyId', sortable: true, label: 'Faculty',
                    formatter: (facultyId) => this.faculties.find(_ => _._id === facultyId).name
                }, {
                    key: 'course', sortable: true, label: 'Course'
                }, {
                    key: 'status', sortable: true, label: 'Status', formatter: (v, k, item) => {
                        if (item.coursework) {
                            return item.status
                        } else {
                            return 'not defined'
                        }
                    }
                }],
                selected: null,
                editing: null,
                items: [],
                students: [],
                faculties: [],
                message: null,
            }
        },
        methods: {
            rowSelected(items) {
                this.selected = items[0];
            },
            modify() {
                if (!this.selected.hasOwnProperty('coursework')) this.selected.coursework = {};
                this.editing = JSON.parse(JSON.stringify(this.selected));
            },
            save() {
                this.db.patch(this.editing._id, {coursework: this.editing.coursework}).then(
                    doc => Object.assign(this.selected, doc)
                );
                this.editing = null;
            },
            approve(approve) {
                this.db.patch(this.selected._id, {status: approve ? 'assigned' : 'rejected'}).then(
                    doc => Object.assign(this.selected, doc)
                );
            }
        },
        mounted() {
            Promise.all([
                this.db.find({selector: {type: 'student'}}).then( ({docs}) => this.students = docs ),
                this.db.find({selector: {type: 'faculty'}}).then( ({docs}) => this.faculties = docs )
            ]).then( _ => {
                let teacherId = auth.getUser()._id;

                this.db.find({selector: {
                    type: 'assignment',
                    teacherId: teacherId
                }}).then( ({docs}) => this.items = docs );
            });
        }
    }
</script>

<style scoped>

</style>