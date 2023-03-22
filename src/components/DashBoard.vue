<template>
  <NavBar />
  <div class="dashboard-wrap">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <DashBoardListName />
        </div>
        <div class="col-md-9">
          <DashBoardListItems />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import DashBoardListName from "../components/DashBoardListNames.vue";
import DashBoardListItems from "../components/DashBoardListItems.vue";
import { useListStore } from "@/stores/listStore";
export default {
  name: "DashBoard",
  components: {
    NavBar,
    DashBoardListName,
    DashBoardListItems,
  },
  setup() {
    const ListData = useListStore();
    ListData.retriveLists();
    return { ListData };
  },
};
</script>

<style lang="scss">
.dashboard-wrap {
  padding: 30px;
  background-color: #f6fdf6;
}
h3 {
  color: aqua;
}
</style>
