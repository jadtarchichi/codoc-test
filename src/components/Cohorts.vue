<template>
  <div class="cohorts">
    <!-- Path Section -->
    <div class="path">
      <div v-for="(item, index) in pathItems" :key="index">
        {{ item.name }}
        <div v-if="index < pathItems.length - 1" class="back-slash">/</div>
      </div>
    </div>

    <!-- Patient Information -->
    <div>
      <PatientInfo :info="data"></PatientInfo>
    </div>

    <!-- Search Section -->
    <div>
      <CohortsTabs :info="data"></CohortsTabs>
    </div>
  </div>
</template>

<script>
import FormData from "@/data/form-data.json";
import PatientInfo from "@/components/PatientInfo.vue";
import CohortsTabs from "@/components/cohorts/CohortsTabs.vue";
import "@/styles/cohorts.scss";

export default {
  name: "Cohorts",
  components: {
    PatientInfo,
    CohortsTabs
  },
  data() {
    return {
      data: FormData,
      pathItems: [
        { name: "Mes cohortes" },
        { name: "Cohorte XXX" },
        { name: "Saxon Jamie" },
      ]
    };
  },
};
</script>
