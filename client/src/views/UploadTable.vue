

  

<template>
  
  
  <v-data-table
    :headers="headers"
    :items="upload"
    sort-by="calories"
    class="elevation-1"
  >

    <template v-slot:top>
      <v-alert
      v-if="errors > 0"
      type="error">
      <b>You have the following errors:</b>
      <ol>
        <li>Counterparty not recognosed on line 1</li>
        <li>Transaction type not recognised on line 2</li>
      </ol>
      </v-alert>
      
      
     
      
        
      <v-toolbar flat color="white">
        <v-row>
        <v-toolbar-title :error="true"
          >
          
          <v-col
            cols="12"
            sm="6"
            md="4">
            ACAS Upload - You currently have
          {{ errors }} errors
          </v-col>
          
          
          </v-toolbar-title>
        
        
        <v-divider class="mx-4" inset vertical></v-divider>
         
        <v-col 
          cols="12"
          sm="6"
          md="4">
          <v-btn
          :disabled="errors > 0"
          color="primary"
          class="mb-2"
          to="/reviewtable"
          >Proceed to next step</v-btn
        >
        </v-col>
        <v-col 
          cols="12"
          sm="6"
          md="4">
          <v-btn>
            Download TB/Mapping</v-btn
        >
          
        </v-col>
     

        
       
       
        <v-spacer></v-spacer>

       
        <v-dialog v-model="dialog" max-width="800px" eager>
          
          <!--<template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on"
              >New Item</v-btn
            >
          </template>-->
    

          <v-card height="800px">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        :rules="ttRules"
                        v-model="editedItem.name"
                        label="Transaction Type"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        :rules="cpRules"
                        v-model="editedItem.counterparty"
                        label="Counterparty"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.transValue"
                        label="Value excl VAT"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.TransLocAcc"
                        label="Local Account Code"
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.TransLocProj" label="Local Project Code"></v-text-field>
                  </v-col>-->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.TransUcoaAcc"
                        label="UCoA Account Code"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.TransUcoaProg" label="UCoA Programme Code" disabled></v-text-field>
                  </v-col>-->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.supplierIdent"
                        label="Supplier Identifier"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.poIdent"
                        label="PO Identifier"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.glDate"
                        label="GL Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.effectiveDate"
                        label="Effective Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.vatRate"
                        label="VAT Rate"
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.balance" label="Balance inc VAT"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.balanceLocAcc" label="Balance Local Account"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.balanceLocProj" label="Balance Local Project"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.balanceUcoaAcc" label="Balance UCoA Account" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.balanceUcoaProg" label="Balance UCoA Program" disabled></v-text-field>
                  </v-col>-->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.comments"
                        label="Comments"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-row>
      </v-toolbar>
       
    </template>
    <template v-slot:[`item.actions`]="{ item }">
  <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
</template>
    <template v-slot:no-data>
  <v-btn color="primary" @click="initialize">Reset</v-btn>
</template>
     <template v-slot:item.name="{ item }">
  <div :style="getColor(item.name)">
    {{ item.name }}
  </div>
</template>
      <template v-slot:item.counterparty="{ item }">
  <div :style="getCPColor(item.counterparty)">
    {{ item.counterparty }}
  </div>
</template>
  </v-data-table>

</template>

<style>
.v-data-table {
  max-width: 100%;
}
</style>

<script>
export default {
  data: () => ({
    dialog: false,
    errors: 0,
    headers: [
      {
        text: "id",
        value: "id"
      },
      {
        text: "Transaction Type",
        align: "start",
        value: "name",
      },
      { text: "Counterparty", value: "counterparty" },
      { text: "Value exc VAT", value: "transValue" },
      { text: "Local Account Code", value: "TransLocAcc" },
      //{ text: 'Local Project Code', value: 'TransLocProj' },
      { text: "UCoA Account Code", value: "TransUcoaAcc" },
      //{ text: 'UCoA Programme Code', value: 'TransUcoaProg' },
      { text: "Supplier Identifier", value: "supplierIdent" },
      { text: "PO Identifier", value: "poIdent" },
      { text: "GL Date", value: "glDate" },
      { text: "Effective Date", value: "effectiveDate" },
      { text: "VAT Rate", value: "vatRate" },
      /*{ text: 'Balance incl VAT', value: 'balance' },
        { text: 'Balance Local Account', value: 'balanceLocAcc' },
        { text: 'Balance Local Project' , value: 'balanceLocProj' },
        { text: 'Balance UCoA Account Code', value: 'balanceUcoaAcc' },
        { text: 'Balance UCoA Programme Code' , value: 'balanceUcoaProg' },*/
      { text: "Comments", value: "comments" },
      { text: "Errors", value: "errors" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    upload: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      counterparty: 0,
      transValue: 0,
      TransLocAcc: 0,
      TransLocProj: 0,
      supplierIdent: 0,
      poIdent: 0,
      glDate: 0,
      vatRate: 0,
      balance: 0,
      balanceLocAcc: 0,
      balanceLocProj: 0,
      comments: 0,
      errors: 0,
    },
    defaultItem: {
      name: "",
      counterparty: 0,
      transValue: 0,
      TransLocAcc: 0,
      TransLocProj: 0,
      supplierIdent: 0,
      poIdent: 0,
      glDate: 0,
      vatRate: 0,
      balance: 0,
      balanceLocAcc: 0,
      balanceLocProj: 0,
      comments: 0,
      errors: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ttRules() {
      const rules = [];

      const rule = (v) =>
        (v || "") == "Income & Expenditure only" ||
        (v || "") == "Payables & Receivables only" ||
        `Income & Expenditure only or Payables & Receivables only`;
      rules.push(rule);
      return rules;
    },
    cpRules() {
      const rules = [];
      const counterparties = [
        "Engineering and Physical Sciences Research Council",
        "Civil Nuclear Police Authority",
        "Innovate UK",
      ];
      const rule = (v) =>
        counterparties.includes(v) ||
        "Counterparty misspelt or not in list of allowed Counterparties";
      rules.push(rule);
      return rules;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.errors = 0;
    this.startErrors();
  },
  mounted() {
    console.log(this.$refs);
  },
  methods: {
    initialize() {
      this.upload = [
        {
          id: 1,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Counci",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: "000000",
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 1,
          comments: "This is a comment",
        },
        {
          id: 2,
          name: "Income & Expendure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 1,
          comments: "This is a comment",
        },
        {
          id: 3,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 4,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 5,
          name: "Income & Expenditure only",
          counterparty: "Innovate UK",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 6,
          name: "Income & Expenditure only",
          counterparty: "Innovate UK",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 7,
          name: "Income & Expenditure only",
          counterparty: "Innovate UK",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 8,
          name: "Income & Expenditure only",
          counterparty: "Innovate UK",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 9,
          name: "Income & Expenditure only",
          counterparty: "Civil Nuclear Police Authority",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 10,
          name: "Income & Expenditure only",
          counterparty: "Civil Nuclear Police Authority",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 11,
          name: "Income & Expenditure only",
          counterparty: "Magnox Limited",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 12,
          name: "Income & Expenditure only",
          counterparty: "Magnox Limited",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 13,
          name: "Income & Expenditure only",
          counterparty: "Magnox Limited",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 14,
          name: "Income & Expenditure only",
          counterparty: "Magnox Limited",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 15,
          name: "Income & Expenditure only",
          counterparty: "Magnox Limited",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 16,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 17,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 18,
          name: "Income & Expenditure only",
          counterparty: "Engineering and Physical Sciences Research Council",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 19,
          name: "Income & Expenditure only",
          counterparty: "BEIS Core",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
        {
          id: 20,
          name: "Income & Expenditure only",
          counterparty: "BEIS Core",
          transValue: 61083.18,
          TransLocAcc: 44817001,
          TransUcoaAcc: 44817001,
          TransLocProj: 44817001,
          supplierIdent: 10021,
          poIdent: 1005,
          glDate: "30/03/2020",
          vatRate: 20,
          balance: 0,
          balanceLocAcc: 0,
          balanceLocProj: 0,
          errors: 0,
          comments: "This is a comment",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.upload.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.upload.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.upload.splice(index, 1);
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
        this.editedItem.errors = 0;
        Object.assign(this.upload[this.editedIndex], this.editedItem);
      } else {
        this.upload.push(this.editedItem);
      }
      this.updateErrors();
      this.close();
    },
    startErrors() {
      this.upload.forEach((item) => {
        if (item.errors) {
          this.errors += item.errors;
        }
      });
    },
    updateErrors() {
      this.errors = 0;
      this.upload.forEach((item) => {
        if (item.errors) {
          this.errors += item.errors;
        }
      });
    },
    getColor(tt) {
      if (tt != "Income & Expenditure only") return "color: red";
    },
    getCPColor(cp) {
      const entities = [
        "Engineering and Physical Sciences Research Council",
        "Innovate UK",
        "Civil Nuclear Police Authority",
        "Magnox Limited",
        "BEIS Core",
      ];
      if (entities.indexOf(cp) === -1) return "color: red";
    },
    showErrs(){
      if(this.errors === 0) {
        return false
      }
      else{
        return true
      }
    }
  },
};
</script>