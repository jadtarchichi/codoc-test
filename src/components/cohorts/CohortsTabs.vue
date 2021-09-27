<template>
  <div class="cohorts-tabs">
    <div class="tabs">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="tab-item"
        :class="selectedTab == item.id ? 'active' : ''"
        @click="selectedTab = item.id"
      >
        {{ item.name }}
        <div v-if="selectedTab == item.id" class="active"></div>
      </div>
    </div>

    <Documents :info="info"></Documents>
  </div>
</template>
 
<script>
import "@/styles/cohorts-tabs.scss";
import Documents from "@/components/cohorts/Documents.vue";

export default {
  name: "CohortsTabs",
  components: {
    Documents,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selectedTab: "documents",
      tabs: [
        { id: "documents", name: "Documents" },
        { id: "biologie", name: "Biologie" },
        { id: "prescriptions", name: "Prescriptions" },
        { id: "chronologie", name: "Chronologie" },
        { id: "parcours", name: "Parcours" },
        { id: "sejours", name: "Séjours" },
        { id: "phenotypes", name: "Phénotypes" },
        { id: "similarite", name: "Similarité" },
        { id: "cohorte", name: "Cohorte" },
        { id: "ecrf", name: "eCRF" },
      ],
    };
  },
};
</script>
