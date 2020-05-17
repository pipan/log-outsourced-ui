<template>
    <field :id="id" :label="label" :error="error">
        <string-input :id="id" :placeholder="placeholder" :value="value" @change="$emit('change', $event)"></string-input>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringInput from './StringInput.vue'
    import Field from './Field.vue'

    @Component({
        components: {
            Field,
            StringInput
        }
    })
    export default class StringField extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly placeholder!: string;
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly value!: string;
    }
</script>

<style lang="scss"></style>
