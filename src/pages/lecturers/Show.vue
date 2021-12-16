<template>
  <b-col>
    <h2>Show Lecturer Page</h2>
    <p>
      <b>Name:</b> {{ lecturer.name }}
    </p>
    <!-- <p>
      {{ lecturer.description }}
    </p> -->
    <b-button @click="cancel()" variant="primary">Go Back</b-button>
    <b-button :to="{ name: 'lecturers_edit', params: { id: $route.params.id } }" class="float-right" variant="warning">Edit</b-button>
    <b-button @click="deleteLecturer()" variant="danger">Delete</b-button>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "LecturersShow",
  components: {},
  data(){
      return {
          lecturer: {}
      }
  },
  mounted(){
      this.getData()
  },
  methods: {
      getData() {

        let token = localStorage.getItem('token')

          axios
            .get(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            .then(response => {
                console.log(response.data)
                this.lecturer = response.data.data
            })
            .catch(error => {
              console.log(error)
            })
      },
      deleteLecturer() {

        let token = localStorage.getItem('token')

        if(confirm("Are you sure you want to delete this lecturer?")){
          axios
          .delete(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
              console.log(response.data)
              this.course = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
          this.$router.go(-1)
        }
      },
      cancel() {
            this.$router.go(-1)
      }
  }
};
</script>
