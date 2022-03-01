<template>
<div class="p-1">
    <div class="card shadow" :class="fileExists ? 'bg-gradient-dark' : 'bg-gradient-success'">
        <img class="card-img " :src="preview || '/img/brand/white.png'" style="object-fit: cover;" :style="'aspect-ratio:'+ratio + '; opacity: ' + (fileExists ? '1' : '.5')">
        <div class="card-img text-center">
            <strong class="card-text text-white heading-small">
                {{ text }}
            </strong>
            <div class="card-footer mt-1 text-center">
                <div class="row">
                    <div class="col-4 px-0 text-left">
                        <base-button type="danger" class="btn-sm text-white" :disabled="uploading" v-if="fileExists" @click="removeFile">
                            <i class="fa fa-times"></i>
                        </base-button>
                    </div>
                    <div class="col-4 px-0 text-center">
                        <base-button type="info" class="btn-sm text-white" :disabled="uploading" @click="showImageModal = true">
                            <i class="fa fa-plus"></i>
                        </base-button>
                    </div>
                    <div class="col-4 px-0 text-right">
                        <base-button type="success" class="btn-sm text-white" :loading="uploading" v-if="selectedImage != null" @click="uploadFile">
                            <i class="fa fa-upload"></i>
                        </base-button>
                    </div>
                </div>
                <form-message class="row mt-3 mb--3" :message="formMessage.message" :type="formMessage.type"></form-message>
            </div>
        </div>

        <modal v-model:show="showImageModal" body-classes="p-0" sm  modal-classes="modal-dialog-centered">
            <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                <template v-slot:header>
                    <div class="text-muted text-left mb--5">
                        <h3>Crop Image</h3>
                    </div>
                    <div class="float-right mb--4">
                        <base-button type="danger" class="btn-sm my--3" @click="(selectedImage) ? removeFile() : showImageModal = false">
                            <i class="fa fa-times"></i>
                        </base-button>
                    </div>
                </template>
                <form role="form" class="text-center" title="Click To Upload New Profile Picture">
                    <label v-show="selectedImage == null" class="img-overlay-wrapper" style="border-radius:5%;">
                        <img :src="preview || '/img/brand/green.png'" class="rounded-circle user-img" :style="'border-radius:5% !important;width:200px;height:200px;object-fit:cover;'" />
                        <div class="overlay">
                            <div class="text"><i class="fa fa-2x fa-camera"></i></div>
                        </div>
                        <input type="file" accept="image/*" @change="onFileSelect" class="d-none">
                    </label>
                    <div v-show="selectedImage != null">
                        <vue-cropper ref="cropper" :src="selectedImage" :aspect-ratio="ratio" alt="Source Image"></vue-cropper>
                    </div>
                </form>
                <template v-slot:footer>
                    <div class="">
                        <base-button type="danger" @click="selectedImage = null; showImageModal = false;" class="my-1 float-left">
                            Close
                        </base-button>
                        <base-button v-if="selectedImage != null" type="default" @click="placeImage(); showImageModal = false;" class="my-1 float-right">
                            Crop
                        </base-button>
                    </div>
                </template>
            </card>
        </modal>
    </div>
</div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import UtilService from '../api/services/util.service';
import FormMessage from '@/components/FormMessage.vue';

let avatarPlaceholder = "img/placeholder.jpg";
let imgPlaceholder = "img/image_placeholder.jpg";

export default {
    name: "image-upload",
    components: {
        VueCropper,
        FormMessage
    },
    props: {
        type: {
            type: String,
            default: "",
            description: 'Image upload type (""|avatar)'
        },
        btnClasses: {
            type: String,
            default: "",
            description: "Add image button classes"
        },
        src: {
            type: String,
            default: "/img/brand/green.png",
            description: "Initial image to display"
        },
        url: {
            type: String,
            default: "",
            description: "URL to upload to"
        },
        ratio: {
            type: Number,
            default: undefined,
            description: "The image aspect ratio."
        }
    },
    emits: ["update:src"],
    data() {
        return {
            placeholder: this.type === "avatar" ? avatarPlaceholder : imgPlaceholder,
            imagePreview: null,
            showImageModal: false,
            selectedImage: null,
            formData: new FormData(),
            uploading: false,
            formMessage: {},
        };
    },
    computed: {

        text() {
            return (this.fileExists ? "Change " : "Select ") + this.type;
        },

        fileExists() {
            return this.imagePreview != null || this.src != null
        },

        preview() {
            return this.imagePreview == null ? this.src : this.imagePreview;
        },

    },
    methods: {

        handlePreview(file) {
            this.imagePreview = URL.createObjectURL(file);
        },

        uploadFile() {
            this.uploading = true;
            
            UtilService.uploadPicture(this.url, this.formData).then((response) => {

                this.formMessage = {
                    message: response.data.message,
                    type: "success"
                }

                this.$emit("update:src", response.data.result);

                this.selectedImage = null;
                this.imagePreview = null;

            }).catch((error) => {

                this.formMessage = {
                    message: error.response == undefined ? "Unable to reach Application Server" : error.response.data.message,
                    type: "danger"
                }
            }).finally(() => {
                this.uploading = false;
            });
        },

        removeFile() {

            if (this.selectedImage != null) {
                this.imagePreview = null;
                this.selectedImage = null;
                return;
            }

            UtilService.removePicture(this.url).then((response) => {

                this.formMessage = {
                    message: response.data.message,
                    type: "success"
                }

                this.imagePreview = null;
                this.selectedImage = null;

                this.$emit("update:src", null);

            }).catch((error) => {

                this.formMessage = {
                    message: error.response == undefined ? "Unable to reach Application Server" : error.response.data.message,
                    type: "danger"
                }
            }).finally(() => {
                this.pictureLoading = false;
            });
        },

        placeImage() {

            this.pictureLoading = true;

            this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {

                this.handlePreview(blob);

                this.formData = new FormData();
                this.formData.append("file", blob, "image.jpg");

            })

        },

        onFileSelect(e) {
            const file = e.target.files[0];

            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.selectedImage = event.target.result;
                    this.$refs.cropper.replace(this.selectedImage)
                }
                reader.readAsDataURL(file);
            } else {
                this.errorMessage = "Sorry, FileReader API not supported";
            }
        },
    },
};
</script>

<style scoped>
.bg-gradient-dark {

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%) !important
}
</style>
