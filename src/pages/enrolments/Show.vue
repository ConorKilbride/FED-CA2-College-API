<template>
  <b-col>
    <h2>Show Enrolments Page</h2>
    <p>
      <b>Status:</b> {{ enrolment.status }}
    </p>
    <p>
      <b>Course:</b> {{ enrolment.course.title }}
    </p>
    <p>
      <b>Lecturer:</b> {{ enrolment.lecturer.name }}
    </p>
    <p>
      <b>Date:</b> {{ enrolment.date }}
    </p>
    <p>
      <b>Time:</b> {{ enrolment.time }}
    </p>
    <b-button :to="{ name: 'enrolments_index' }" variant="primary">Go Back</b-button>
    <b-button :to="{ name: 'enrolments_edit', params: { id: $route.params.id } }" class="float-right" variant="warning">Edit</b-button>
    <b-button @click="deleteEnrolment()" variant="danger">Delete</b-button>
  </b-col>
</template>

<script>
import axios from 'axios'
const URL = "https://college-api-mo.herokuapp.com/api/"

export default {
  name: "EnrolmentsShow",
  components: {},
  data(){
      return {
          enrolment: {}
      }
  },
  mounted(){
      this.getData()
  },
  methods: {
      getData() {

        let token = localStorage.getItem('token')

          axios
            .get(`${URL}enrolments/${this.$route.params.id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            .then(response => {
                console.log(response.data)
                this.enrolment = response.data.data
            })
            .catch(error => {
              console.log(error)
            })
      },
      deleteEnrolment() {

        let token = localStorage.getItem('token')

        if(confirm("Are you sure you want to delete this enrolment?")){
          axios
          .delete(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
              console.log(response.data)
              this.enrolment = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
          this.$router.go(-1)
          alert("Enrolment successfully deleted")
        }
      },
  }
};
</script>
