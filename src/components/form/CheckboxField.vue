<template>
    <field :id="id" :label="label" :error="error">
        <checkbox-input :id="id" :checked="checked" @change="$emit('change', $event)"></checkbox-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import CheckboxInput from './CheckboxInput.vue'
    import Field from './Field.vue'

    @Component({
        components: {
            Field,
            CheckboxInput
        }
    })
    export default class CheckboxField extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: false }) readonly checked!: boolean;
    }
</script>

<style lang="scss"></style>
