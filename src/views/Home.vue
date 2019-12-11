<template>
  <div class="home">
    <b-form-input v-model="acandidate"></b-form-input>
    <b-button v-on:click="addPollElement()" variant="primary">Add Option</b-button>
    <p>
      Choices:
    </p>
    <div v-for="(candidate, index) in candidates" v-bind:key="index">
        {{candidate.name}} <b-button v-on:click="removePollElement(index)" variant="danger">Remove Poll Option</b-button>
    </div>
    <b-button v-on:click="createPoll()" variant="success">Create Poll</b-button>
    here is the link to your survey:
    <router-link :to="{ path: '/vote/'+ this.newpollID}">Click here</router-link>
  </div>
</template>

<script>
import { db } from '../db'
export default {
  name: "create",
  data(){
      return{
        nextid: 1,
        acandidate: "",
        candidates: [],
        ballots_list: [],
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
      console.log("submitted poll to firebase")
      // make a new poll with a candidates list matching what we have on the page. store the id of this poll in newpollID so we can generate a link for the user
      db.collection("polls").add({
        candidates: this.candidates,
        ballots: this.ballots_list
      }).then(
        result=>{
          this.newpollID = result.id
        }
      )
      
    },
  }
};
</script>
