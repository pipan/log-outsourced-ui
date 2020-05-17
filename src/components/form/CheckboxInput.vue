<template>
    <label :for="id" class="checkbox">
        <input :id="id" class="field__input" type="checkbox" :checked="checked" @change="$emit('change', $event)" />
        <span class="checkbox__box"></span>
    </label>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class StringInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: false }) readonly checked!: boolean;
    }
</script>

<style lang="scss"></style>
