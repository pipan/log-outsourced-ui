<template>
    <div>
        <div class="field field--filter">
            <label class="field__label">
                <div>{{ label }}</div>
            </label>
            <inline-context-menu
                ref="filterContext"
                v-if="filterAvailableSince <= options.length"
                icon="filter_list"
                :attantion="filterValue !== ''">
                <input
                    type="text"
                    v-autofocus="true"
                    v-press:Escape="onEsc"
                    :value="filterValue"
                    class="field__input field__input--auto left-s"
                    @input="onFilter($event.target.value)" />
            </inline-context-menu>
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
    import InlineContextMenu from '../contextmenu/InlineContextMenu.vue'
    import { Autofocus } from '@/directives/form/Autofocus.ts'
    import { Press } from '@/directives/form/Press.ts'

    @Component({
        components: {
            StringInput,
            InlineContextMenu,
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

        public onEsc (): void {
            (this.$refs.filterContext as InlineContextMenu).close()
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
