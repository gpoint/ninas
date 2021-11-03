<template>
<div>
    <div class="row pt-3" :class="classes">
        <div class="col-xl-12">
            <card shadow type="secondary">
                <template v-slot:header>
                    <div class="bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">My Standards</h3>
                            </div>
                            <modal v-model:show="modals.showRefereeModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                    <template v-slot:header>
                                        <div class="text-muted text-left mb--5">
                                            <h3>{{ addingReferee ? "Add" : "Edit" }} Standard and Scope</h3>
                                        </div>
                                    </template>
                                    <form role="form" @submit.prevent="addingReferee ? addReferee() : editReferee(); modals.showRefereeModal = false;">

                                        <div>
                                            <div class="">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="form-control-label">Standard</label>
                                                            <select required class="form-control form-control-alternative" v-model="refereeModel.standard" style="width: 100%">
                                                                <option v-for="(option, index) in standards" :key="index" :value="index">
                                                                    {{ option.value }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <div class="form-group">
                                                            <label v-if="refereeModel.standard == null" class="form-control-label">
                                                                Scope
                                                            </label>
                                                            <label class="form-control-label" v-if="refereeModel.standard != null">{{
                                                                    standards[refereeModel.standard]
                                                                        .value == "Other"
                                                                        ? "Enter a comma after your standard, Example: ISO XXXX, Scope"
                                                                        : "Scope"
                                                                    }}</label>
                                                            <input v-if="
                                                                    refereeModel.standard == null ||
                                                                    standards[refereeModel.standard]
                                                                        .value == 'Other'
                                                                    " required class="form-control form-control-alternative" v-model="refereeModel.scope" />
                                                            <select v-if="
                                                                    refereeModel.standard != null &&
                                                                    standards[refereeModel.standard]
                                                                        .value != 'Other'
                                                                    " required class="form-control form-control-alternative" v-model="refereeModel.scope" style="width: 100%">
                                                                <option v-for="option in standards[
                                                                        refereeModel.standard
                                                                    ].scopes" :key="option" :value="option">
                                                                    {{ option }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <base-input alternative="" label="Description">
                                                                <textarea rows="4" v-model="refereeModel.description" class="form-control form-control-alternative" placeholder="Describe your competence within your scope and detail your subscopes ..."></textarea>
                                                            </base-input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" ref="refereeFormSubmitButton" class="d-none"></button>
                                        </div>
                                    </form>
                                    <template v-slot:footer>
                                        <div class="">
                                            <base-button type="warning" @click=" modals.showRefereeModal = false" class="my-1">
                                                Close
                                            </base-button>
                                            <base-button type="info" @click="$refs.refereeFormSubmitButton.click();" class="my-1 float-right">
                                                Save
                                            </base-button>
                                        </div>
                                    </template>
                                </card>
                            </modal>
                            <modal v-if="refereeIndex < refereeList.length" v-model:show="modals.showDeleteRefereeModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
                                <template v-slot:header>
                                    <h6 class="modal-title" id="modal-title-notification">
                                        Your attention is required
                                    </h6>
                                </template>
                                <div class="py-3 text-center">
                                    <i class="ni ni-bell-55 ni-3x"></i>
                                    <h4 class="heading mt-4">Deleting, Are you sure?</h4>
                                    <div class="pl-2 mt--2">
                                        <div class="row mb-2">
                                            <div class="col-md-12">
                                                <hr class="my-1" />
                                                <strong>
                                                    {{ refereeList[refereeIndex].standard  }},
                                                </strong>
                                                ({{ refereeList[refereeIndex].scope }})
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {{ refereeList[refereeIndex].description }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <template v-slot:footer>
                                    <base-button type="white" @click="deleteReferee();modals.showDeleteRefereeModal = false">
                                        Yes, I'm sure!
                                    </base-button>
                                    <base-button type="white" text-color="info" class="ml-auto" @click="modals.showDeleteRefereeModal = false">
                                        Close
                                    </base-button>
                                </template>
                            </modal>

                            <div class="col-4 text-right">
                                <base-button :loading="modals.showRefereeModal || addInProgress" href="/profile" @click.prevent="refereeIndex = refereeList.length; modals.showRefereeModal = true; " class="btn btn-sm btn-default">
                                    <i class="fa fa-plus"></i>
                                    Portfolio
                                </base-button>
                            </div>
                        </div>
                    </div>
                </template>

                <form class="row">
                    <div readonly class="col-12 mb-3 btn-outline-danger text-default btn-block p-2" v-if="errorMessage != ''" @click="errorMessage = ''" style="background: #ffc8c8 !important; font-size: 0.775rem;border-radius:5px;">
                        <i class="fa fa-times float-right my-1 text-danger bg-white" style="height:16px;width:16px;border-radius:100%;padding:1px 0 0 4px;">
                        </i>
                        {{ errorMessage }}
                    </div>
                    <div class="col-lg-6 mb-4" v-for="(referee, index) in refereeList" :key="index">
                        <div class="card shadow" @mouseenter="referee.showDelete = true" @mouseleave="referee.showDelete = false">
                            <div class="card-header">
                                <div class="float-right my--3">
                                    <base-button :class="referee.showDelete?'':'d-none'" :loading="deleteInProgress == referee.index" :disabled="editInProgress == referee.index" type="link" class="text-danger btn-sm my--3" @click="refereeIndex = index; modals.showDeleteRefereeModal = true;">
                                        Delete
                                    </base-button>
                                    <!-- <base-button :loading="editInProgress == referee.index" :disabled="deleteInProgress == referee.index" type="info" class="btn-sm my--3" @click="refereeIndex = index; modals.showRefereeModal = true;">
                                        Update
                                    </base-button> -->
                                </div>
                            </div>
                            <div class="card-body">
                                <div>
                                    <div class="pl-2 mt--2">
                                        <div class="row mb-2">
                                            <div class="col-md-12">
                                                <strong> {{ referee.standard }} </strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <strong> {{ referee.scope }} </strong>
                                                <p>{{ referee.description }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </card>
        </div>
    </div>
</div>
</template>

<script>
import AssessorService from "../../api/services/assessor.service";
import Badge from "../../components/Badge.vue";

export default {
    components: {
        Badge
    },
    name: "referee",
    props: {
        classes: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            refereeIndex: 0,
            modals: {},
            refereeList: [],
            newReferee: {},
            addInProgress: false,
            editInProgress: {},
            deleteInProgress: {},
            errorMessage: "",
            standards: [{
                    value: "ISO/IEC 17025",
                    scopes: ["Calibration Laboratories", "Testing Laboratories"],
                },
                {
                    value: "ISO 15189",
                    scopes: ["Medical Testing Laboratories"],
                },
                {
                    value: "ISO/IEC 17065",
                    scopes: ["Product Certification Bodies"],
                },
                {
                    value: "ISO/IEC 17020",
                    scopes: ["Inspection bodies"],
                },
                {
                    value: "ISO/IEC 17021",
                    scopes: ["Audit and Management Certification Bodies"],
                },
                {
                    value: "ISO/IEC 17024",
                    scopes: ["Personnel Certification Bodies"],
                },
                {
                    value: "ISO/IEC 17043",
                    scopes: ["Proficiency Testing Bodies"],
                },
                {
                    value: "ISO 17034",
                    scopes: ["Reference Materials Producers"],
                },
                {
                    value: "Other",
                },
            ],
        };
    },
    computed: {
        addingReferee() {
            return this.refereeIndex == this.refereeList.length;
        },
        refereeModel() {
            return this.refereeIndex == this.refereeList.length ? this.newReferee : this.refereeList[this.refereeIndex];
        }
    },
    methods: {
        sortRefereeList(refereeList) {
            refereeList.forEach((referee, index) => {
                referee.index = index;
            });
            return refereeList.sort(
                (a, b) => new Date(b.startYear, this.months.indexOf(b.startMonth) + 1) - new Date(a.startYear, this.months.indexOf(a.startMonth) + 1)
            );
        },
        addReferee() {

            this.addInProgress = true;
            var standard = this.standards[this.refereeModel.standard].value;
            var scope = this.refereeModel.scope + "";
            //
            if (standard == "Other" && scope.lastIndexOf(",") != -1) {
                scope = scope.split(",");
                standard = scope[0].trim();
                scope = scope[1].trim();
            }
            //
            var model = {
                standard,
                scope,
                description: this.refereeModel.description,
            };

            AssessorService.addPortfolio(model).then((response) => {

                this.newReferee = {}
                this.refereeIndex = 0;
                this.addInProgress = false;
                this.refereeList = this.sortRefereeList(response.data.result.portfolio);
            }).catch((error) => {
                this.addInProgress = false;
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        deleteReferee() {

            var referee = this.refereeList[this.refereeIndex];

            this.deleteInProgress = referee.index;

            AssessorService.deletePortfolio(referee.index).then((response) => {

                this.refereeIndex = 0;
                this.deleteInProgress = {};
                this.refereeList = this.sortRefereeList(response.data.result.portfolio);
            }).catch((error) => {
                this.deleteInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        setRefereeList(list) {
            return (this.refereeList = list.sort(
                (a, b) => new Date(b.startDate) - new Date(a.startDate)
            ));
        },
    },
    mounted() {
        AssessorService.getProfile().then((response) => {

            this.refereeList = this.sortRefereeList(response.data.result.portfolio);
        })
    },
};
</script>
