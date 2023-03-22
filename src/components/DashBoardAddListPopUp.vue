<template>
  <Transition name="popup">
    <div v-if="ListData.addListPopup" class="addList_popup">
      <h4 class="popup_title">Enter list name</h4>

      <div class="popup_input_wrap">
        <input
          type="text"
          class="add-item-input"
          placeholder="Enter New List Name"
          v-model="newListName"
        />
        <input
          type="text"
          class="add-item-input"
          placeholder="Enter New List Item"
          v-model="initailListItem"
        />
      </div>
      <button class="add-item-btn" @click="submitNewList()">+ Add List</button>
      <p
        class="pop_up_close"
        @click="ListData.addListPopup = !ListData.addListPopup"
      >
        X
      </p>
    </div>
  </Transition>
</template>

<script>
import { useListStore } from "@/stores/listStore";
import { ref } from "vue";
export default {
  name: "DashBoardAddListPopUp",
  setup() {
    const ListData = useListStore();
    const newListName = ref("");
    const initailListItem = ref("");

    function submitNewList() {
      if (newListName.value == "") {
        alert("Please enter List name");
      } else if (initailListItem.value == "") {
        alert("Please enter List item");
      } else {
        ListData.addList(newListName.value, initailListItem.value);
        newListName.value = "";
        initailListItem.value = "";
        ListData.addListPopup = false;
      }
    }
    return {
      ListData,
      submitNewList,
      newListName,
      initailListItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.popup-enter-active {
  transition: all 0.3s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.addList_popup {
  position: fixed;
  background-color: #fff;
  min-width: 400px;
  left: 50%;
  top: 30px;
  text-align: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 20px;
  transform: translate(-50%, 0%);
  z-index: 3;
  h4 {
    font-style: italic;
    font-weight: 700;
  }
  .popup_input_wrap {
    input {
      border: 1px solid #6bb36b;
      margin: 10px;
      border-radius: 20px;
      padding: 10px;
    }
  }
  button {
    color: white;
    background-color: #6bb36b;
    border: #6bb36b;
    border-radius: 5px;
    padding-bottom: 2px;
    font-weight: 700;
  }
  .pop_up_close {
    position: absolute;
    top: 5px;
    right: 20px;
    margin-bottom: 0px;
    font-weight: 700;
    color: black;
    cursor: pointer;
  }
}
</style>
