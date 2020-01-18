<template>
  <div class="results">
    <b-container class="mt-5 p-3">
      <b-row>
        <h1>Results</h1>
      </b-row>
      <hr>
      <b-row>
        <h2>{{question}}</h2>
      </b-row>
      <b-row v-for="(candidate, index) in candidates" v-bind:key="index">
        {{index + 1}}. {{candidate.name}}
      </b-row>
      <b-row>
        <pure-vue-chart v-if="graphdata.length" class="mt-4"
          :points=graphdata
          :show-y-axis="false"
          :show-x-axis="true"
          :width=windowWidth
          :height=200
          :show-values="true"
          
        />
      </b-row>
    </b-container>
  
  </div>
</template>
<style>
  
</style>
<script>
  import { db } from '../db'
  import PureVueChart from 'pure-vue-chart'
  const polls = db.collection('polls') // this is not a live binding
  export default {
    name: "results",
    data() {
      return {
        candidates: [],
        question: "",
        graphdata: [],
        windowWidth: Math.min(window.innerWidth, 600),
      }
    },

    created:function(){
      polls.doc(this.$route.params.pollid).get().then(snapshot=>{
        this.candidates = snapshot.data().candidates
        this.question = snapshot.data().question
        this.candidates.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0));
        this.candidates.forEach(element => {

        this.graphdata.push({"label": element.name, "value": element.votes})

      });
      })// this gets the candidates list from the firebase db without doing any live binding
      
      
   
// this.$route.params.pollid


    },
    components: {
    PureVueChart,
    },
  };


</script>