<template>
    <b-container fluid >
          <b-jumbotron header="Phone Book" lead="Phone book simple app.">
            <b-row >
                <b-col>
                    <h5>Create new contact</h5>
                    <b-form @submit="createUser" v-if="show" >
                      <b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
                        <b-form-input
                          id="input-1"
                          v-model="phoneListForm.firstName"
                          placeholder="Enter first name"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group id="input-group-2" label="Lastname:" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          v-model="phoneListForm.lastName"
                          placeholder="Enter last name"
                          required
                        ></b-form-input>
                      </b-form-group>


                      <b-form-group id="input-group-3" label="Phone type:" label-for="input-3">
                        <b-form-select
                          id="input-3"
                          class="select mb-3 form-control"
                          v-model="phoneListForm.phoneType"
                          :options="options"
                          :required="true"
                        ></b-form-select>
                      </b-form-group>

                      <b-form-group id="input-group-4" label="Number:" label-for="input-4">
                        <b-form-input
                          id="input-4"
                            v-model="phoneListForm.number"
                          placeholder="Enter a valid number"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <p v-if="error" style="color:red;margin-top:10px">{{error}}</p>
                      <hr>
                        <b-button variant="primary" v-if="!isOnUpdate" type="submit">Create contact</b-button>
                        <b-button v-if="isOnUpdate" v-on:click="saveList(phoneListForm.id)">Update contact</b-button>
                    </b-form>
                </b-col>
                <b-col cols="8">
                  <h5>Phonebook list</h5>
                  <PhoneBookList 
                      :listUsers="listUsers"
                      :fields="fields"
                      :editNumber="editNumber"
                      :deleteNumber="deleteNumber"
                  /> 
                </b-col>
              
            </b-row>
          </b-jumbotron>
               
    </b-container>
</template>

<script>
import PhoneBookList from '../components/PhoneBookList.vue'
import axios from "axios";

const baseURL = "http://localhost:3001/phonebook";
const options = [
  { value: null, text: 'Select number type'},
  { value: 'Work', text: 'Work' },
  { value: 'Mobile', text: 'Mobile',  },
  { value: 'Home', text: 'Home' }
];
const fields = [
  { key: 'firstName'},
  { key: 'lastName' },
  { key: 'phoneType' },
  { key: 'number' },
  { key: 'Edit' },
  { key: 'Delete' }
]
export default {
    name: 'UserLibrary',
    components:{
        PhoneBookList
    },
    data(){
      return {
            phoneListForm:{
              id: Math.floor(Math.random() * 10000),
              firstName:"",
              lastName: "",
              phoneType:null,
              number: ""
            },
            options: options,
            show:true,
            fields: fields,
            listUsers:[],
            isOnUpdate:false,
            error: undefined,
            sortDesc: false,
            sortBy: 'firstName',
            selected: null,
      }
    },
    mounted() {
        this.getList()
    },
    methods: {
        createUser: async function(e){
            e.preventDefault();
            const isValid = await this.validateNumber(this.phoneListForm)
            if(Object.keys(isValid).length > 0){
              return this.error = isValid.message
            }
            const res = await axios.post(baseURL, this.phoneListForm);
            this.listUsers = [...this.listUsers, res.data];
           
            // this.getList()
            this.emptyForm()
            this.selected = null
        },
        validateNumber: function(form){
          const error = {}
          if(form.number.match(/\d/g)?.length > 7){
            const checkIfExist = !this.isOnUpdate 
              ? this.listUsers.find(list => list.number.toString() === form.number.toString())
              : this.listUsers.find(list => 
                list.number.toString() === form.number.toString() 
                && list.id.toString() !== form.id.toString())
            if(checkIfExist ){
             error.message = "This number exist in phone book!"
            }
          }
          else{
             error.message = "Invalid phone number"
          }
          return error
        },
        deleteNumber: async function(id){
          try{
            await axios.delete(baseURL+'/'+id);
            this.getList()
          }catch(error){
            console.log(error)
          }
        },
        editNumber: function (id){
            this.isOnUpdate = !this.isOnUpdate
            this.phoneListForm = this.listUsers.find(i=>i.id ===id)
           
        },
        saveList: async function(){
            const isValid = await this.validateNumber(this.phoneListForm)
            if(Object.keys(isValid).length > 0){
              return this.error = isValid.message
            }
            try{
              await axios.put(`${baseURL}/${this.phoneListForm.id}`, this.phoneListForm);
              this.emptyForm()
              this.isOnUpdate = !this.isOnUpdate
            }catch(error){
              console.log(error)
            }
            
        },
        getList: async function(){
          try{
            const res = await axios.get(baseURL);
            this.listUsers = res.data;
          }catch(error){
            console.log(error)
          }

        },
        emptyForm(){
            this.phoneListForm = {
              id:Math.floor(Math.random() * 10),
              firstName:"",
              lastName: "",
              phoneType:null,
              number: ""
            }
            this.error = undefined
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
   background-color:"aliceblue"
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.formDiv {
  margin: auto;
  width: 30%;
  border: 1px solid black;
  padding: 10px;
  font-size: 11px;
}
.select {
  width: 100%
}

</style>
