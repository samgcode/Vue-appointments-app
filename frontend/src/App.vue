<template>
  <div id="main-app" class="container">
    <div class="row justify-content-center">
      <add-appointment @add="addItem"/>
      <search-appointments 
        @searchRecords="searchAppointments" 
        :myKey="filterKey" 
        :myDir="filterDir"
        @requestKey="changeKey"
        @requestDir="changeDir"
      />
      <appointment-list 
        :appointments="filteredApts" 
        @remove="removeItem"
        @edit="editItem"
      />
    </div>
  </div>
</template>

<script>
  import AppointmentList from "./components/AppointmentList";
  import AddAppointment from "./components/AddAppointment";
  import SearchAppointments from "./components/SearchAppointments"
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    name: 'MainApp',
    data: function() {
      return { 
        appointments: [],
        filterKey: "petName",
        filterDir: "asc",
        searchTerms: "",
        aptIndex: 0
      };
    },
    components: {
      AppointmentList,
      AddAppointment,
      SearchAppointments
    },
    mounted() {
      //axios.get("./data/appointments.json")
      axios.get("http://localhost:3000/appointments")
      .then(
        response => (this.appointments = response.data.map(item => {
          item.aptId = item.id;
          this.aptIndex++;
          return item;
        }))
      );
    },
    computed: {
      searchedApts: function() { 
        return this.appointments.filter(item => {
          return(
            item.petName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
            item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase()) ||
            item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
          );
        });
      },
      filteredApts: function() {
        return _.orderBy(
          this.searchedApts,
          item => {
            return item[this.filterKey].toLowerCase();
          }, this.filterDir
        );
      }
    },
    methods: {
      changeKey: function(value) {
        this.filterKey = value;
      },
      changeDir: function(value) {
        this.filterDir = value;
      },
      searchAppointments: function(terms) {
        this.searchTerms = terms;
      },
      addItem: function(apt) {
        apt.aptId = this.aptIndex;
        this.aptIndex++;
        this.appointments.push(apt);
        this.addApt(apt);
      },
      removeItem: function (apt) {
        this.appointments = _.without(this.appointments, apt);
        this.removeApt(apt);
      },

      editItem: function (id, field, text) {
        const aptIndex = _.findIndex(this.appointments, {
          aptId: id
        });
        this.appointments[aptIndex][field] = text;
      },

      addApt: function (apt) {
        //create a new http request
        let xhr = new XMLHttpRequest();

        console.log('test');

        xhr.open('POST', 'http://localhost:3000/appointments');

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`petName=${apt.petName}&petOwner=${apt.petOwner}&aptDate=${apt.aptDate}&aptNotes=${apt.aptNotes}`);

        xhr.onload = () => {
          if(xhr.status != 201) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
          }
        };
      },
      
      removeApt: function(apt) {
        let xhr = new XMLHttpRequest();

        xhr.open('DELETE', `http://localhost:3000/appointments/${apt.id}`);
        xhr.send();

        xhr.onload = () => {
          if(xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
          } 
        };
      },

      //editApt: function(apt)
    }
  };
</script>
