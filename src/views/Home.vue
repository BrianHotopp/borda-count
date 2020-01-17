<template>
  <div class="home">
    <div id = "header">
  
</div>
    <b-container class="head">
      <b-row>
        <h1 class="float-left mt-5">
          Borda count strawpoll
        </h1>
        
      </b-row>
      <hr>
    </b-container>
    
    <b-container class="mt-5 p-3">
      
       <b-row>
        <h2>Enter Poll Text</h2>
      </b-row>
      <b-row>
        <b-form-input v-model="aquestion" class="mb-3 p-3 inputsize"></b-form-input>
      </b-row>
      <b-row>
        <h2>Enter Poll Option</h2>
      </b-row>
      <b-row >
         
        <b-form-input v-model="acandidate" class="mb-3 p-3 inputsize"></b-form-input>
        
      </b-row>
      <b-row>
        <b-button v-on:click="addPollElement()" variant="primary" class="mb-3">Add Option</b-button>
      </b-row>
      <hr>
      <b-row v-if="candidates.length">
        <p>
          Your Poll Options:
        </p>
      </b-row>
      
      <b-row v-for="(candidate, index) in candidates" v-bind:key="index" class="m-1">
        <b-col>
          {{candidate.name}} 
        </b-col>
        <b-col>
          <b-button v-on:click="removePollElement(index)" variant="danger">Remove Poll Option</b-button>
        </b-col>
          
      </b-row>
      
      <b-row>
      <b-button v-on:click="createPoll()" variant="success">Create Poll</b-button>
      </b-row>
      
      
    </b-container>
  </div>
</template>
<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
}
body {
  background-color:#55828b;
  color:#c9e4ca;
}
  
  .inputsize{
    max-width: 600px;
  }
</style>
<script>
import { db } from '../db'
export default {
  name: "create",
  data(){
      return{
        nextid: 1,
        acandidate: "",
        aquestion: "",
        candidates: [],
        newpollID: ""
      }
    },
  methods:{
    addPollElement(){
      this.candidates.push({name: this.acandidate, votes: 0, original_index: this.candidates.length});
      this.acandidate = '';
    },
    removePollElement(index){
      this.candidates.splice(index, 1);
    },
    createPoll(){

      // make a new poll with a candidates list matching what we have on the page. store the id of this poll in newpollID so we can generate a link for the user
      db.collection("polls").add({
        question: this.aquestion,
        candidates: this.candidates
      }).then(
        result=>{
          
          this.newpollID = result.id
          const temp = '/vote/' + result.id
          console.log(result.id)
          
          this.$router.push({ path: temp })
        }
      )
      
    },
  }
};
</script>
