<template>
    <input
        :id="id"
        class="field__input"
        type="password"
        :value="value"
        @input="$emit('change', $event.target.value)"
        :placeholder="placeholder"
        v-autofocus="autofocus"
        autocomplete="off" />
</template>

<script lang="ts">
    import { Autofocus } from '@/directives/form/Autofocus'
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({
        directives: {
            autofocus: new Autofocus()
        }
    })
    export default class PasswordInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: false }) readonly autofocus!: boolean;
    }
</script>

<style lang="scss"></style>
