<script setup>
import {defineProps} from "vue";

const props = defineProps({
    typeView: {
        type: String,
        required: true,
        validator: (value) => {
            return value in ["lesson", "task"];
        },
    },
});
</script>

<template>
    <section class="view">
        {{ props.typeView }}
    </section>
</template>

<style lang="scss" scoped>

</style>