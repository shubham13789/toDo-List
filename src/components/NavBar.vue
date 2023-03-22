<template>
  <nav>
    <div class="nav-left-sec">
      <p>Lists</p>
      <button
        @click="
          ListData.addListPopup = ListData.addListPopup
            ? ListData.addListPopup
            : !ListData.addListPopup
        "
      >
        + New List
      </button>
      <button @click="signOut()">sign out</button>
    </div>
    <div class="nav-right-sec">
      <p>Sorting</p>
      <select
        v-model="sortOrder"
        v-on:change="handleChange"
        class="date-select"
        aria-label="Default select example"
      >
        <option value="asec" selected>Date asec</option>
        <option value="desc">Date Desc</option>
      </select>
    </div>
  </nav>
  <DashBoardAddListPopUp />
</template>

<script>
import DashBoardAddListPopUp from "../components/DashBoardAddListPopUp.vue";
import { useListStore } from "@/stores/listStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  components: {
    DashBoardAddListPopUp,
  },
  setup() {
    const ListData = useListStore();
    const sortOrder = ref("asec");
    const router = useRouter();

    //sign out function
    function signOut() {
      ListData.isAuthenticated = false;
      router.push({ name: "Login" });
    }

    function handleChange() {
      ListData.sortOrder = sortOrder.value;
      if (sortOrder.value == "asec") {
        ListData.userList.sort((a, b) => a.id - b.id);
        ListData.activeList.sort((a, b) => a.id - b.id);
      } else {
        ListData.userList.sort((a, b) => b.id - a.id);
        ListData.activeList.sort((a, b) => b.id - a.id);
      }
    }
    return {
      ListData,
      sortOrder,
      signOut,
      handleChange,
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-top: 20px;
  background-color: #e6ffe6;
  border-bottom: 1px solid #6bb36b;
  p {
    color: black;
    font-size: 20px;
    margin-bottom: 0px;
    margin-right: 20px;
    @media (max-width: 980px) {
      margin-right: 5px;
    }
  }
  button {
    border: none;
    border-radius: 20px;
    background-color: #6bb36b;
    color: white;
    padding: 5px 20px;
    margin-right: 10px;
    @media (max-width: 980px) {
      padding: 0px 5px;
      margin-right: 5px;
      border-radius: 5px;
      font-size: 12px;
    }
  }
  .nav-left-sec,
  .nav-right-sec {
    display: flex;
  }
}
</style>
