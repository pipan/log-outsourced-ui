<template>
    <select-field
        label="Handle by"
        :value="value"
        :error="error"
        :options="options"
        @change="$emit('change', $event)"></select-field>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import SelectField from '@/components/form/SelectField.vue'

    @Component({
        components: {
            SelectField
        }
    })
    export default class HandlerSelect extends Vue {
        @Prop({ default: () => [] }) readonly handlers!: any[];
        @Prop({ default: '' }) readonly value!: string;
        @Prop({ default: '' }) readonly error!: string;

        public options: Array<any> = []

        @Watch('handlers', { immediate: true })
        onHandlersChange (value: any[], oldValue: any[]): void {
            const newOptions: Array<any> = []
            for (const handler of value) {
                newOptions.push({
                    id: handler.slug,
                    label: handler.name,
                    value: handler.slug
                })
            }
            this.options = newOptions
        }
    }
</script>

<style lang="scss"></style>
