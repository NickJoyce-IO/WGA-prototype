<template>
  <div>
    <v-container>
      <h1>ACAS - Approve</h1>

      <p>
        Use this screen to upload your WGA return for the current Financial Year
      </p>

      <h3>You have a number of options</h3>

      <v-row>
        <v-col cols="6" md="4">
          <v-btn
          to="UploadTable"> Review submitted data </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="8"
          >Use this to review the data that has been submit for your entity. You will then be able to come back to this screen 
          and approve or reject the submission</v-col
        >
        <v-col cols="6" md="4">
          <v-btn> Download Data </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="8"
          >Use this option to download a copy of the data that has been used in the submission.</v-col
        >

        <v-col cols="6" md="4">
          <v-btn color="green"> Approve </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="8"
          >If you are happy with the data set you can click this button to approve the submission. 
          Once the submission has been approved, you will no longer be able to edit the dataset.</v-col
        >

        <v-col cols="6" md="4">
          <v-btn color="error"> Reject </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="8"
          >If the data set is not correct, use this button to reject the dataset. The status for this 
          entity will be reverted rejected and a contributor will be able to resubmit their data.</v-col
        >
      </v-row>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title :error="true">WGA Submission Data</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card height="800px">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.matchType"
                        label="Match Type"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        disabled
                        v-model="editedItem.ucoaAccCode"
                        label="Local Account Code"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ucoaAccDesc"
                        label="Local Account Description"
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ucoaProgCode" label="UCoA Programme Code"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ucoaProgDesc" label="UCoA Programme Description"></v-text-field>
                  </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.tbValue"
                        type="currency"
                        label="Selected TB Value"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cpValue"
                        label="Reported CP Value"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.valueOfConflict"
                        label="Value of conflict"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.narrative"
                        label="Narrative"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-container> </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Match Type", value: "matchType" },
      { text: "Local Account Code", value: "ucoaAccCode" },
      { text: "Local Account Description", value: "ucoaAccDesc" },
      // { text: 'UCoA Programme Code', value: 'ucoaProgCode' },
      // { text: 'UCoA Programme Description', value: 'ucoaProgDesc' },
      { text: "WGA value", value: "wgaValue" },
      { text: "Reported CP Value", value: "cpValue" },
      { text: "Reported TB Value", value: "tbValue" },
      { text: "Value of conflict", value: "valueOfConflict" },
      { text: "Narrative", value: "narrative" },
      { text: "Errors", value: "errors" },
      // { text: 'Actions', value: 'actions', sortable: false },
    ],
    errors: 0,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
        {
          matchType: "Income and Expenditure",
          ucoaAccCode: 31119001,
          ucoaAccDesc: "31119001 - Grant in Aid received by ALBs",
          ucoaProgCode: "000000",
          ucoaProgDesc: "000000 - Default",
          tbValue: "14445654445",
          cpValue: "0",
          wgaValue: "5000",
          valueOfConflict: "1444565445",
          errors: 0,
          narrative: "",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>