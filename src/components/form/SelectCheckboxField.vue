<template>
    <field :id="_uid" :label="label" :error="error">
        <select-checkbox-input :options="options" :value="value" @change="$emit('change', $event)"></select-checkbox-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import SelectCheckboxInput from './SelectCheckboxInput.vue'
    import Field from './Field.vue'

    @Component({
        components: {
            Field,
            SelectCheckboxInput
        }
    })
    export default class SelectCheckboxField extends Vue {
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: () => [] }) readonly options!: Array<any>;
        @Prop({ default: () => [] }) readonly value!: Array<any>;
    }
</script>

<style lang="scss"></style>
