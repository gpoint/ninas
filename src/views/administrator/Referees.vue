<template>
<div>
    <div class="row pt-3" :class="classes">
        <div class="col-xl-12">
            <card shadow type="secondary">
                <template v-slot:header>
                    <div class="bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">My Referees</h3>
                            </div>
                            <modal v-model:show="modals.showRefereeModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                    <template v-slot:header>
                                        <div class="text-muted text-left mb--5">
                                            <h3>{{ addingReferee ? "Add" : "Edit" }} A Person Of Reference <small>(Preferably someone who can attest to your work)</small></h3>
                                        </div>
                                    </template>
                                    <form role="form" @submit.prevent="addingReferee ? addReferee() : editReferee(); modals.showRefereeModal = false;">
                                        <div class="">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Title</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="refereeModel.title" style="width: 100%">
                                                            <option v-for="option in titles" :key="option" :value="option">
                                                                {{ option }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <base-input :required="true" alternative="" label="Fullname" placeholder="What is the name of your Referee" input-classes="form-control-alternative" v-model:value="refereeModel.name" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Your Relationship</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="refereeModel.relationship" style="width: 100%">
                                                            <option v-for="relationship in relationships" :key="relationship" :value="relationship">
                                                                {{ relationship }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <base-input :required="true" type="email" alternative="" label="Email" placeholder="Email" input-classes="form-control-alternative" v-model:value="refereeModel.email" />
                                                </div>
                                                <div class="col-md-3">
                                                    <base-input :required="true" pattern="[0][7-9][0-9]{9}" alternative="" label="Phone" placeholder="Phone" input-classes="form-control-alternative" v-model:value="refereeModel.phone" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <base-input alternative="" label="Case Description">
                                                            <textarea required rows="4" v-model="refereeModel.description" class="form-control form-control-alternative" placeholder="Tell us what can your referee attest to..."></textarea>
                                                        </base-input>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="d-none" ref="refereeFormSubmitButton" type="submit"></button>
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
                                                    {{ refereeList[refereeIndex].name  }},
                                                </strong>
                                                ({{ refereeList[refereeIndex].relationship }})
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {{ refereeList[refereeIndex].phone }} - {{ refereeList[refereeIndex].email }}
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
                                    Referee
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
                                <h6 class="heading-small col-7 col-sm-11 text-muted my--2">
                                    Relationship: {{ referee.relationship }}
                                </h6>
                                <div class="float-right my--3">
                                    <base-button :class="referee.showDelete?'':'d-none'" :loading="deleteInProgress == referee.index" :disabled="editInProgress == referee.index" type="link" class="text-danger btn-sm my--3" @click="refereeIndex = index; modals.showDeleteRefereeModal = true;">
                                        Delete
                                    </base-button>
                                    <base-button :loading="editInProgress == referee.index" :disabled="deleteInProgress == referee.index" type="info" class="btn-sm my--3" @click="refereeIndex = index; modals.showRefereeModal = true;">
                                        Update
                                    </base-button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div>
                                    <div class="pl-2 mt--2">
                                        <div class="row mb-2">
                                            <div class="col-md-12">
                                                <strong> {{ referee.title }}, {{ referee.name }} </strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {{ referee.phone }} -
                                                {{ referee.email }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <p> {{ referee.description }} </p>
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
            titles: ["Mr", "Mrs", "Engr", "Bldr", "Arch", "Dr"],
            relationships: ["Colleague", "Mentor", "Boss", "Employer"],
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

            AssessorService.addReferee(this.newReferee).then((response) => {

                this.newReferee = {}
                this.refereeIndex = 0;
                this.addInProgress = false;
                this.refereeList = this.sortRefereeList(response.data.result.referees);
            }).catch((error) => {
                this.addInProgress = false;
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        editReferee() {

            var referee = this.refereeList[this.refereeIndex];

            this.editInProgress = referee.index;

            AssessorService.updateReferee(referee.index, referee).then((response) => {

                this.refereeIndex = 0;
                this.editInProgress = {};
                this.refereeList = this.sortRefereeList(response.data.result.referees);
            }).catch((error) => {
                this.editInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        deleteReferee() {

            var referee = this.refereeList[this.refereeIndex];

            this.deleteInProgress = referee.index;

            AssessorService.deleteReferee(referee.index).then((response) => {

                this.refereeIndex = 0;
                this.deleteInProgress = {};
                this.refereeList = this.sortRefereeList(response.data.result.referees);
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

            this.refereeList = this.sortRefereeList(response.data.result.referees);
        })
    },
};
</script>

<style></style>
