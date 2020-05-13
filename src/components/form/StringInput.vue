<template>
    <div class="field" :class="{'field--error': hasError()}">
        <label :for="id" class="field__label">
            <div>{{ label }}</div>
            <div class="field__error top-s" v-if="hasError()">{{ error }}</div>
        </label>
        <input :id="id" class="field__input" type="text" :value="value" @input="change($event)" :placeholder="placeholder" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ProjectEntity } from '@/lib/log-outsourced'

    @Component
    export default class StringInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly value!: string;

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
