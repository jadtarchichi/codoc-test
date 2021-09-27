<template>
  <div class="patient-title">
    <div class="name">
        <span class="last-name">{{ info.last_name + ' '}}</span> 
        <span class="first-name">{{ info.first_name }}</span>
    </div>

    <div class="info">
        <div>{{info.sex == 'M' ? 'Homme' : 'Femme'}} - Né le {{ info.birth_date | getDate }}</div>
        <div v-if="info.death_date">Décédé le {{ info.death_date | getDate }} à {{ info.age_death }} ans</div>
        <div>N° de DP: {{ info.ipps[0].ipp }}</div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  name: "PatientInfo",
  filters:{
      getDate(date){
        return Moment(String(date)).format('DD/MM/YYYY')
      }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
