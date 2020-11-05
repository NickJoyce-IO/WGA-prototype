<template>
  <div class="about">
    <v-container>

   
    <h1>Users</h1>

    <p>Use this screen to add and amend permissions of users.</p>

   

    <v-card-title>
      User List
      <v-spacer></v-spacer>
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
    <template v-slot:item.submitter="{ item }">
        <v-simple-checkbox
          v-model="item.submitter"
          
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.approver="{ item }">
        <v-simple-checkbox
          v-model="item.approver"
          
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.admin="{ item }">
        <v-simple-checkbox
          v-model="item.admin"
          
        ></v-simple-checkbox>
      </template>

    </v-data-table>
  



   </v-container>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Submitter', value: 'submitter' },
          { text: 'Approver', value: 'approver' },
          { text: 'Admin', value: 'admin' },
          { text: 'Entities', value: 'entities' },
          //{ text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Nick Joyce',
            email: 'Nick.Joyce@beis.gov.uk',
            submitter: true,
            approver: true,
            admin: true,
            entities: ['ACAS', 'UK Space Agency'],
          },
           {
            name: 'Eddie Brophy',
            email: 'Eddie.Brophy@beis.gov.uk',
            submitter: true,
            approver: true,
            admin: true,
            entities: ['BEIS Core','ACAS', 'UK Space Agency'],
          },
            {
            name: 'John Penfold',
            email: 'John.Penfold@beis.gov.uk',
            submitter: true,
            approver: false,
            admin: false,
            entities: ['ACAS'],
          },
          
        ],
      }
    },
  }
</script>