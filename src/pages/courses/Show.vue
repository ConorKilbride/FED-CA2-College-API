<template>
  <b-col>
    <h2>Show Course Page</h2>
    <p>
      <b>Title:</b> {{ course.title }}
    </p>
    <p>
      <b>Description:</b> {{ course.description }}
    </p>
    <p>
      <b>Points:</b> {{ course.points }}
    </p>
    <p>
      <b>Level:</b> {{ course.level }}
    </p>
    <b-button @click="cancel()" variant="primary">Go Back</b-button>
    <b-button :to="{ name: 'courses_edit', params: { id: $route.params.id } }" class="float-right" variant="warning">Edit</b-button>
    <b-button @click="deleteCourse()" variant="danger">Delete</b-button>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: "CoursesShow",
  components: {},
  data(){
      return {
          course: {}
      }
  },
  mounted(){
      this.getData()
  },
  methods: {
      getData() {

        let token = localStorage.getItem('token')

          axios
            .get(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
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
      },
      deleteCourse() {

        let token = localStorage.getItem('token')

        if(confirm("Are you sure you want to delete this course?")){
          axios
          .delete(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
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
          alert("Course successfully deleted")
        }
      },
      cancel() {
            this.$router.go(-1)
      }
  }
};
</script>
