<template>
  <div>
    <FormClient @listPlans="returnDataPlans" />
    <div class="panel">
      <div class="panel__header m-3">
        <h2>Planos de Saúde</h2>
      </div>
      <v-data-table
        dense
        :headers="headers"
        :items="dataPlans"
        item-key="name"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          'items-per-page-text': 'Planos por página'
        }"
      >
        <template v-slot:no-data>
          <div class="empty">
            <font-awesome-icon icon="file-medical" class="icons" />
            <p>Não há planos.</p>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormClient from "@/components/form-client/FormClient.vue";
export default Vue.extend({
  components: { FormClient },
  data() {
    return {
      dataPlans: [] as any,
      headers: [
        {
          text: "Plano",
          align: "start",
          sortable: false,
          value: "plano"
        },
        { text: "Preço", value: "precos.total" },
        { text: "Operadora", value: "operadora" },
        { text: "Abrangência", value: "abrangencia" },
        { text: "Tipo Acomodação", value: "tipo_acomodacao" }
      ]
    };
  },
  methods: {
    returnDataPlans(resp: any) {
      this.dataPlans = resp.planos;
    }
  }
});
</script>

<style lang="scss">
.panel {
  background: #fff;
  border-radius: 10px;
  border: solid 1px #dfe3e6;
  margin: 25px 0;
  &__header {
    border-bottom: solid 1px #dfe3e6;
  }
}
</style>
