<template>
    <b-col>
        <h2> This is the Lecturers index page </h2>

        <b-button :to="{ name : 'lecturers_create' }" variant="primary" class="mb-2 float-right">Add</b-button>

		<b-table striped hover responsive headVariant="dark" :items="lecturers" :fields="headings">

			<template #cell(name)="data">
				<router-link :to="{ name: 'lecturers_show', params:{ id: data.item.id }}">{{ data.value }}</router-link>
			</template>

		</b-table>
<!-- 
        <p
            v-for="lecturer in lecturers"
            :key="lecturer.id"
        >

       <router-link :to="{name:'lecturers_show', params: { id: lecturer.id}}">
            {{ lecturer.name }}
        </router-link>

        </p> -->
        
    </b-col>
</template>

<script>
import axios from 'axios'

// const COURSE_URL = "https://college-api-mo.herokuapp.com/api/"

export default {
    name: 'LecturersIndex',
    components: {
        
    },
    data() {
        return {
            headings: [
				{
					key: 'name',
					sortable: true
				},
					'address',
				{
					key: 'email',
				},
				{
					key: 'phone',
				}
			],
            lecturers: []
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData() {

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
        }
    }
}
</script>

<style>

/* ${COURSE_URL} */

/* eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiNzE0N2QwZjAzZGQyZGMyNGMwZDQ5ZjBkOTg2MDExMmFmYTZmMzY0OGM5YWQ1MzdkNDkwZTExOTJkMDg1MGM5Yzk1NzlkMzc5NTI0MTczYjEiLCJpYXQiOiIxNjM3ODQzNzU4LjcwNTUwNyIsIm5iZiI6IjE2Mzc4NDM3NTguNzA1NTExIiwiZXhwIjoiMTY2OTM3OTc1OC43MDIxNDAiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Jd-XuT_486Q1Rmy0oIWSZkNN_1lSMbYJxgygLW4K9WlY_S5N0bpISrfFbIo00kAnJotM-Q2-RGGCa7DspGpMoaDY0p3BkVEG-ZEFyMqLOjz6jCyo7_coLFi26biYkWo5gjtuF2KTQM193wom0sHzqQBiQ_vkpJ6omo_8VfrzsG9TPNGB8pcn-ABlSKIoJzj1z4vKO4qeQUlZ_vj0s3d65jbpTVtHjcCshXHWxCFsD9osrpRoXn0T1nJSLqgA374Xwg-ER7OksUngatouIKv4QVzNUC_jlkrZpEifN9qJw1jvT0e3VwaYqQMq7GgL6pclH4-WJ6ZIKaDCf6eP-TWNKpYCNQFhKHqJATrHeHZWBCuTGUrlv9vmr2fQAuvJDhzU35KBtW3ZjHgT7HtmpucHFSV1pEvflUOPkeE27X15s4Eheqpb_TzSqzTC2ZK3M1iTN7Ltgdn0Ya4vBYbyyVheb6nJMc3MkSc6p38dNWO4uSd6UNXaV-yNMR55oXatmRVVC0m40M4nWcyPkl1kcAQY7Rbrervl0btmDP-fkr2VN6ujJUdACmNALkkcAaYVkP0YG7LBW0wZ2MtpMnRIXOt4ifCW7ht3LWyS91MRWdB7lTOd6sGjhmSudvcEDDyOqH-2rxeGYpXXrMiWH49ThHC8KMRXNw75-uf7B3Nz36gvpvQ */

</style>