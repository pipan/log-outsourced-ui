<template>
    <div class="field" :class="{'field--error': hasError()}">
        <label :for="id" class="field__label">
            <div>{{ label }}</div>
            <div class="field__error top-s" v-if="hasError()">{{ error }}</div>
        </label>
        <div class="field__controll">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class Field extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;

        public hasError (): boolean {
            return this.error !== ''
        }
    }
</script>

<style lang="scss"></style>
