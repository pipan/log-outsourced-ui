<template>
    <input :id="id" class="field__input" type="number" :value="value" @input="change($event)" :placeholder="placeholder" />
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class StringInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly value!: string;

        public change (event: any): void {
            this.$emit('input', event.target.value)
            this.$emit('change', event.target.value)
        }
    }
</script>

<style lang="scss"></style>
