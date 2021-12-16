<template>
    <b-col>
        <h2>Add Lecturer</h2>

        <b-form-group
            label="Name"
            label-for="name-input"
        >
            <b-form-input
                id="name-input"
                v-model="form.name"
                type="text"
                required
            ></b-form-input>

        </b-form-group>

        <b-form-group
            label="Address"
            label-for="address-input"
        >
            <b-form-input
                id="address-input"
                v-model="form.address"
                rows="3"
                max-rows="6"
            ></b-form-input>

        </b-form-group>

        <b-form-group
                label="Email"
                label-for="email-input"
        >
            <b-form-input
                id="email-input"
                v-model="form.email"
                type="text"
                required
            ></b-form-input>

        </b-form-group>

        <b-form-group
                label="Phone"
                label-for="phone-input"
        >
            <b-form-input
                id="phone-input"
                v-model="form.phone"
                type="text"
                required
            ></b-form-input>

        </b-form-group>
        <br>
        <b-button @click="submitForm()" variant="primary">Submit</b-button>
        <b-button :to="{ name: 'lecturers_index' }" variant="danger">Cancel</b-button>
    </b-col>
</template>
<script>
import axios from 'axios'

export default {
	name: "LecturersCreate",
    data() {
        return {
            form : {
                name: "",
                address: "",
                email: "",
                phone: ""
            }
        }
    },
    methods: {
        submitForm() {
            
            let token = localStorage.getItem('token')

            axios.post('https://college-api-mo.herokuapp.com/api/lecturers', this.form, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                     console.log(response.data)
                     this.$router.push({
                         name: "lecturers_index"
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