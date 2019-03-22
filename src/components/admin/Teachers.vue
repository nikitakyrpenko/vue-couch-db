<template>
    <b-container fluid class = "editor">
        <div :style = "{display: editing ? 'none' : 'block'}">
            <b-button style = "float:right" @click="add">Add</b-button>
            <b-button :disabled="!selected" class = "mb-2" @click="modify" style = "float:right">Modify</b-button>
            <b-button :disabled="!selected" @click="remove" style = "float:right">Delete</b-button>
            <b-table :fields="fields"
                    ref="table"
                    id = "_id"
                    selectable
                    select-mode="single"
                    selectedVariant="success"
                    :items="items"
                    @row-selected="rowSelected"
            />
        </div>
        <b-form v-if="editing"  >

            <b-form-group label="First Name:" label-for="fName" label-cols="3" label-align="right">
                <b-form-input
                        id="fName"
                        type="text"
                        v-model="editing.fName"
                        required
                        placeholder="Enter first name" />
            </b-form-group>
            <b-form-group label="Last Name:" label-for="lName" label-cols="3" label-align="right">
                <b-form-input
                        id="lName"
                        type="text"
                        v-model="editing.lName"
                        required
                        placeholder="Enter last name" />
            </b-form-group>
            <b-form-group label="Email:" label-for="email" label-cols="3" label-align="right">
                <b-form-input
                        id="email"
                        type="email"
                        v-model="editing.email"
                        required
                        placeholder="Enter email" />
            </b-form-group>
            <b-form-group label="Phone:" label-for="phone" label-cols="3" label-align="right">
                <b-form-input
                        id="phone"
                        type="text"
                        v-model="editing.phone"
                        required
                        placeholder="Enter phone" />
            </b-form-group>
            <b-form-group label="Password:" label-for="password" label-cols="3" label-align="right">
                <b-form-input
                        id="password"
                        type="password"
                        v-model="editing.password"
                        required
                        placeholder="Enter password" />
            </b-form-group>

            <b-button @click="save" variant="primary" style = "float:right;">Submit</b-button>
            <b-button @click="editing = null" style = "float:right;">Cancel</b-button>
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
                fields:[{
                    key: 'fName', label: 'Name', formatter: (value, key, item) => item.fName + ' ' + item.lName
                }, {
                    key: 'phone', label: 'Phone'
                },{
                    key: 'email', label: 'Email'
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
                /*this.api.delete('/users/teacher', this.selected).then( _ => {
                    this.items.splice( this.items.findIndex( _ => _.id === this.selected.id ) , 1 );
                })*/
            },
            modify() {
                this.editing = JSON.parse(JSON.stringify( this.selected ));
            },
            save() {
                this.db.insert('teacher', this.editing).then( doc => {
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