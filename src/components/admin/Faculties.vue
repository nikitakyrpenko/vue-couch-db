<template>
    <b-container fluid class="editor">
        <div :style="{display: editing ? 'none' : 'block'}">
            <b-button style="float:right" @click="add">Add</b-button>
            <b-button :disabled="!selected" class="mb-2" @click="modify" style="float:right">Modify</b-button>
            <b-button :disabled="!selected" @click="remove" style="float:right">Delete</b-button>
            <b-table :fields="fields"
                     ref="table"
                     id="_id"
                     selectable
                     select-mode="single"
                     selectedVariant="success"
                     :items="items"
                     @row-selected="rowSelected"

            />
        </div>
        <b-form v-if="editing">

            <b-form-group label="Faculty" label-for="faculty" label-cols="3" label-align="right">
                <b-form-input
                        id="faculty"
                        type="text"
                        v-model="editing.name"
                        required
                        placeholder="Enter faculty name"/>
            </b-form-group>
            <b-form-group label="# of Courses:" label-for="courses" label-cols="3" label-align="right">
                <b-form-input
                        id="courses"
                        type="number"
                        v-model.number="editing.courses"
                        required
                        placeholder="Enter # of courses"/>
            </b-form-group>


            <b-button @click="save" variant="primary" style="float:right;">Submit</b-button>
            <b-button @click="editing = null" style="float:right;">Cancel</b-button>
        </b-form>
    </b-container>
</template>

<script>
    export default {
        props: {
            items: Array
        },
        data() {
            return {
                fields: [{
                    key: 'name', label: 'Faculty name'
                }, {
                    key: 'courses', label: '# of courses'
                }],
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
                this.editing = {};
            },
            remove() {
                /*this.api.delete('/faculties', this.selected).then(_ => {
                    this.items.splice(this.items.findIndex(_ => {
                        _._id === this.selected._id
                    }), 1);
                })*/

            },
            modify() {
                this.editing = JSON.parse(JSON.stringify(this.selected));
            },
            save() {
                this.db.insert('faculty', this.editing).then(doc => {
                    if (this.selected) {
                        Object.assign(this.selected, doc);
                    } else {
                        this.items.push(doc)
                    }
                });
                this.editing = null;
            }
        }
    }
</script>

<style scoped>

</style>