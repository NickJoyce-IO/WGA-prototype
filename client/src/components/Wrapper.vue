<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link
          to='/'>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>                
                 Home
                 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link 
        to="/upload">
          <v-list-item-action>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
            Upload
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
       
          


     
      
       <v-list-group
          
          value="true"
        
        >
        <v-icon slot="prependIcon">mdi-cog-outline</v-icon>
          <template v-slot:activator>
          <v-list-item-title>Manage</v-list-item-title>
        </template>

        <v-list-item link
        to="/users"
        >
          <v-list-item-action >
            <v-icon>mdi-account-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link
        to="/workflowstatus">
          <v-list-item-action>
            <v-icon>mdi-sitemap</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Workflow status</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    

        <v-list-item link
        to="/versioncontrol">
          <v-list-item-action>
            <v-icon>mdi-folder-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Version Control</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          sub-group
          no-action
        
        >
        <v-icon slot="prependIcon">mdi-file-chart</v-icon>
          <template v-slot:activator>
          <v-list-item-title>Reports</v-list-item-title>
        </template>

            <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log 2 Report</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Audit Report</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       </v-list-group>
       </v-list-group>

        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>WGA - Collection: 2020-2021 P12</v-toolbar-title>
     
    </v-app-bar>

    
    
                
            <!--<v-tooltip left>-->
             
  <!--<v-file-input multiple label="File input"></v-file-input>-->
            <router-view></router-view>

             
            <!--</v-tooltip>-->
         
        
      
    
    <v-footer
      color="teal"
      app
    >
      <span class="white--text">&copy; Built by BICC</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
