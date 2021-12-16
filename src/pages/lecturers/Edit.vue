<template>
    <b-col>
        <h2>Edit Lecturer</h2>

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
	name: "LecturersEdit",
    data() {
        return {
            //I tried having their current details show on the edit form but the text appears for a second then dissapears.
            form : {
                name: "",
                address: "",
                email: "",
                phone: ""
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData() {
            
            let token = localStorage.getItem('token')

            axios.get(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
            {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                    console.log(response.data)

                    this.form.name = response.data.name,
                    this.form.address = response.data.address,
                    this.form.email = response.data.email,
                    this.form.phone = response.data.phone
                 })
                 .catch(err =>{ 
                    console.log(err)
                    console.log(err.response.data.errors)
                 })
        },
        submitForm() {
            let token = localStorage.getItem('token')

            axios.put(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`, this.form, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                     console.log(response.data)
                     this.$router.push({
                         name: "lecturers_show",
                         params: {
                             id: this.$route.params.id
                         }
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