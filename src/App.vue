<template>
  <v-app>
    <v-progress-circular
      v-if="$store.state.loadingTrigger"
      class="loading w-100 h-100 position-absolute"
      color="primary"
      indeterminate
    />
    <main>
      <Menu />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <transition name="slide" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import Menu from "@/components/menu/Menu.vue";
export default Vue.extend({
  components: { Menu }
});
</script>
