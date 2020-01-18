<template>
  <div class="vote">
    <b-container class="mt-5 p-3">
      
      <b-row>
        <h1>Vote</h1>
      </b-row>
      <hr>
   
      <b-row>
        <b-button v-on:click="copyPollLink()" class="btn btn-outline-light">Poll Share Link (Click to copy)</b-button>
        
      </b-row>
      <b-row>
        <div class="alert alert-success mt-1" role="alert" v-if="copied">
          Link Copied!
        </div>
      </b-row>
      <hr>
      <b-row>
        <h3>Drag to arrange options in order of preference</h3>
      </b-row>
      <hr>
      <b-row>
        <h3>{{title}}</h3>
      </b-row>
      <b-row>
      <draggable class="list-group mb-3" :list="candidates" group="people">
        <div class="list-group-item" v-for="(element, index) in candidates" v-bind:key="index">
        {{ element.name }} 
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
      copied: 0,
      theroute:"",
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
    var path = this.$router.resolve({name: 'vote', params: {id: 1}}).href
    var fullUrl = window.location.origin + "/" + path
    this.theroute = fullUrl
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
    copyPollLink(){
      this.$copyText(window.location.href)
      this.copied = 1
    },
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
      const temp = '/results/' + this.$route.params.pollid
      this.$router.push({ path: temp })
    },
    log(){
      
    } 

  }
};
</script>