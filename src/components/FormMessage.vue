<template>
<div>
    <div readonly class="mb-3 text-primary btn-block p-2" :class="'btn-outline-' + type" :style=" background " v-if="message != ''" @click="message = ''" style="font-size: 0.775rem;border-radius:5px;">
        <i class="fa fa-times float-right my-1 text-danger bg-white" style="height:17px;width:17px;border-radius:100%;padding:2px 0 0 4px;">
        </i>
        {{ message }}
    </div>
</div>
</template>

<script>
export default {
    name: "form-message",
    props: {
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "info",
        },
    },
    computed: {
        background() {
            switch (this.type) {
                case "info":
                    return "";
                case "success":
                    return "background: #c8ffc8 !important;";
                case "warning":
                    return "";
                case "danger":
                    return "background: #ffc8c8 !important;";
                case "primary":
                    return "";
                case "light":
                    return "";
                case "dark":
                    return "";
                case "default":
                default:
                    return "#fff";
            }
        },
        text_color() {
            switch (this.type) {
                case "info":
                    return "";
                case "success":
                    return "";
                case "warning":
                    return "";
                case "danger":
                    return "";
                case "primary":
                    return "";
                case "light":
                    return "";
                case "dark":
                    return "";
                case "default":
                default:
                    return "#fff";
            }
        }
    }
}
</script>
