<template>
  <div class="documents">
    <div class="search-section">
      <div class="search-input">
        <div>
          <SearchTextInput
            :placeholder="'Recherche dans un document'"
            @search-text-change="onSearchTextChange"
            :value="searchText"
            @on-search="search"
          />
          <div
            class="filter-button"
            v-if="tableData.length > 0"
            @click="showFilterDialog()"
          >
            FILTRES
          </div>

          <div v-if="isSearching" class="filter-button" @click="resetSearch()">
            réinitialiser
          </div>
        </div>

        <div v-if="isSearching && tableData.length > 0" class="count-number">
          {{ tableData.length }} document{{ getS }} trouvé{{ getS }}
        </div>
      </div>

      <div v-if="tableData.length <= 0" class="no-results">
        <div>
          <svg
            width="250"
            height="250"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.663 15.663C15.8023 15.5235 15.9678 15.4128 16.1499 15.3374C16.332 15.2619 16.5272 15.223 16.7243 15.223C16.9214 15.223 17.1166 15.2619 17.2987 15.3374C17.4808 15.4128 17.6462 15.5235 17.7855 15.663L23.5605 21.438C23.842 21.7192 24.0002 22.1008 24.0003 22.4987C24.0005 22.8966 23.8426 23.2782 23.5613 23.5597C23.28 23.8412 22.8985 23.9994 22.5006 23.9995C22.1027 23.9996 21.721 23.8417 21.4395 23.5605L15.6645 17.7855C15.5251 17.6461 15.4144 17.4807 15.339 17.2986C15.2635 17.1165 15.2246 16.9213 15.2246 16.7242C15.2246 16.5271 15.2635 16.3319 15.339 16.1498C15.4144 15.9677 15.5251 15.8023 15.6645 15.663H15.663Z"
                fill="#E0E0E0"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.75 18C10.8334 18 11.9062 17.7866 12.9071 17.372C13.9081 16.9574 14.8175 16.3497 15.5836 15.5836C16.3497 14.8175 16.9574 13.9081 17.372 12.9071C17.7866 11.9062 18 10.8334 18 9.75C18 8.66659 17.7866 7.5938 17.372 6.59286C16.9574 5.59193 16.3497 4.68245 15.5836 3.91637C14.8175 3.15029 13.9081 2.5426 12.9071 2.12799C11.9062 1.71339 10.8334 1.5 9.75 1.5C7.56196 1.5 5.46354 2.36919 3.91637 3.91637C2.36919 5.46354 1.5 7.56196 1.5 9.75C1.5 11.938 2.36919 14.0365 3.91637 15.5836C5.46354 17.1308 7.56196 18 9.75 18ZM19.5 9.75C19.5 12.3359 18.4728 14.8158 16.6443 16.6443C14.8158 18.4728 12.3359 19.5 9.75 19.5C7.16414 19.5 4.68419 18.4728 2.85571 16.6443C1.02723 14.8158 0 12.3359 0 9.75C0 7.16414 1.02723 4.68419 2.85571 2.85571C4.68419 1.02723 7.16414 0 9.75 0C12.3359 0 14.8158 1.02723 16.6443 2.85571C18.4728 4.68419 19.5 7.16414 19.5 9.75Z"
                fill="#E0E0E0"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div class="text">LA RECHERCHE N’A DONNÉ AUCUN RÉSULTAT</div>
      </div>

      <div class="search-table" v-if="tableData.length > 0">
        <v-table
          :data="tableData"
          @selectionChanged="selectedRow = $event"
          selectedClass="selected-row"
        >
          <thead slot="head">
            <v-th sortKey="document_origin_code">Origine</v-th>
            <v-th sortKey="title">Titre</v-th>
            <v-th sortKey="document_date">Séjour</v-th>
            <v-th sortKey="document_type">Type De Doc</v-th>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <v-tr v-for="row in displayData" :key="row.id" :row="row">
              <td>{{ row.document_origin_code }}</td>
              <td>
                {{
                  row.title.length > 100
                    ? row.title.substring(0, 100) + "..."
                    : row.title
                }}
              </td>
              <td>
                <div v-if="row.encounter">
                  {{ row.encounter ? row.encounter.encounter_id : "" }}
                </div>
                <div v-if="row.encounter">
                  du {{ row.encounter ? row.encounter.entry_date : "" }}
                </div>
                <div v-if="row.encounter">
                  au {{ row.encounter ? row.encounter.out_date : "" }}
                </div>
              </td>
              <td>
                {{ row.document_type }}
              </td>
            </v-tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <div class="documents-content" v-if="tableData.length > 0">
      <div
        v-if="selectedRow && selectedRow.length > 0"
        v-html="documentText"
        class="selected-document"
      ></div>
      <div v-else class="no-selected-document">Aucun document séléctionné</div>
    </div>

    <FilterDialog @submit="search" :filter="filter" />
  </div>
</template>

<script>
import SearchTextInput from "@/components/common/SearchTextInput.vue";
import FilterDialog from "@/components/cohorts/FilterDialog.vue";
import moment from "moment";
import "@/styles/documents.scss";

export default {
  name: "Documents",
  components: {
    SearchTextInput,
    FilterDialog,
  },
  computed: {
    documentText() {
      if (!this.selectedRow[0]) return "";

      if (this.searchText)
        return this.selectedRow[0].displayed_text.replace(
          new RegExp(this.searchText, "ig"),
          `<span style="background-color: #F2C94C; font-weight: bold;">` +
            this.searchText +
            `</span>`
        );
      else return this.selectedRow[0].displayed_text;
    },
    getS() {
      return this.tableData.length > 1 ? "s" : "";
    },
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
      tableData: this.info.matched_documents,
      searchText: "",
      selectedRow: [],
      filter: {},
      isSearching: false,
    };
  },
  methods: {
    onSearchTextChange(text) {
      this.searchText = text;
    },
    search(filterObj) {
      this.filter = {
        text: filterObj.text || this.filter.text || null,
        origine: filterObj.origine || this.filter.origine || null,
        type: filterObj.type || this.filter.type || null,
        sejour: filterObj.sejour || this.filter.sejour || null,
        dateDebut: filterObj.dateDebut || this.filter.dateDebut || null,
        dateFin: filterObj.dateFin || this.filter.dateFin || null,
      };

      const { text, origine, type, sejour, dateDebut, dateFin } = this.filter;

      let results = [];

      if (!origine && !type && !sejour && !dateDebut && !dateFin) {
        results = this.info.matched_documents;
      } else {
        results = this.tableData;
      }
      this.isSearching = true;

      results = results.filter((item) => {
        if (!text) return item;

        return (
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.displayed_text.toLowerCase().includes(text.toLowerCase())
        );
      });

      if (origine) {
        results = results.filter((item) => {
          return item.document_origin_code
            .toLowerCase()
            .includes(origine.toLowerCase());
        });
      }

      if (type) {
        results = results.filter((item) => {
          return item.document_type.toLowerCase().includes(type.toLowerCase());
        });
      }

      if (sejour) {
        results = results.filter((item) => {
          if (item.encounter) {
            return item.encounter.encounter_id.includes(sejour);
          }
        });
      }

      if (dateDebut && dateFin) {
        results = results.filter((item) => {
          if (item.encounter) {
            if (
              moment(dateDebut).isBetween(
                item.encounter.entry_date,
                item.encounter.out_date
              ) ||
              moment(dateFin).isBetween(
                item.encounter.entry_date,
                item.encounter.out_date
              ) ||
              moment(item.encounter.entry_date).isBetween(dateDebut, dateFin) ||
              moment(item.encounter.out_date).isBetween(dateDebut, dateFin)
            ) {
              return item;
            }
          }
        });
      }
      
      this.selectedRow = [];
      this.tableData = results;
    },
    showFilterDialog() {
      this.$modal.show("filter-dialog", { clickToClose: false });
    },
    resetSearch() {
      this.tableData = this.info.matched_documents;
      this.filter = {};
      this.isSearching = false;
      this.searchText = "";
      this.selectedRow = [];
    },
  },
};
</script>
