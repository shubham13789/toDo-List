<template>
  <h2 class="List-sec-title">List Items</h2>
  <div class="List-items">
    <div v-if="!ListData.activeList.length">No List Items</div>
    <TransitionGroup name="item">
      <div class="List-item" v-for="list in ListData.activeList" :key="list.id">
        <div class="item-wrap">
          <input type="checkbox" @click="listItemCompleted(list.id)" />
          <p>{{ list.name }}</p>
        </div>
        <div class="button-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots-vertical dots"
            viewBox="0 0 16 16"
            @mouseenter="showButton(list.id)"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
          <button
            @mouseleave="showButton(0)"
            v-if="itemButtom == list.id"
            class="deleteItem"
            @click="ListData.deleteListItem(list.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </TransitionGroup>

    <div
      v-if="ListData.activeList.length || ListData.activeCompletedList.length"
      class="comp-list-wrap"
    >
      <p class="clickable" @click="isExpanded = !isExpanded">
        Click to expand <span :class="{ expanded: isExpanded }">&#x25BC;</span>
      </p>
      <div class="content" :class="{ expanded: isExpanded }">
        <div v-if="!ListData.activeCompletedList.length">
          No completed Items
        </div>
        <div
          class="completed-item"
          v-for="list in ListData.activeCompletedList"
          :key="list.id"
        >
          <del>{{ list.name }}</del>
        </div>
      </div>
    </div>
    <DashBoardListItemsInput
      v-if="ListData.activeList.length || ListData.activeCompletedList.length"
    />
  </div>
</template>
<script>
import { useListStore } from "@/stores/listStore";
import { ref } from "vue";
import DashBoardListItemsInput from "../components/DashBoardListItemsInput.vue";
export default {
  name: "DashBoardListItems",
  components: {
    DashBoardListItemsInput,
  },
  setup() {
    const ListData = useListStore();
    const itemButtom = ref(0);
    const isExpanded = ref(false);
    console.log(JSON.stringify(ListData.activeList));
    function showButton(id) {
      itemButtom.value = id;
    }

    function listItemCompleted(id) {
      const indexAll = ListData.allListItems.findIndex((obj) => obj.id == id);
      const completedItem = ListData.allListItems.splice(indexAll, 1)[0];

      ListData.activeList = ListData.activeList.filter((obj) => obj.id !== id);
      ListData.allListItems = ListData.allListItems.filter(
        (obj) => obj.id !== id
      );
      ListData.completedList.push(completedItem);
      ListData.activeCompletedList.push(completedItem);
    }

    return {
      ListData,
      itemButtom,
      isExpanded,
      showButton,
      listItemCompleted,
    };
  },
};
</script>

<style lang="scss" scoped>
.item-enter-active,
.item-leave-active {
  transition: opacity 0.5s;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  // transform: translateX(30px);
}
.List-sec-title {
  color: black;
  font-style: italic;
  font-weight: 20px;
}
.List-items {
  border-radius: 20px;
  margin-bottom: 10px;
  background-color: white;
  color: #6bb36b;
  border: 1px solid #6bb36b;
  padding: 30px;
  transition: height 4s;
  min-height: 300px;

  .List-item {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    .item-wrap {
      display: flex;
      input[type="checkbox"] {
        accent-color: #6bb36b;
        width: 20px;
        height: 20px;
        border: 1px solid #6bb36b;
        background-color: #6bb36b;
        cursor: pointer;
      }
      p {
        margin-bottom: 0px;
        margin-left: 20px;
      }
    }

    .button-wrap {
      position: relative;
      .dots {
        display: none;
        cursor: pointer;
      }
      button {
        position: absolute;
        border: none;
        color: white;
        background-color: #fc5f5f;
        border-radius: 20px;
        padding: 5px 10px;
        left: -46px;
        top: -10px;
      }
    }

    &:hover {
      background-color: #e6ffe6;
      border-radius: 10px;
      .button-wrap {
        .dots {
          display: block;
        }
      }
    }
  }
  .comp-list-wrap {
    .clickable {
      color: black;
      font-weight: bold;
      cursor: pointer;
      width: fit-content;
      span {
        &.expanded {
          display: inline-block;
          transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
        }
      }
    }
    .content {
      height: 0;
      overflow: hidden;
      transition: height 0.5s ease-in-out;
      &.expanded {
        height: auto;
      }
    }
  }
}
</style>
