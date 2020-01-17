<template>
  <div class="results">
    <b-container>
      <b-row>
        <h1>Results</h1>
      </b-row>
      <hr>
      <b-row v-for="(candidate, index) in candidates" v-bind:key="index">
        {{candidate.name}}
      </b-row>
    </b-container>
  
  </div>
</template>
<script>
  import { db } from '../db'
  const polls = db.collection('polls') // this is not a live binding
  export default {
    name: "results",
    data() {
      return {
        candidates: [],
        question: ""
      }
    },
    created:function(){
      polls.doc(this.$route.params.pollid).get().then(snapshot=>{
        this.candidates = snapshot.data().candidates
        this.question = snapshot.data().question
        this.candidates.sort((a,b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0));
      })// this gets the candidates list from the firebase db without doing any live binding

// this.$route.params.pollid


    },
  };


</script>