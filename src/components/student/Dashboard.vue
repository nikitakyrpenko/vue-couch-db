<template>
    <div class="card" v-if="coursework">
        <div class="card-header">
            <b-badge variant="dark" class="float-right">{{coursework.complexity}}</b-badge>
            <a :href="'mailto:' + teacher.email"> {{this.teacher.fName}} {{this.teacher.lName}}</a> ( {{teacher.phone}} )
            <b-badge :variant="status.variant" class="float-right mr-3">{{status.description}}</b-badge>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{coursework.topic}}</h5>
            <hr>
            <h5>Deadlines</h5>
            <div class = "pl-5">
                <p class="card-text">Assignment: {{deadlines.assignment}}</p>
                <p class="card-text">Preliminary defence: {{deadlines.predefence}}</p>
                <p class="card-text">Defence: {{deadlines.defence}}</p>
            </div>
            <hr>
            <p class="card-text">{{coursework.description}}</p>
            <p class="card-text">{{coursework.requirements}}</p>

        </div>
    </div>
</template>

<script>
    import auth from '../../auth'

    export default {
        data: function () {
            return {
                teacher: null,
                coursework: null,
                deadlines: null,
                status: {
                    description: null,
                    variant: null
                },
                statuses: {
                    assigned: {variant: 'success', description: 'Прийнято'},
                    rejected: {variant: 'danger', description: 'Вiдхилено'},
                    applied: {variant: 'warning', description: 'На розглядi'}
                }
            }
        },
        mounted() {
            let user = auth.getUser();
            let transact = {};

            this.db.find({
                selector: {
                    type: 'assignment',
                    studentId: user._id
                }
            }).then(({docs}) => {
                if (docs.length === 0) throw 'no courseworks assigne';
                Object.assign(transact, {coursework: docs[0].coursework}, {deadlines: docs[0].deadlines}, {status: this.statuses[docs[0].status]});
                return this.db.get(docs[0].teacherId)
            }).then(
                teacher => Object.assign(this, transact, {teacher: teacher})
            ).catch( e => this.message = e);
        }
    }
</script>

<style scoped>

</style>