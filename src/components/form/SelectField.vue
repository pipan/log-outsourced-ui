<template>
    <field :id="id" :label="label" :error="error">
        <select-input :id="id" :options="options" :value="value" @change="$emit('change', $event)"></select-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Field from './Field.vue'
    import SelectInput from './SelectInput.vue'

    @Component({
        components: {
            Field,
            SelectInput
        }
    })
    export default class SelectField extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: () => [] }) readonly options!: Array<any>;
    }
</script>

<style lang="scss"></style>
