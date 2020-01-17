<template>
  <div class="vote">
    <b-container class="mt-5 p-3">
      <b-row>
        <h1>Vote</h1>
      </b-row>
      <hr>
      <b-row>
        <h3>Drag to arrange options in order of preference</h3>
      </b-row>
      <hr>
      <b-row>
        <h3>{{question}}</h3>
      </b-row>
      <b-row>
      <draggable class="list-group mb-3" :list="candidates" group="people">
        <div class="list-group-item" v-for="(element, index) in candidates" v-bind:key="index">
          {{ index + 1 }} {{ element.name }} 
        </div>
      </draggable>
      </b-row>
      <hr>
      <b-row>
        <b-button v-on:click="submitBallot()" variant="primary">Submit Vote</b-button>
      </b-row>
     
    
      
      
    </b-container>
  </div>
  
</template>
<style scoped>
  .list-group-item{
    color:
  }
</style>
<script>
import { db } from '../db'
import draggable from "vuedraggable";
const polls = db.collection('polls') // this is not a live binding






export default {
  name: "vote",
  components: {
    draggable
  },
  data() {
    return {
      title: "",
      candidates: [],
      saved_candidates: [],
      currentPoll: null,
      ballots: [],
      ballot: []
    }
  },
  
  created:function(){
    polls.doc(this.$route.params.pollid).get().then(snapshot=>{this.candidates = snapshot.data().candidates, this.title = snapshot.data().question})// this gets the candidates list from the firebase db without doing any live binding

// this.$route.params.pollid


  },
    watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(id) {
        this.$bind('currentPoll', polls.doc(this.$route.params.pollid))
      },
    },
  },
  methods:{

    submitBallot(){
      polls.doc(this.$route.params.pollid).get().then(snapshot=>{
        this.saved_candidates = snapshot.data().candidates, this.gofast()
  
        })
    },
    gofast(){
      for(var i = 0; i < this.candidates.length; i++){
        this.saved_candidates[this.candidates[i].original_index].votes += this.candidates.length - i
      }
      polls.doc(this.$route.params.pollid).update({candidates: this.saved_candidates})
  
    },
    log(){
      
    } 

  }
};
</script>