<template>
  <div>
    <form @submit.prevent="search" class="row">
      <div class="col-md-6">
        <v-select v-model="formData.uf" :items="listUF" label="UF" required />
        <v-select
          v-model="formData.work"
          :items="listProfession"
          :disabled="!formData.city && !formData.uf"
          label="Profissões"
          required
        />
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formData.date"
              label="Data de Nascimento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="formData.date" locale="pt-br" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">
              Cancelar
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
      <div class="col-md-6">
        <v-select
          v-model="formData.city"
          :items="listCities"
          required
          label="Cidade"
        />
        <v-select
          v-model="formData.entity"
          :items="listEntity"
          label="Entidades"
          :disabled="!formData.work"
          required
        >
          <template slot="no-data">
            <v-alert :value="true">
              Nenhuma entidade foi encontrado para este cenário.
            </v-alert>
          </template>
        </v-select>
      </div>
      <div class="col-md-12 text-right pt-0">
        <v-btn @click="clear" class="mr-4"> Limpar </v-btn>
        <v-btn type="submit" :disabled="!formData.entity"> Buscar </v-btn>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import moment from "moment";
import {
  getDistricts,
  listProfession,
  listEntity,
  listPlansByCustomer
} from "@/service/service";
export default Vue.extend({
  mounted() {
    this.handleLoading(true);
    getDistricts()
      .then(resp => {
        resp.forEach((item: any) => {
          this.listCitiesUF.push({
            city: item.municipio.nome,
            uf: item.municipio.microrregiao.mesorregiao.UF.sigla
          });
          if (
            !this.listUF.includes(
              item.municipio.microrregiao.mesorregiao.UF.sigla
            )
          ) {
            this.listUF.push(item.municipio.microrregiao.mesorregiao.UF.sigla);
          }
          if (!this.listCities.includes(item.municipio.nome)) {
            this.listCities.push(item.municipio.nome);
          }
        });
      })
      .finally(() => this.handleLoading(false));
  },
  data() {
    return {
      listCitiesUF: [] as any,
      listCities: [] as any,
      listUF: [] as any,
      listEntity: [] as any,
      modal: false,
      listProfession: [] as any,
      formData: {
        entity: "",
        uf: "",
        city: "",
        date: "",
        work: ""
      } as any
    };
  },
  methods: {
    ...mapMutations(["handleLoading"]),
    clear(): void {
      this.formData = {
        entity: "",
        uf: "",
        city: "",
        date: "",
        work: ""
      };
    },
    parseClient(): object {
      return {
        entidade: this.formData.entity,
        uf: this.formData.uf,
        cidade: this.formData.city,
        datanascimento: ["1987-09-16"]
      };
    },
    search() {
      this.handleLoading(true);
      listPlansByCustomer(this.parseClient())
        .then(resp => this.$emit("listPlans", resp))
        .finally(() => this.handleLoading(false));
    }
  },
  watch: {
    "formData.uf": function(newUf: string) {
      if (newUf) {
        this.listCities = [];
        this.listEntity = [];
        this.listProfession = [];
        this.listCitiesUF.filter((item: any) => {
          if (item.uf === newUf) {
            if (!this.listCities.includes(item.city)) {
              this.listCities.push(item.city);
            }
          }
        });
      }
    },
    "formData.city": function(newCity: string) {
      const uf = this.formData.uf;
      if (newCity && uf) {
        this.listProfession = [];
        this.listEntity = [];
        this.handleLoading(true);
        listProfession(uf, encodeURI(newCity))
          .then(resp => {
            this.listProfession = resp.map((item: any) => item.profissao);
          })
          .catch(() => (this.listProfession = []))
          .finally(() => this.handleLoading(false));
      }
    },
    "formData.work": function(newWork: string) {
      const city = this.formData.city;
      const uf = this.formData.uf;
      if (newWork && uf && city) {
        this.handleLoading(true);
        listEntity(uf, encodeURI(city), newWork)
          .then(resp => {
            this.listEntity = resp.map((item: any) => item.NomeFantasia);
          })
          .catch(() => (this.listEntity = []))
          .finally(() => this.handleLoading(false));
      }
    }
  }
});
</script>

<style lang="scss"></style>
