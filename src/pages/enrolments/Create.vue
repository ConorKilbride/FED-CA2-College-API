<template>
    <b-col>
        <h2>Create Enrolment</h2>

        <!-- form for creating enrolment -->
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


        <!-- I wasnt able to get course or lecturer to work, I could not find where I was going wrong -->
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
const URL = "https://college-api-mo.herokuapp.com/api/"

export default {
	name: "EnrolmentsCreate",
    data() {
        return {
            lecturers: [],
            courses: [],
            form : {
                status: "",
                course_id: "",
                lecturer_id: "",
                date: "",
                time: ""
            }
        }
    },
    methods: {
        submitForm() {
            
            let token = localStorage.getItem('token')

            axios.post(`${URL}enrolments`, this.form, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })
                 .then(response => {
                     console.log(response.data)
                     this.$router.push({
                         name: "enrolments_index"
                     })
                 })
                 .catch(err =>{ 
                     console.log(err)
                     console.log(err.response.data.errors)
                 })
        },
        getLecturers() {
            let token = localStorage.getItem('token')

            axios
            .get(`https://college-api-mo.herokuapp.com/api/lecturers`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
                // ${token}
              }
            })
            .then(response => {
                console.log(response.data)
                this.lecturers = response.data.data
            })
            .catch(error => {
              console.log(error)
              this.$emit('invalid-token')
            })
        },
        getCourses() {
            let token = localStorage.getItem('token')

            axios
            .get(`https://college-api-mo.herokuapp.com/api/courses`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
                // ${token}
              }
            })
            .then(response => {
                console.log(response.data)
                this.courses = response.data.data
            })
            .catch(error => {
              console.log(error)
              this.$emit('invalid-token')
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