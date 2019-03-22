<template>
    <div>
        <h1 style = "text-align:center;" class="h3 mb-3 font-weight-normal">Student registration</h1>
        <b-alert variant="success" :show="registered" style="margin:0 20px 0 20px; text-align:center;">
            Registration completed successfully. Check your email for sign in details.
        </b-alert>
        <b-form @submit="onSubmit" @reset="onReset" class="form-center">

            <b-form-group label="Email address:" label-for="email" label-cols="4" label-align="right">
                <b-form-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email" />
            </b-form-group>

            <b-form-group label="First Name:" label-for="fName" label-cols="4" label-align="right">
                <b-form-input
                        id="fName"
                        type="text"
                        v-model="form.fName"
                        required
                        placeholder="Enter first name" />
            </b-form-group>

            <b-form-group label="Last Name:" label-for="lName" label-cols="4" label-align="right">
                <b-form-input
                        id="lName"
                        type="text"
                        v-model="form.lName"
                        required
                        placeholder="Enter last name" />
            </b-form-group>

            <b-form-group label="Phone:" label-for="phone" label-cols="4" label-align="right">
                <b-form-input
                        id="phone"
                        type="text"
                        v-model="form.phone"
                        required
                        placeholder="Enter phone" />
            </b-form-group>

            <b-form-group label="Password:" label-for="password" label-cols="4" label-align="right">
                <b-form-input
                        id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password" />
            </b-form-group>

            <b-form-group label="Faculty:" label-for="faculty" label-cols="4" label-align="right">
                <b-form-select id="faculty" :options="faculties"
                               required
                               value-field="_id"
                               text-field="name"
                               v-model="form.faculty" />
            </b-form-group>

            <b-form-group v-if="form.faculty"  label="Course:" label-for="course" label-cols="4" label-align="right">
                <b-form-select id="course" :options="courses" required v-model="form.course" />
            </b-form-group>

            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="submit" variant="primary" style = "float:right;">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    fName: '',
                    lName: '',
                    phone: '',
                    password: null,
                    course: null,
                    faculty: null
                },
                faculties: [],
                registered: false
            }
        },
        computed: {
            courses() {
                if (this.form.faculty) {
                    let nOfCourses = this.faculties.find( _ => _._id === this.form.faculty).courses;
                    return [
                        {text: 'Select One', value: null},
                        ...Array.from(Array(nOfCourses).keys()).map( _ => _ + 1)
                    ]
                } else return []
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.db.insert('student', this.form).then( _ => {
                    this.registered = true;
                    setTimeout( () => this.$router.push({path: '/'}), 4000);
                })

            },

            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.form.email = ''
                this.form.name = ''

                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        mounted () {
            let emptyItem = { name: 'Select One', _id: null };

            this.db.find({selector: {type: 'faculty'}}).then( ({docs}) => {
                this.faculties = [emptyItem, ...docs]
            } );
        }
    }
</script>
<style scoped>
    .form-center .form-control {
        padding: 7px;
    }
</style>

