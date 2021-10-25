<template>
    <div>
        <b-table 
          v-if="listUsers.length" 
          :fields="fields" 
          :items="sortedNames"
        > 
            <template  v-slot:head(firstName)>      
                Contact name <span class="m-2" @click="toggleSorting('firstName')">
                    <i class="fas" :class="{'fa-sort-up': sortFirstNameAsc, 'fa-sort-down': !sortFirstNameAsc}"></i>
                </span>
            </template>
            <template  v-slot:head(lastName)>      
                Contact surname <span class="m-2" @click="toggleSorting('lastName')">
                    <i class="fas" :class="{'fa-sort-up': sortLastName, 'fa-sort-down': !sortLastName}"></i>
                </span>
            </template>
            <template #cell(Edit)="row">      
                <b-button variant="outline-primary" size="sm" v-on:click="editNumber(row.item.id)">Edit</b-button>
            </template>
            <template #cell(Delete)="row">
                <b-button variant="danger" size="sm" v-on:click="deleteNumber(row.item.id)">Delete</b-button>
            </template>
        </b-table>
        <b-card v-if="!listUsers.length">
            <div class="bg-secondary text-light">
                This phone book is empty!
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'PhoneBookList',
  props: ["listUsers","fields","editNumber","deleteNumber"],
  data(){
      return {
            sortFirstNameAsc: true,
            sortLastName: true, 
            searchString:'',
            sortBy: ''
      }
  },
  methods:{
        toggleSorting(type) {
            if(type === 'firstName')
                this.sortFirstNameAsc = !this.sortFirstNameAsc;
                else this.sortLastName = !this.sortLastName
            this.sortBy = type
        },
        search: function(e){
            this.searchString = e.target.value
        }
  },
  computed: {
    sortedNames() {
      return this.listUsers
        .filter((c) => {
          return this.searchString ?
            c.firstName.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1
            || c.lastName.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1
            || c.number.indexOf(this.searchString) > -1
            : true
        })
        .sort((a, b) => {
          return this.sortBy === "firstName" 
            ? a.firstName.localeCompare(b.firstName) * (this.sortFirstNameAsc ? 1 : -1)
            : a.lastName.localeCompare(b.lastName) * (this.sortLastName ? 1 : -1)
        });
    }
  }
}
</script>

<style scoped>
.card{
    margin-top:30px
}
</style>
