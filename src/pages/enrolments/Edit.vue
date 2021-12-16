<template>
    <b-col>
        <h2>Edit Enrolment</h2>

        <b-form-group
                label="Status"
                label-for="status-input"
        >
            <b-form-select
                v-model="form.status"
            >
                <b-form-select-option :value="0">
                    assigned
                </b-form-select-option>
                <b-form-select-option :value="1">
                    associate
                </b-form-select-option>
                <b-form-select-option :value="2">
                    career break
                </b-form-select-option>
                <b-form-select-option :value="3">
                    interested
                </b-form-select-option>
            </b-form-select>

        </b-form-group>


        <!-- I wasnt able to get course id or lecturer id to work, I could not find where I was going wrong -->
        <b-form-group
                label="Course"
                label-for="course_id-input"
        >
            <b-form-select v-model="form.course_id">
                <b-form-select-option :value="0">
                    Please select a Course
                </b-form-select-option>
                <b-form-select-option v-for="course in courses" :key="course.id" :value="course.id">
                    {{ lecturer.name }}
                </b-form-select-option>
            </b-form-select>

        </b-form-group>

        <b-form-group
                label="Lecturer"
                label-for="lecturer_id-input"
        >
            <b-form-select v-model="form.lecturer_id">
                <b-form-select-option :value="0">
                    Please select a Lecturer
                </b-form-select-option>
                <b-form-select-option v-for="lecturer in lecturers" :key="lecturer.id" :value="lecturer.id">
                    {{ lecturer.name }}
                </b-form-select-option>
            </b-form-select>

        </b-form-group>

        <b-form-group
            label="Date"
            label-for="date-input"
        >
            <b-form-datepicker
                id="date-input"
                v-model="form.date"
                placeholder="Please select the current date" 
                type="text"
                required
            ></b-form-datepicker>

        </b-form-group>

        <b-form-group
            label="Time"
            label-for="time-input"
        >
            <b-form-timepicker
                id="time-input"
                v-model="form.time"
                show-seconds locale="en"
                placeholder="Please select the current time" 
                rows="3"
                max-rows="6"
            ></b-form-timepicker>

        </b-form-group>
        <br>
        <b-button @click="submitForm()" variant="primary">Submit</b-button>
        <b-button :to="{ name: 'enrolments_index' }" variant="danger">Cancel</b-button>
    </b-col>
</template>
<script>
import axios from 'axios'

export default {
	name: "EnrolmentsEdit",
    data() {
        return {
            //I tried having their current details show on the edit form but the text appears for a second then dissapears.
            form : {
                status: "",
                course_id: "",
                lecturer_id: "",
                date: "",
                time: ""
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData() {
            
            let token = localStorage.getItem('token')

            axios.get(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
            {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                    console.log(response.data)

                    this.form.status = response.data.status,
                    this.form.course_id = response.data.course_id,
                    this.form.lecturer_id = response.data.lecturer_id,
                    this.form.date = response.data.date
                    this.form.time = response.data.time
                 })
                 .catch(err =>{ 
                    console.log(err)
                    console.log(err.response.data.errors)
                 })
        },
        submitForm() {
            let token = localStorage.getItem('token')

            axios.put(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`, this.form, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                     console.log(response.data)
                     this.$router.push({
                         name: "enrolements_show",
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