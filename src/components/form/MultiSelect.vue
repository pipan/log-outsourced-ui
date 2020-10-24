<template>
    <div>
        <div class="field field--filter" :class="{'field--error': error !== ''}">
            <label class="field__label field__label--full">
                <div>{{ label }}</div>
                <div class="field__error top-s" v-if="error">{{ error }}</div>
            </label>
            <filter-context-menu
                ref="filterContext"
                v-if="filterAvailableSince <= options.length"
                :value="filterValue"
                @filter="onFilter($event)">
            </filter-context-menu>
        </div>
        <select-checkbox-input
            :options="filteredOptions"
            :value="value"
            @change="$emit('change', $event)"></select-checkbox-input>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import SelectCheckboxInput from './SelectCheckboxInput.vue'
    import Field from './Field.vue'
    import StringInput from './StringInput.vue'
    import FilterContextMenu from '../contextmenu/FilterContextMenu.vue'
    import { Autofocus } from '@/directives/form/Autofocus.ts'
    import { Press } from '@/directives/form/Press.ts'

    @Component({
        components: {
            StringInput,
            FilterContextMenu,
            SelectCheckboxInput
        },
        directives: {
            autofocus: new Autofocus(),
            press: new Press()
        }
    })
    export default class MultiSelect extends Vue {
        @Prop({ default: '' }) readonly label!: string;
        @Prop({ default: () => [] }) readonly options!: any[];
        @Prop({ default: () => [] }) readonly value!: any[];
        @Prop({ default: '' }) readonly error!: string;
        @Prop({ default: '' }) readonly filterProp!: string;
        @Prop({ default: 10 }) readonly filterAvailableSince!: number;

        public filterValue = ''
        public filteredOptions: any[] = [];

        @Watch('filterProp')
        public onFilterPropChange (value: string, oldValue: string): void {
            this.onFilter(value)
        }

        @Watch('options', { immediate: true })
        public onOptionsChange (value: any[], oldValue: any[]): void {
            this.onFilter(this.filterValue)
        }

        public onFilter (value: string): void {
            this.filterValue = value
            if (value === '') {
                this.filteredOptions = this.options
                return
            }
            this.filteredOptions = []
            for (const item of this.options) {
                if (!item.toLowerCase().startsWith(value)) {
                    continue
                }
                this.filteredOptions.push(item)
            }
        }
    }
</script>

<style lang="scss"></style>
