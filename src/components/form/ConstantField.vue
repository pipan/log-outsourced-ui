<template>
    <field :id="_uid" :label="label" :error="error">
        <div class="top-s">{{ this.value }}</div>
    </field>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Field from './Field.vue'

    @Component({
        components: {
            Field
        }
    })
    export default class StringField extends Vue {
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: '' }) readonly error!: string;
    }
</script>

<style lang="scss"></style>
