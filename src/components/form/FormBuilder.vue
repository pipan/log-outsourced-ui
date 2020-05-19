<template>
    <div>
        <template v-for="(field, index) of fields">
            <component :is="getComponentByType(field.type)" v-bind="field.props" :key="index" @change="field.props.value = $event"></component>
        </template>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from './StringField.vue'
    import SelectField from './SelectField.vue'
    import NumberField from './NumberField.vue'
    import CheckboxField from './CheckboxField.vue'
    import PasswordField from './PasswordField.vue'

    @Component
    export default class FormBuilder extends Vue {
        @Prop({ default: [] }) readonly fields!: Array<any>;

        private componentMap: { [key: string]: any } = {
            string: StringField,
            select: SelectField,
            number: NumberField,
            checkbox: CheckboxField,
            password: PasswordField
        }

        public getComponentByType (type: string): any {
            if (this.componentMap[type] === undefined) {
                throw Error('Field type not found: ' + type)
            }
            return this.componentMap[type]
        }
    }
</script>

<style lang="scss"></style>
