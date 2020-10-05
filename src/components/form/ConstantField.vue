<template>
    <field :id="_uid" :label="label">
        <div>{{ this.value }}</div>
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
    }
</script>

<style lang="scss"></style>
