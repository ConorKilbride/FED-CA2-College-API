<template>
    <div>
       <b-card-group columns>
            <b-card
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                    <p><b>Country: </b>{{ university.country }}</p>
                </b-card-text>
                
                <b-card-text>
                    <p><b>Name: </b>{{ university.name }}</p>
                </b-card-text>

                <!-- taking the url link from my api and displaying it as a hyperlink -->
                <b-card-text>
                    <b>Website: </b><a v-bind:href="address" target="_blank">{{ university.web_pages[0] }}</a>
                </b-card-text>
                
            </b-card>
        </b-card-group>
    </div>    
</template>

<script>
export default {
    name: 'UniversityViewer',
    props: {
        university: Object
    },
    data() {
        return {
            address: this.university.web_pages[0]
        }
    }
}
</script>

<style>


</style>