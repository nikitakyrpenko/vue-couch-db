<template>
    <b-card :title="fullName">

        <b-card-text>Faculty: {{facultyName}} Course: {{course}}</b-card-text>

        <hr />

        <b-form-group class = "mt-4" label="Email address:" label-for="email" label-cols="3" label-align="left">
            <b-form-input
                    id="email"
                    type="email"
                    v-model="email"
                    :disabled = "mode !== 'editing'"
                    placeholder="Enter email" />
        </b-form-group>
        <b-form-group label="Phone:" label-for="phone" label-cols="3" label-align="left">
            <b-form-input
                    id="phone"
                    type="text"
                    v-model="phone"
                    :disabled = "mode !== 'editing'"
                    placeholder="Enter phone" />
        </b-form-group>
        <ul class="nav justify-content-end">
            <b-nav>
                <b-nav-item @click = "mode === 'editing' ? update() : mode = 'editing'">{{mode === 'editing' ? 'Update' : 'Modify'}}</b-nav-item>
            </b-nav>
        </ul>

    </b-card>
</template>

<script>
    import auth from '../../auth'
    export default {
        data() {
            return {
                _id: null,
                _rev: null,
                fName: '',
                lName: '',
                email: '',
                phone: '',
                course: null,
                faculty: null,
                facultyName: null,
                mode: null,
            }
        },
        computed: {
            fullName() {
                return this.fName + " " + this.lName;
            }
        },
        methods: {
            update() {

                this.db.patch(this._id, {email: this.email, phone: this.phone}).then(
                    () => this.mode = null
                );

            }
        },
        mounted() {
            let user = auth.getUser();

            this.db.get(user._id).then( doc => {
                Object.assign(this, doc);
                return this.db.get(doc.faculty)
            }).then( faculty => Object.assign(this, {facultyName: faculty.name}));
        }
    }
</script>

<style scoped>

</style>