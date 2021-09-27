<template>
  <div>
    <modal name="filter-dialog" :clickToClose="false">
      <div class="filter-dialog">
        <LabelTextInput
          :id="'origine'"
          :label="'origine du document'"
          :value="formData.origine"
          @input-changed="onInputChanged"
        />
        <LabelTextInput
          :id="'type'"
          :label="'type de document'"
          :value="formData.type"
          @input-changed="onInputChanged"
        />
        <LabelTextInput
          :id="'sejour'"
          :label="'N° de séjour'"
          :value="formData.sejour"
          @input-changed="onInputChanged"
        />

        <div class="dates">
          <LabelTextInput
            :id="'dateDebut'"
            :type="'date'"
            :label="'Période'"
            :placehoder="'Date de début'"
            :value="formData.dateDebut"
            @input-changed="onInputChanged"
          />
          <LabelTextInput
            :id="'dateFin'"
            :type="'date'"
            :placehoder="'Date de fin'"
            :value="formData.dateFin"
            @input-changed="onInputChanged"
          />
        </div>

        <div class="actions">
          <div>
            <button class="close-button" @click="hideDialog()">annuler</button>
          </div>

          <div>
            <button class="search-button" @click="onSearch()">
              rechercher
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import LabelTextInput from "@/components/common/LabelTextInput.vue";
import "@/styles/filter-dialog.scss";

export default {
  name: "FilterDialog",
  components: {
    LabelTextInput,
  },
  watch:{
    filter: function(newValue){
      this.formData = newValue;
    }
  },
  props: {
    filter: {
      type: Object,
      default() {
        return {
          origine: "",
          type: "",
          sejour: "",
          dateDebut: "",
          dateFin: "",
        };
      },
    },
  },
  data() {
    return {
      formData: {
        origine: this.filter.origine,
        type: this.filter.type,
        sejour: this.filter.sejour,
        dateDebut: this.filter.dateDebut,
        dateFin: this.filter.dateFin,
      },
    };
  },
  methods: {
    onInputChanged(data) {
      this.formData[data.id] = data.value;
    },
    hideDialog() {
      this.$modal.hide("filter-dialog");
    },
    onSearch() {
      this.hideDialog();
      this.$emit("submit", { ...this.formData});
    },
  },
};
</script>

<style>
.vm--modal {
  width: 400px !important;
  height: auto !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
