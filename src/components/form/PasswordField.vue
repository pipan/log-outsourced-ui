<template>
    <field :id="id" :label="label" :error="error">
        <password-input :id="id" :placeholder="placeholder" :value="value" @change="$emit('change', $event)"></password-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import PasswordInput from './PasswordInput.vue'
    import Field from './Field.vue'

    @Component({
        components: {
            Field,
            PasswordInput
        }
    })
    export default class PasswordField extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly value!: string;
    }
</script>

<style lang="scss"></style>
