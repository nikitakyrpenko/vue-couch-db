<template>
    <b-container fluid class = "editor">
        <div :style="{display: editing ? 'none' : 'block'}">
            <b-button style="float:right" @click="add">Add</b-button>
            <b-button :disabled="!selected" class="mb-2" @click="modify" style="float:right">Modify</b-button>
            <b-button :disabled="!selected" @click="remove" style="float:right">Delete</b-button>
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

            <legend >Workload</legend>
            <b-form-group label="Faculty:" label-for="faculty" label-cols="3" label-align="right">
                <b-form-select
                        id="faculty"
                        v-model="editing.facultyId"
                        value-field="_id"
                        text-field="name"
                        :options="faculties"
                        :value="null">
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="courses.length > 0" label="Course:" label-for="course" label-cols="3" label-align="right">
                <b-form-select
                        id="course"
                        v-model="editing.course"
                        :options="courses"
                        :value="null">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Teacher:" label-for="teacher" label-cols="3" label-align="right">
                <b-form-select
                        id="teacher"
                        v-model="editing.teacherId"
                        value-field="id"
                        text-field="name"
                        :options="teacherSelection"
                        :value="null">
                </b-form-select>
            </b-form-group>

            <legend >Deadlines</legend>
            <b-form-group label="Assignment date:" label-for="dead-line-assignment" label-cols="3" label-align="right">
                <datepicker id="dead-line-assignment" :readonly="true"
                            format="YYYY-MM-DD"
                            v-model="editing.deadlines.assignment"
                />
            </b-form-group>
            <b-form-group label="Preliminary defence:" label-for="dead-line-predefence" label-cols="3" label-align="right">
                <datepicker id="dead-line-pre-defence" :readonly="true"
                            format="YYYY-MM-DD"
                            v-model="editing.deadlines.predefence"
                />
            </b-form-group>
            <b-form-group label="Defence date:" label-for="dead-line-defence" label-cols="3" label-align="right">
                <datepicker id="dead-line-defence" :readonly="true"
                            format="YYYY-MM-DD"
                            v-model="editing.deadlines.defence"
                />
            </b-form-group>


            <b-button @click="save" variant="primary" style="float:right;">Submit</b-button>
            <b-button @click="editing = null" style="float:right;">Cancel</b-button>
        </b-form>
    </b-container>
</template>

<script>
    import datepicker from '../DatePicker'

    export default {
        components: {
            datepicker
        },
        props: {
            teachers: Array,
            faculties: Array
        },
        computed: {
            teacherSelection() {
                return this.teachers.map( _ => ({
                    name: _.fName + ' ' + _.lName,
                    id: _._id
                }))
            },
            courses() {
                if (this.editing.hasOwnProperty('facultyId')) {
                    let nOfCourses = this.faculties.find( _ => _._id === this.editing.facultyId).courses;
                    return Array.from(Array(nOfCourses).keys()).map( _ => _ + 1)
                } else return []
            }
        },
        data() {
            return {
                fields: [{
                    key: 'teacherId', label: 'Teacher', sortable: true, formatter: (teacherId) => {
                        let teacher = this.teachers.find(_ => _._id === teacherId);
                        return teacher.fName + " " + teacher.lName;
                    }
                }, {
                    key: 'facultyId', sortable: true, label: 'Faculty',
                    formatter: (facultyId) => this.faculties.find(_ => _._id === facultyId).name
                }, {
                    key: 'course', sortable: true, label: 'Course'
                }, {
                    key: 'deadlines.defence', sortable: true, label: 'Defence'
                }],
                items: [],
                selected: null,
                editing: null
            }
        },
        methods: {
            rowSelected(items) {
                this.selected = items[0];
            },
            add() {
                this.selected = null;
                this.$refs.table.selectedRows = [];
                this.editing = {
                    deadlines: {},
                    studentId: null,
                    status: null
                };
            },
            remove() {
                /*this.api.delete('/users/teacher', this.selected).then(() => {
                    this.items.splice( this.items.findIndex(_ => _.id === this.selected.id), 1 );
                })*/
            },
            modify() {
                this.editing = JSON.parse(JSON.stringify(this.selected));
            },
            save() {
                this.db.insert('assignment', this.editing).then( doc => {
                    if (this.selected) {
                        Object.assign(this.selected, doc);
                    } else {
                        this.items.push(doc)
                    }
                });
                this.editing = null;
            }
        },
        mounted() {
            this.db.find({selector: {type: 'assignment'}}).then( ({docs}) => this.items = docs );
        }
    }
</script>

<style scoped>

</style>