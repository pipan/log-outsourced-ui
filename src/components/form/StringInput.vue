<template>
    <div class="field">
        <label :for="id" class="field__label">{{ label }}</label>
        <input :id="id" class="field__input" type="text" :placeholder="placeholder" />
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
    }
</script>

<style lang="scss"></style>
