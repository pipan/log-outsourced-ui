<template>
    <div class="field" :class="{'field--error': hasError()}">
        <label :for="id" class="field__label">
            <div>{{ label }}</div>
            <div class="field__error top-s" v-if="hasError()">{{ error }}</div>
        </label>
        <select :id="id" class="field__input" :value="value" @change="change($event)">
            <option v-for="(option, index) of options" :key="index"  :value="option">{{ option.label || option }}</option>
        </select>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class SelectInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: [] }) readonly options!: Array<any>;

        public change (event: any): void {
            this.$emit('input', event.target.value)
            this.$emit('change', event.target.value)
        }

        public hasError (): boolean {
            return this.error !== ''
        }
    }
</script>

<style lang="scss"></style>
