<template>
  <div class="about">
    <v-container>

   
    <h1>Version Control</h1>

    <p>Use this screen to upload your WGA return for the current Financial Year</p>

    <h3>To Upload your data:</h3>
    <br />

    <ol>
    <li>
      <b>Select your entity. </b>The entity list will list entities that you have permission to enter data against. From the dropdown box, 
      select the entity you wish to load data against. 
    </li>
    <li>
      <b>Select your file. </b>After you have selected the Entity, click the File input paperclip to select the file you wish to upload. The file must be in the format
      of the supplied template with no columns altered.
    </li>
    <li>
      <b>Commit your upload. </b>Once you have select your file, then press the upload button to start the upload process. Once this has completed you will then be redirected to
      the validation screen.
    </li>
    </ol>
    
    <br />
 
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Version List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
         <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>-->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="750px">
          <v-card>
            <v-card-title class="headline">Upload your spreadsheet</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
               <p>Select File</p>
               <v-file-input label="File input"></v-file-input>
               <v-col cols="12" sm="4">
              <v-btn medium color="primary" to='/uploadtable'>Upload</v-btn>
              </v-col> 
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>

    
  </v-data-table>



   </v-container>
  </div>
</template>



<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Year', value: 'calories' },
        { text: 'Period', value: 'fat' },
        { text: 'Opened by', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: 'Opened date', value: 'actions', sortable: false },
        { text: 'Closed by', value: 'closedby' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: 'Closed date', value: 'closeddate', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: '17-18 P12',
            calories: '2017-18',
            fat: 'P12',
            carbs: 'Nick Joyce',
            actions: '01/06/18',
            closedby: 'Nick Joyce',
            closeddate: '01/10/18'

          },
          {
            name: '18-19 P12',
            calories: '2018-19',
            fat: 'P12',
            carbs: 'Eddie Brophy',
            actions: '01/06/19',
            closedby: 'Nick Joyce',
            closeddate: '01/10/19'

          },
          {
            name: '19-20 P12',
            calories: '2019-20',
            fat: 'P12',
            carbs: 'Eddie Brophy',
            actions: '01/06/20',
            closedby: 'Eddie Brophy',
            closeddate: '01/10/20'

          },
          {
            name: '20-21 P12',
            calories: '2020-21',
            fat: 'P12',
            carbs: 'Eddie Brophy',
            actions: '01/06/21',
            closedby: '',
            closeddate:'' 

          },
         
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      getColor(calories) {
        if(calories === 'Approved') return 'blue'
        else if(calories === 'Rejected') return 'error'
        else if(calories === 'FA Approved') return 'green'
        else if(calories === 'Submitted') return 'orange'
      },
      approveScreen() {
        console.log('approve clicked')
      }
    },
  }
</script>