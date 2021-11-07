<template>
<div class="content">
    <base-header class="header pb-8 pt-5 pt-md-6 d-flex align-items-center" style="
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      ">
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center mt-5">
            <div class="row">
                <div class="col-lg-7 col-md-10">
                    <p class="text-white mt-0 mb-3">
                        <!-- This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks -->
                    </p>
                </div>
            </div>
        </div>
    </base-header>
    <div class="container-fluid mt--7">

        <div>
            <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
                <template v-slot:header>
                    <h3 class="mb-0">Received Notifications Table</h3>
                    <p class="text-sm mb-0">
                    </p>
                </template>
                <div class="px-3">
                    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                        <el-select class="select-primary pagination-select" v-model="pagination.perPage" placeholder="Per page">
                            <el-option class="select-primary" v-for="item in pagination.perPageOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>

                        <el-input type="search" class="mb-3 col-md-5" clearable prefix-icon="el-icon-search" style="width: 200px" placeholder="Filter Records" v-model="searchQuery" aria-controls="datatables">
                        </el-input>
                    </div>
                    <el-table :data="queriedData" row-key="id" header-row-class-name="thead-light">
                        <el-table-column v-for="column in tableColumns" :key="column.label" v-bind="column" sortable>
                        </el-table-column>
                        <el-table-column min-width="80px" align="left" label="View">
                            <template v-slot:default="props">
                                <div class="d-flex">
                                    <base-button :loading="props.row.loading" @click="handleView(props.$index, props.row)" class="like btn-link" :type="props.row.read == true? 'info' : 'danger'" size="sm" icon>
                                        <i class="text-white ni ni-bell-55"></i>
                                    </base-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <template v-slot:footer>
                    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                        <div class="">
                            <p class="card-category">
                                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                            </p>
                        </div>
                        <base-pagination class="pagination-no-border" v-model="pagination.currentPage" :per-page="pagination.perPage" :total="total">
                        </base-pagination>
                    </div>
                </template>
            </card>
        </div>
    </div>
    <div class="container-fluid mt-5">
        <div v-if="user.role == 'ADMINISTRATOR'">
            <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
                <template v-slot:header>
                    <h3 class="mb-0">Sent Notifications Table</h3>
                    <p class="text-sm mb-0">
                    </p>
                </template>
                <div class="px-3">
                    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                        <el-select class="select-primary pagination-select" v-model="paginationForSentNotifications.perPage" placeholder="Per page">
                            <el-option class="select-primary" v-for="item in paginationForSentNotifications.perPageOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>

                        <el-input type="search" class="mb-3 col-md-5" clearable prefix-icon="el-icon-search" style="width: 200px" placeholder="Filter Records" v-model="searchQuery" aria-controls="datatables">
                        </el-input>
                    </div>
                    <el-table :data="queriedDataForSentNotifications" row-key="id" header-row-class-name="thead-light">
                        <el-table-column v-for="column in tableColumnsForSentNotifications" :key="column.label" v-bind="column" sortable>
                        </el-table-column>
                        <el-table-column min-width="80px" align="left" label="View">
                            <template v-slot:default="props">
                                <div class="d-flex">
                                    <base-button :loading="props.row.loading" @click="handleView(props.$index, props.row)" class="like btn-link" :type="props.row.read == true? 'default' : 'danger'" size="sm" icon>
                                        <i class="text-white ni ni-bell-55"></i>
                                    </base-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <template v-slot:footer>
                    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                        <div class="">
                            <p class="card-category">
                                Showing {{ fromForSentNotifications+ 1 }} to {{ toForSentNotifications }} of {{ totalForSentNotifications }} entries
                            </p>
                        </div>
                        <base-pagination class="pagination-no-border" v-model="paginationForSentNotifications.currentPage" :per-page="paginationForSentNotifications.perPage" :total="totalForSentNotifications">
                        </base-pagination>
                    </div>
                </template>
            </card>
        </div>
    </div>

    <modal v-if="modals.row != null" v-model:show="modals.showNotificationModal" :gradient="(modals.row.type == 'Documentation Error Alert')? 'danger' : 'white'" :modal-classes="(modals.row.type == 'Documentation Error Alert')? 'modal-danger' : 'modal-white'  + ' modal-dialog-centered'">
        <template v-slot:header>
            <h6 class="modal-title" id="modal-title-notification">
                Notification Type: {{modals.row.type}}
            </h6>
        </template>

        <strong class="heading-small">
            From: {{modals.row.senderName}}
        </strong>
        <div class="text-small" v-if="modals.row.type == 'Assessment Job Notification'">

            <p class="heading-small">
                Assessment Date {{modals.row.assessmentDate}}
                <br>
                Accept Deadline: {{modals.row.acceptanceDeadline}}
            </p>
        </div>
        <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">{{ modals.row.title }}</h4>
            <div class="pl-2 mt--2">
                <div class="row mb-2 text-left">
                    <div class="col-md-12">
                        <hr class="my-1" />
                        <strong class="heading-small">
                            Message:
                        </strong>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {{ modals.row.description }}
                        <strong>
                        </strong>
                    </div>
                </div>
            </div>
        </div>

        <template v-slot:footer>
            <base-button v-if="modals.row.type == 'Assessment Job Notification'" type="white" @click="deleteExperience();modals.showNotificationModal = false">
                Accept Offer
            </base-button>
            <base-button type="white" text-color="info" class="ml-auto" @click="modals.showNotificationModal = false">
                Close
            </base-button>
        </template>
    </modal>

</div>
</template>

<script>
import {
    ElTable,
    ElTableColumn,
    ElSelect,
    ElOption,
    ElInput,
} from "element-plus";
import BasePagination from "@/components/BasePagination";
import swal from "sweetalert2";
import NotificationsService from "../api/services/notifications.service";
import BaseInput from '../components/BaseInput.vue';

export default {
    components: {
        BasePagination,
        [ElSelect.name]: ElSelect,
        [ElOption.name]: ElOption,
        [ElTable.name]: ElTable,
        [ElInput.name]: ElInput,
        [ElTableColumn.name]: ElTableColumn,
        BaseInput
    },
    computed: {
        pagedData() {
            return this.tableData.slice(this.from, this.to);
        },
        pagedDataForSentNotifications() {
            return this.tableDataForSentNotifications.slice(this.fromForSentNotifications, this.toForSentNotifications);
        },
        /***
         * Searches through table data and returns a paginated array.
         * Note that this should not be used for table with a lot of data as it might be slow!
         * Do the search and the pagination on the server and display the data retrieved from server instead.
         * @returns {computed.pagedData}
         */
        queriedData() {
            if (!this.searchQuery) {
                return this.pagedData;
            }
            let result = this.tableData.filter((row) => {
                let isIncluded = false;
                for (let key of this.propsToSearch) {
                    let rowValue = (row[key] + "").toLowerCase().toString();
                    if (
                        rowValue.includes &&
                        rowValue.includes(this.searchQuery.toLowerCase())
                    ) {
                        isIncluded = true;
                    }
                }
                return isIncluded;
            });

            return result.slice(this.from, this.to);
        },
        queriedDataForSentNotifications() {

            if (!this.searchQueryForSentNotifications) {
                return this.pagedDataForSentNotifications;
            }
            let result = this.tableDataForSentNotifications.filter((row) => {
                let isIncluded = false;
                for (let key of this.propsToSearchForSentNotifications) {
                    let rowValue = (row[key] + "").toLowerCase().toString();
                    if (
                        rowValue.includes &&
                        rowValue.includes(this.searchQueryForSentNotifications.toLowerCase())
                    ) {
                        isIncluded = true;
                    }
                }
                return isIncluded;
            });

            return result.slice(this.fromForSentNotifications, this.toForSentNotifications);
        },
        to() {
            let highBound = this.from + this.pagination.perPage;
            if (this.total < highBound) {
                highBound = this.total;
            }
            return highBound;
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1);
        },
        toForSentNotifications() {
            let highBound = this.fromForSentNotifications + this.paginationForSentNotifications.perPage;
            if (this.totalForSentNotifications < highBound) {
                highBound = this.totalForSentNotifications;
            }
            return highBound;
        },
        fromForSentNotifications() {
            return this.paginationForSentNotifications.perPage * (this.paginationForSentNotifications.currentPage - 1);
        },
        user() {
            return JSON.parse(window.localStorage.getItem("user")).user;
        },
        total() {
            return this.searchedData.length > 0 ?
                this.searchedData.length :
                this.tableData.length;
        },
        totalForSentNotifications() {
            return this.searchedDataForSentNotifications.length > 0 ?
                this.searchedDataForSentNotifications.length :
                this.tableDataForSentNotifications.length;
        },

    },
    data() {
        return {
            modals: {},
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 100],
                total: 0,
            },
            paginationForSentNotifications: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 100],
                total: 0,
            },
            searchQuery: "",
            searchQueryForSentNotifications: "",
            propsToSearch: ["title", "type"],
            propsToSearchForSentNotifications: ["title", "type"],
            tableColumns: [{
                    prop: "type",
                    label: "Type",
                    minWidth: 125,
                },
                {
                    prop: "title",
                    label: "Title",
                    minWidth: 125,
                },
                {
                    prop: "description",
                    label: "Description",
                    minWidth: 150,
                },
                {
                    prop: "createdAt",
                    label: "Received",
                    minWidth: 80,
                },
            ],
            tableColumnsForSentNotifications: [{
                    prop: "type",
                    label: "Type",
                    minWidth: 125,
                },
                {
                    prop: "title",
                    label: "Title",
                    minWidth: 125,
                },
                {
                    prop: "description",
                    label: "Description",
                    minWidth: 150,
                },
                {
                    prop: "createdAt",
                    label: "Sent",
                    minWidth: 80,
                },
            ],
            tableData: [],
            tableDataForSentNotifications: [],
            fuseSearch: null,
            searchedData: [],
            searchedDataForSentNotifications: [],
        };
    },
    methods: {
        handleView(index, row) {
            row.loading = true;

            NotificationsService.getNotification(row.id).then((response) => {

                row.loading = false;
                this.modals.showNotificationModal = true;
                this.modals.row = response.data.result;
                this.modals.row.firstName = row.firstName;
                this.modals.row.lastName = row.lastName;
                this.modals.row.name = row.firstName + " " + row.lastName;
            }).catch((error) => {

                row.loading = false;
            });

            this.modals.index = index;
        },
        handleEdit(index, row) {
            const swalWithBootstrapButtons2 = swal.mixin({
                customClass: {
                    confirmButton: "btn btn-info btn-fill",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons2.fire({
                title: `You want to edit ${row.name}`,
            });
        },
        handleDelete(index, row) {
            const swalWithBootstrapButtons3 = swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success btn-fill",
                    cancelButton: "btn btn-danger btn-fill",
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons3
                .fire({
                    title: "Are you sure?",
                    text: `You won't be able to revert this!`,
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                })
                .then((result) => {
                    if (result.value) {
                        this.deleteRow(row);
                        swalWithBootstrapButtons3.fire({
                            title: "Deleted!",
                            text: `You deleted ${row.name}`,
                        });
                    }
                });
        },
        deleteRow(row) {
            let indexToDelete = this.tableData.findIndex(
                (tableRow) => tableRow.id === row.id
            );
            if (indexToDelete >= 0) {
                this.tableData.splice(indexToDelete, 1);
            }
        },
    },
    mounted() {
        NotificationsService.getNotifications().then((response) => {
            this.tableData = response.data.result;
        });
        NotificationsService.getSentNotifications().then((response) => {
            this.tableDataForSentNotifications = response.data.result;
        });
    },

};
</script>

<style>
.no-border-card .card-footer {
    border-top: 0;
    border-top: 0;
}
</style>
