<template>
    <select-field
        label="Handle by"
        :value="value"
        :options="options"
        @change="$emit('change', $event)"></select-field>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { HandlerEntity } from '../../../lib/log-outsourced-api'
    import SelectField from '@/components/form/SelectField.vue'

    @Component({
        components: {
            SelectField
        }
    })
    export default class HandlerSelect extends Vue {
        @Prop({ default: () => [] }) readonly handlers!: Map<string, HandlerEntity>;
        @Prop({ default: '' }) readonly value!: string;

        public options: Array<any> = []

        @Watch('handlers', { immediate: true })
        onHandlersChange (value: Map<string, HandlerEntity>, oldValue: Map<string, HandlerEntity>): void {
            const newOptions: Array<any> = []
            value.forEach((handler: HandlerEntity) => {
                newOptions.push({
                    id: handler.identify(),
                    label: handler.getName(),
                    value: handler.identify()
                })
            })
            this.options = newOptions
        }
    }
</script>

<style lang="scss"></style>
