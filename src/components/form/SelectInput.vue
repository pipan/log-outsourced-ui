<template>
    <select :id="id" class="field__input" @change="onChange($event.target.value)">
        <option v-if="value === ''">{{value}}</option>
        <option v-for="(option, index) of options" :key="index"  :value="option.id || option" :selected="(option.value || option) == value">{{ option.label || option }}</option>
    </select>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

    @Component
    export default class SelectInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: () => [] }) readonly options!: Array<any>;

        public onChange (id: string): void {
            let value: any = null
            for (const option of this.options) {
                if ((option.id || option) !== id) {
                    continue
                }
                value = (option.value || option)
            }

            this.$emit('change', value)
        }
    }
</script>

<style lang="scss"></style>
