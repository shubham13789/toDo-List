// stores/counter.js
import { defineStore } from 'pinia'
import axios from "axios";
// import { refreshAuthHeader } from "../setAuthHeader";
export const useListStore = defineStore('lists', {
    state: () => {
        return {
            isAuthenticated: false,
            sortOrder: "asec",
            selectedList: 0,
            userList: [],
            completedList: [],
            activeCompletedList: [],
            allListItems: [],
            activeList: [],
            addListPopup: false,

        }
    },
    watch: {
        myArray() {
            if (!this.userList.length) {
                this.completedList.value = []
            }
        },

    },
    actions: {
        retriveListItems(id) {
            axios
                .get("https://nextjs-dev.deploy.nl/List/" + id)
                .then((response) => {
                    for (var i = 0; i <= response.data.list_items.length - 1; i++) {

                        if (this.sortOrder == "asec") {
                            this.allListItems.push(response.data.list_items[i]);
                        } else {
                            this.allListItems.unshift(response.data.list_items[i]);
                        }
                    }


                })
        },
        retriveLists() {
            axios
                .get("https://nextjs-dev.deploy.nl/List")
                .then((response) => {

                    this.userList = response.data;

                    this.userList.forEach((user) => this.retriveListItems(user.id));

                })

        },
        deleteList(id) {
            axios
                .delete("https://nextjs-dev.deploy.nl/List/" + id)
                .then(() => {

                    this.userList = this.userList.filter((obj) => obj.id !== id);
                    if (!this.userList.lenght) {
                        this.activeCompletedList = []
                    }
                    this.activeList = this.activeList.filter(
                        (obj) => obj.listId !== id);
                    this.allListItems = this.allListItems.filter(
                        (obj) => obj.listId !== id);



                });



        },
        addItem(item) {
            axios
                .post("https://nextjs-dev.deploy.nl/List/" + this.selectedList + "/list-item", {
                    name: item,
                })
                .then((response) => {

                    response.data.list_items.forEach((obj2) => {
                        if (!this.allListItems.some((obj1) => obj1.id === obj2.id)) {
                            this.allListItems.push(obj2);

                            if (!this.completedList.some((obj1) => obj1.id === obj2.id)) {

                                if (this.sortOrder == "asec") {

                                    this.activeList.push(obj2);
                                } else {

                                    this.activeList.unshift(obj2);
                                }

                            }
                            console.log(obj2);
                        }
                    });
                })
        },

        addList(list, item) {
            axios
                .post("https://nextjs-dev.deploy.nl/List/", {
                    "name": list,
                    "list_items": [
                        { "name": item }
                    ]
                })
                .then((response) => {

                    response.data.list_items.forEach((obj2) => {
                        if (!this.allListItems.some((obj1) => obj1.id === obj2.id)) {
                            this.allListItems.push(obj2);
                        }
                    });
                    if (this.sortOrder == "asec") {
                        this.userList.push({ "name": response.data.name, "userId": response.data.userId, "id": response.data.id })
                    } else {
                        this.userList.unshift({ "name": response.data.name, "userId": response.data.userId, "id": response.data.id })
                    }
                })
        },
        deleteListItem(itemId) {
            axios
                .delete("https://nextjs-dev.deploy.nl/List/" + this.selectedList + "/list-item/" + itemId)
                .then(() => {
                    this.activeList = this.activeList.filter(
                        (obj) => obj.id !== itemId)
                    this.allListItems = this.allListItems.filter(
                        (obj) => obj.id !== itemId)
                })
        }


    },
})
