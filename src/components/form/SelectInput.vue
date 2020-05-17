<template>
    <select :id="id" class="field__input" :selected="value" @change="$mit('change', $event)">
        <option v-for="(option, index) of options" :key="index"  :value="option.value || option">{{ option.label || option }}</option>
    </select>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class SelectInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: () => [] }) readonly options!: Array<any>;
    }
</script>

<style lang="scss"></style>
