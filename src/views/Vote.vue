<template>
  <div class="vote">
    <h3>Drag Options to vote</h3>
      <draggable class="list-group" :list="candidates" group="people">
        <div class="list-group-item" v-for="(element, index) in candidates" v-bind:key="index">
          {{ element.name }} {{ index + 1 }}
        </div>
      </draggable>
      <b-button v-on:click="submitBallot()" variant="primary">Submit Vote</b-button>
  </div>
  
</template>
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
      candidates: [],
      saved_candidates: [],
      currentPoll: null,
      ballots: [],
      ballot: []
    }
  },
  
  created:function(){
    polls.doc(this.$route.params.pollid).get().then(snapshot=>{this.candidates = snapshot.data().candidates})// this gets the candidates list from the firebase db without doing any live binding
    polls.doc(this.$route.params.pollid).get().then(snapshot=>{this.saved_candidates = snapshot.data().candidates})
    polls.doc(this.$route.params.pollid).get().then(snapshot=>{this.ballots = snapshot.data().ballots})

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