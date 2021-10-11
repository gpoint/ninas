<template>
<div>
    <base-header class="header pb-8 pt-5 pt-md-6 d-flex align-items-center">
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
        <div class="row">
            <div class="col-xl-12">
                <card shadow type="secondary">
                    <template v-slot:header>
                        <div class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My Portfolio</h3>
                                </div>
                                <modal v-model:show="modals.showAddPortfolioModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                    <form @submit.prevent="addPortfolio">
                                        <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                            <template v-slot:header>
                                                <div class="text-muted text-left mb--5">
                                                    <h3>Add Portfolio</h3>
                                                </div>
                                            </template>
                                            <div>
                                                <div class="">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label class="form-control-label">Standard</label>
                                                                <select required class="form-control form-control-alternative" v-model="addPortfolioModel.standard" style="width: 100%">
                                                                    <option v-for="(option, index) in standards" :key="index" :value="index">
                                                                        {{ option.value }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="form-group">
                                                                <label v-if="addPortfolioModel.standard == null" class="form-control-label">
                                                                    Scope
                                                                </label>
                                                                <label class="form-control-label" v-if="addPortfolioModel.standard != null">{{
                                      standards[addPortfolioModel.standard]
                                        .value == "Other"
                                        ? "Enter a comma after your standard, Example: ISO XXXX, Scope"
                                        : "Scope"
                                    }}</label>
                                                                <input v-if="
                                      addPortfolioModel.standard == null ||
                                      standards[addPortfolioModel.standard]
                                        .value == 'Other'
                                    " required class="form-control form-control-alternative" v-model="addPortfolioModel.scope" />
                                                                <select v-if="
                                      addPortfolioModel.standard != null &&
                                      standards[addPortfolioModel.standard]
                                        .value != 'Other'
                                    " required class="form-control form-control-alternative" v-model="addPortfolioModel.scope" style="width: 100%">
                                                                    <option v-for="option in standards[
                                        addPortfolioModel.standard
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
                                                                    <textarea rows="4" v-model="addPortfolioModel.description" class="form-control form-control-alternative" placeholder="Describe your competence within your scope and detail your subscopes ..."></textarea>
                                                                </base-input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <template v-slot:footer>
                                                <div class="">
                                                    <base-button type="warning" @click="modals.showAddPortfolioModal = false" class="my-1">
                                                        Close
                                                    </base-button>
                                                    <base-button type="info" nativeType="submit" class="my-1 float-right">
                                                        Save
                                                    </base-button>
                                                </div>
                                            </template>
                                        </card>
                                    </form>
                                </modal>
                                <modal v-if="deleteIndex != null" v-model:show="modals.showDeletePortfolioModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
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
                                                    {{ portfolioList[deleteIndex].standard }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    {{ portfolioList[deleteIndex].scope }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <template v-slot:footer>
                                        <base-button type="white" @click="deletePortfolio">
                                            Yes, I'm sure!
                                        </base-button>
                                        <base-button type="white" text-color="info" class="ml-auto" @click="modals.showDeletePortfolioModal = false">
                                            Close
                                        </base-button>
                                    </template>
                                </modal>

                                <div class="col-4 text-right">
                                    <a href="/profile" @click.prevent="modals.showAddPortfolioModal = true" class="btn btn-sm btn-success">
                                        <i class="fa fa-plus"></i>
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <form class="row">
                        <div class="col-md-6 mb-4" v-for="(portfolio, index) in portfolioList" :key="portfolio.id">
                            <div class="card shadow">
                                <div class="card-header">
                                    <div class="my--2">
                                        <base-button type="danger" class="btn-sm" @click="
                          deleteIndex = index;
                          modals.showDeletePortfolioModal = true;
                        ">
                                            Delete
                                        </base-button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div>
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <strong> {{ portfolio.standard }} </strong>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <strong> {{ portfolio.scope }} </strong>
                                                    <p>{{ portfolio.description }}</p>
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
</div>
</template>

<script>
import PortfolioService from "../api/services/portfolio.service";

export default {
    name: "portfolio",
    data() {
        return {
            addPortfolioModel: {},
            deleteIndex: null,
            modals: {},
            portfolioModal: {},
            portfolioList: [],
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
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        };
    },
    computed: {
        sortedPortfolioList() {
            var portfolioList = this.portfolioList;
            return portfolioList.sort(
                (a, b) => new Date(a.startDate) - new Date(b.startDate)
            );
        },
    },
    methods: {
        addPortfolio() {
            var standard = this.standards[this.addPortfolioModel.standard].value;
            var scope = this.addPortfolioModel.scope + "";
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
                description: this.addPortfolioModel.description,
            };
            PortfolioService.addPortfolio(model).then((response) => {
                this.portfolioList.push(response.data.result);
                this.setPortfolioList(this.portfolioList);
            });
            this.modals.showAddPortfolioModal = false;
            this.addPortfolioModel = {};
        },
        editPortfolio() {
            var model = {
                standard: this.editPortfolioModel.standard.value,
                scope: this.editPortfolioModel.scope,
                description: this.editPortfolioModel.description,
            };
            PortfolioService.savePortfolio(model).then(() => {
                PortfolioService.getPortfolioList().then((response) => {
                    this.setPortfolioList(response.data.result);
                });
            });
            this.modals.showEditPortfolioModal = false;
            this.editPortfolioModel = {};
        },
        deletePortfolio() {
            PortfolioService.deletePortfolio(this.deleteIndex).then(() => {
                PortfolioService.getPortfolioList().then((response) => {
                    this.setPortfolioList(response.data.result);
                });
                return 1;
            });
            this.modals.showDeletePortfolioModal = false;
            this.deleteIndex = null;
        },
        setPortfolioList(list) {
            this.portfolioList = list.sort(
                (a, b) => new Date(b.startDate) - new Date(a.startDate)
            );
        },
        getDate(val) {
            var date = new Date(val);
            return this.months[date.getMonth()] + ", " + date.getFullYear();
        },
    },
    mounted() {
        PortfolioService.getPortfolioList().then((response) => {
            this.portfolioList = response.data.result;
        });
    },
};
</script>

<style></style>
