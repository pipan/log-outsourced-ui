<template>
    <field :id="id" :label="label" :error="error">
        <number-input :id="id" :value="value" @change="$emit('change', $event)"></number-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Field from './Field.vue'
    import NumberInput from './NumberInput.vue'

    @Component({
        components: {
            Field,
            NumberInput

        }
    })
    export default class NumberField extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly value!: string;
    }
</script>

<style lang="scss"></style>
