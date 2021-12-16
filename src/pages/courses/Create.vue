<template>
    <b-col>
        <h2>Create Course</h2>

        <!-- form for creating course -->
        <b-form-group
            label="Title"
            label-for="title-input"
        >
            <b-form-input
                id="title-input"
                v-model="form.title"
                type="text"
                required
            ></b-form-input>

        </b-form-group>

        <b-form-group
            label="Code"
            label-for="code-input"
        >
            <b-form-input
                id="code-input"
                v-model="form.code"
                rows="3"
                max-rows="6"
            ></b-form-input>

        </b-form-group>

        <b-form-group
                label="Description"
                label-for="desc-input"
        >
            <b-form-textarea
                id="desc-input"
                v-model="form.description"
                placeholder="Enter description..."
                type="text"
                required
            ></b-form-textarea>

        </b-form-group>

        <b-form-group
                label="Points"
                label-for="points-input"
        >
            <b-form-input
                id="points-input"
                v-model="form.points"
                type="text"
                required
            ></b-form-input>

        </b-form-group>

        <b-form-group
                label="Level"
                label-for="level-input"
        >
            <b-form-input
                id="level-input"
                v-model="form.level"
                type="text"
                required
            ></b-form-input>

        </b-form-group>
        <br>
        <b-button @click="submitForm()" variant="primary">Submit</b-button>
        <b-button :to="{ name: 'courses_index' }" variant="danger">Cancel</b-button>
    </b-col>
</template>
<script>
import axios from 'axios'
const URL = "https://college-api-mo.herokuapp.com/api/"

export default {
	name: "CoursesCreate",
    data() {
        return {
            form : {
                title: "",
                code: "",
                description: "",
                points: "",
                level: ""
            }
        }
    },
    methods: {
        submitForm() {
            
            let token = localStorage.getItem('token')

            axios.post(`${URL}courses`, this.form, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                     console.log(response.data)
                     this.$router.push({
                         name: "courses_index"
                     })
                 })
                 .catch(err =>{ 
                     console.log(err)
                     console.log(err.response.data.errors)
                 })
        },
        cancel() {
            this.$router.go(-1)
        }
    }
};
</script>
<style >

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZlc3RpdmFscy5pZSIsIl9pZCI6IjYxODAzYTMxNGM2OTczOGEyMGQxOTMyMyIsImlhdCI6MTYzNjYzMDY3N30.olmnzeBVwtQ2fUk1M6SqANOLfSryf2SGkjqlY6_qVcQ" */

</style>