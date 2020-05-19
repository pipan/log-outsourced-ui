<template>
    <select :id="id" class="field__input" :selected="value" @change="onChange($event.target.value)">
        <option v-if="value === ''"></option>
        <option v-for="(option, index) of options" :key="index"  :value="option.id" :selected="option.value == value">{{ option.label }}</option>
    </select>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class SelectInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: () => [] }) readonly options!: Array<any>;

        public onChange (id: string): void {
            let value: any = null
            for (const option of this.options) {
                if (option.id !== id) {
                    continue
                }
                value = option.value
            }

            this.$emit('change', value)
        }
    }
</script>

<style lang="scss"></style>
