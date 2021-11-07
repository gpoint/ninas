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
                    <h3 class="mb-0">Assessors Table</h3>
                    <p class="text-sm mb-0">
                        This is a searchable table of assessors. You can search with the name, standard, scope or sub-scopes description
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
                        <el-table-column class="d-none" align="left">
                            <template v-slot:default="props">
                                <div class="d-none">
                                    {{props.row.portfolioSummary}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="80px" align="left" label="Actions">
                            <template v-slot:default="props">
                                <div class="d-flex">
                                    <base-button :loading="props.row.loading" @click="handleView(props.$index, props.row)" class="like btn-link" type="default" size="sm" icon>
                                        <i class="text-white ni ni-badge"></i>
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
    <modal v-if="modals.row != null" v-model:show="modals.showNotificationModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
        <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
            <template v-slot:header>
                <div class="text-muted text-left mb--5">
                    <h3>Send Notification To {{ modals.row.firstName + " " + modals.row.lastName}} </h3>
                </div>
            </template>
            <form role="form" @submit.prevent="sendNotification();">
                <div class="">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-control-label">Notification Type <span>*</span></label>
                                <select :required="true" class="form-control form-control-alternative" v-model="modals.notificationModel.type" style="width: 100%">
                                    <option v-for="type in ['Regular Notification', 'Documentation Error Alert', 'Assessment Job Notification']" :key="type" :value="type">
                                        {{ type }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <base-input :required="true" alternative="" label="Notification Title" :placeholder="'What are you notifying ' + modals.row.firstName + ' about?'" input-classes="form-control-alternative" v-model:value="modals.notificationModel.title" />
                        </div>
                    </div>
                    <div class="row" v-if="modals.notificationModel.type == 'Assessment Job Notification'">
                        <div class="col-md-6">
                            <base-input :required="true" type="date" alternative="" label="Assessment Date" :placeholder="'Assessment Date'" input-classes="form-control-alternative" v-model:value="modals.notificationModel.assessmentDate" />
                        </div>
                        <div class="col-md-6">
                            <base-input :required="true" type="date" alternative="" label="Acceptance Deadline" :placeholder="'Acceptance Deadline'" input-classes="form-control-alternative" v-model:value="modals.notificationModel.acceptanceDeadline" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <base-input alternative="" label="Description">
                                    <textarea v-if="modals.notificationModel.type == 'Documentation Error Alert'" required rows="4" v-model="modals.notificationModel.description" class="form-control form-control-alternative" placeholder="Fill in the documentation error that needs to be attended to."></textarea>
                                    <textarea v-else-if="modals.notificationModel.type == 'Assessment Job Notification'" required rows="4" v-model="modals.notificationModel.description" class="form-control form-control-alternative" placeholder="Type in the description of the Job including the standard, scope and possible sub-scopes to be assessed."></textarea>
                                    <textarea v-else required rows="4" v-model="modals.notificationModel.description" class="form-control form-control-alternative" placeholder="Type in your message."></textarea>
                                </base-input>
                            </div>
                        </div>
                    </div>
                    <button class="d-none" ref="notificationFormSubmitButton" type="submit"></button>
                </div>
            </form>
            <template v-slot:footer>
                <div class="">
                    <base-button type="warning" @click=" modals.showNotificationModal = false" class="my-1">
                        Close
                    </base-button>
                    <base-button type="info" @click="$refs.notificationFormSubmitButton.click();" class="my-1 float-right">
                        Save
                    </base-button>
                </div>
            </template>
        </card>
    </modal>
    <modal v-model:show="modals.showUserModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
        <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
            <template v-slot:header>
                <div class="text-muted text-left mb--5">
                    <h3>Assessor Information </h3>
                </div>
                <div class="float-right mb--5">
                    <base-button type="success" @click="modals.showUserModal = false; modals.showNotificationModal = true" class="btn-sm m-0 mr-3  ">
                        Send Notification
                    </base-button>
                    <base-button type="danger" @click="modals.showUserModal = false" class="btn-sm m-0 ">
                        Close
                    </base-button>
                </div>
            </template>
            <form role="form" v-if="modals.row != null">
                <div class="">
                    <div class="row">
                        <div class="col-12">
                            <div class="card shadow">
                                <div class="card-header">
                                    <h6 class="heading-small col-7 col-sm-11 text-muted my--2">
                                        1. General Information
                                    </h6>
                                </div>
                                <div class="card-body">

                                    <form>
                                        <h6 class="heading-small text-muted mb-4">User information</h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <base-input alternative="" label="First name" :readonly="true" input-classes="form-control-alternative" :value="modals.row.firstName" />
                                                </div>
                                                <div class="col-lg-6">
                                                    <base-input alternative="" label="Last name" :readonly="true" input-classes="form-control-alternative" :value="modals.row.lastName" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <base-input alternative="" label="Gender" :readonly="true" input-classes="form-control-alternative" :value="modals.row.gender" />
                                                </div>
                                                <div class="col-lg-6">
                                                    <base-input alternative="" type="date" label="Date Of Birth" :readonly="true" input-classes="form-control-alternative" v-model:value="modals.row.dateOfBirth" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />
                                        <!-- Address -->
                                        <h6 class="heading-small text-muted mb-4">
                                            Residence Information
                                        </h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <base-input alternative="" label="Home Address" :readonly="true" input-classes="form-control-alternative" :value="modals.row.address" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <base-input alternative="" label="Resident City" :readonly="true" input-classes="form-control-alternative" :value="modals.row.city" />
                                                </div>
                                                <div class="col-lg-4">
                                                </div>
                                                <div class="col-lg-4">
                                                    <base-input alternative="" label="Resident State" :readonly="true" input-classes="form-control-alternative" :value="modals.row.stateOfResidence" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />
                                        <!-- Description -->
                                        <h6 class="heading-small text-muted mb-4">
                                            Basic Assessor Details
                                        </h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <base-input alternative="" :label="'About ' + modals.row.name">
                                                            <textarea rows="4" readonly v-model="modals.row.description" class="form-control bg-white form-control-alternative" placeholder="A few words about why you should receive the award ..."></textarea>
                                                        </base-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card shadow mt-3">
                                <div class="card-header">
                                    <h6 class="heading-small col-7 col-sm-11 my--2" :class="modals.row.education.length == 0? 'text-danger' : 'text-muted'">
                                        {{ modals.row.education.length == 0? modals.row.name + ' has not saved any ' : '2. ' }} Education & Past Schooling
                                    </h6>
                                </div>
                                <div class="card-body" v-if="modals.row.education.length != 0">
                                    <div v-for="(edu, index) in modals.row.education" :key="index">
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <strong> {{ edu.degree }} </strong>,
                                                    {{ edu.course }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    {{ edu.school }},
                                                    <strong> {{ edu.location }} </strong>
                                                </div>
                                                <strong class="col-12 heading-small text-left">{{ "From: " + edu.startMonth + ", " + edu.startYear }} - {{ edu.endMonth + ", " + exp.endYear }}</strong>
                                            </div>
                                            <hr class="mt-0 mb-4" style="border:solid 2px darkgreen;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card shadow mt-3">
                                <div class="card-header">
                                    <h6 class="heading-small col-7 col-sm-11 my--2" :class="modals.row.experience.length == 0? 'text-danger' : 'text-muted'">
                                        {{ modals.row.experience.length == 0? modals.row.name + ' has not saved any ' : '3. ' }} Experience & Work History
                                    </h6>
                                </div>
                                <div class="card-body" v-if="modals.row.experience.length != 0">
                                    <div v-for="(exp, index) in modals.row.experience" :key="index">
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <span> {{ exp.position }} <strong class="small">at</strong> {{ exp.company }}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 small">
                                                    <strong>Location: </strong><span class="small"> {{ exp.location }}</span>
                                                    <br>
                                                    <strong>Description: </strong><span class="small">{{exp.description}}</span>
                                                </div>
                                                <strong class="col-12 heading-small text-left">{{ "From: " + exp.startMonth + ", " + exp.startYear }} - {{ exp.currentlyWorking ? "Present" : exp.endMonth + ", " + exp.endYear }}</strong>
                                            </div>
                                            <hr class="mt-0 mb-4" style="border:solid 2px darkgreen;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card shadow mt-3">
                                <div class="card-header">
                                    <h6 class="heading-small col-7 col-sm-11 my--2" :class="modals.row.cabexperience.length == 0? 'text-danger' : 'text-muted'">
                                        {{ modals.row.cabexperience.length == 0? modals.row.name + ' has not saved any ' : '3. ' }} CAB Experience & Assessment History
                                    </h6>
                                </div>
                                <div class="card-body" v-if="modals.row.cabexperience.length != 0">
                                    <div v-for="(exp, index) in modals.row.cabexperience" :key="index">
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <span> {{ exp.position }} <strong class="small">at</strong> {{ exp.company }}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12 small">
                                                    <strong>Location: </strong><span class="small"> {{ exp.location }}</span>
                                                    <br>
                                                    <strong>Description: </strong><span class="small">{{exp.description}}</span>
                                                </div>
                                                <strong class="col-12 heading-small text-left">{{ "On: " + exp.startDay + " " +exp.startMonth + ", " + exp.startYear }} </strong>
                                            </div>
                                            <hr class="mt-0 mb-4" style="border:solid 2px darkgreen;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card shadow mt-3">
                                <div class="card-header">
                                    <h6 class="heading-small col-7 col-sm-11 my--2" :class="modals.row.portfolio.length == 0? 'text-danger' : 'text-muted'">
                                        {{ modals.row.portfolio.length == 0? modals.row.name + ' has not saved any ' : '4. ' }} Portfolio of Standards
                                    </h6>
                                </div>
                                <div class="card-body" v-if="modals.row.portfolio.length != 0">
                                    <div v-for="(port, index) in modals.row.portfolio" :key="index">
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <strong> {{ port.standard + " : : " + port.scope }} </strong>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <strong class="heading-small">{{ port.description }}</strong>
                                                </div>
                                            </div>
                                            <hr class="mt-0 mb-4" style="border:solid 2px darkgreen;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <template v-slot:footer>
                <div class="">
                    <base-button type="info" @click="modals.showUserModal = false; modals.row.loading = false;" class="my-1 float-right">
                        Close
                    </base-button>
                </div>
            </template>
        </card>
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
import AssessorService from "../api/services/assessor.service";
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
        total() {
            return this.searchedData.length > 0 ?
                this.searchedData.length :
                this.tableData.length;
        },

    },
    data() {
        return {
            modals: {
                notificationModel: {},
            },
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 25, 50, 100],
                total: 0,
            },
            searchQuery: "",
            propsToSearch: ["firstname", "lastname", "email", "portfolioSummary", ],
            tableColumns: [{
                    prop: "firstName",
                    label: "First name",
                    minWidth: 125,
                },
                {
                    prop: "lastName",
                    label: "Last name",
                    minWidth: 125,
                },
                {
                    prop: "email",
                    label: "Email",
                    minWidth: 150,
                },
                {
                    prop: "phone",
                    label: "Phone",
                    minWidth: 100,
                },
                {
                    prop: "numberOfAssessments",
                    label: "Assessments",
                    minWidth: 80,
                },
            ],
            tableData: [],
            fuseSearch: null,
            searchedData: [],
        };
    },
    methods: {
        sendNotification() {

            this.modals.showNotificationModal = false;
            this.modals.notificationModel.userId = this.modals.row.userId;

            NotificationsService.sendNotification(this.modals.notificationModel).then((response) => {
                // 
            }).catch((error) => {
                // 
            }).finally(() => {
                this.notificationModel = {};
            });
        },
        handleView(index, row) {
            row.loading = true;

            AssessorService.getAssessor(row.id).then((response) => {

                row.loading = false;
                this.modals.showUserModal = true;
                this.modals.row = response.data.result;
                this.modals.row.userId = row.id
                this.modals.row.firstName = row.firstName;
                this.modals.row.lastName = row.lastName;
                this.modals.row.name = row.firstName + " " + row.lastName;
            }).catch((error) => {

                row.loading = false;
                this.modals.showUserModal = false;
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
        AssessorService.getAssessors().then((response) => {
            this.tableData = response.data.result;
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
