<template>
  <div class="input-wrap">
    <input
      type="text"
      class="add-item-input"
      placeholder="Enter New List Item"
      v-model="item"
    />
    <button class="add-item-btn" @click="submitItem()">+</button>
  </div>
</template>

<script>
import { useListStore } from "@/stores/listStore";
import { ref } from "vue";
export default {
  name: "DashBoardListItemsInput",
  setup() {
    const item = ref("");
    const ListData = useListStore();
    function submitItem() {
      if (item.value) {
        ListData.addItem(item.value);
        item.value = "";
      } else {
        alert("Please enter an Item to add.");
      }
    }

    return {
      submitItem,
      item,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-wrap {
  border: none;
  border-radius: 20px;
  background-color: #6bb36b;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  input {
    border: 1px solid #6bb36b;
    margin: 10px;
    min-width: 50%;
    border-radius: 20px;
    padding: 10px;
    padding-left: 20px;
    @media (max-width: 980px) {
      padding-left: 0px;
    }
  }
  button.add-item-btn {
    width: 30px;
    height: 30px;
    color: #6bb36b;
    background-color: white;
    border: #6bb36b;
    border-radius: 5px;
    padding-bottom: 2px;
    font-weight: 700;
  }
}
</style>
