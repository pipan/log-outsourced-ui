<template>
    <button class="btn-checkbox" :class="{'btn-checkbox--checked': this.checkedState}" @click="toggle()" type="button" role="checkbox" :aria-checked="this.checkedState">{{ getText() }}</button>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

    @Component
    export default class CheckboxInput extends Vue {
        @Prop({ default: '' }) readonly id!: string;
        @Prop({ default: false }) readonly checked!: boolean;
        @Prop({ default: '' }) readonly text!: string;
        @Prop({ default: true }) readonly trueValue!: any;
        @Prop({ default: false }) readonly falseValue!: any;

        public checkedState = this.checked

        public toggle (): void {
            this.onChange(!this.checkedState)
        }

        public onChange (checked: boolean): void {
            this.checkedState = checked
            let value = this.falseValue
            if (this.checkedState) {
                value = this.trueValue
            }
            this.$emit('change', value)
        }

        public getText (): string {
            if (this.text !== '') {
                return this.text
            }
            if (this.checkedState) {
                if (this.trueValue !== true) {
                    return this.trueValue
                }
                return 'On'
            } else {
                if (this.falseValue !== false) {
                    return this.falseValue
                }
                return 'Off'
            }
        }

        @Watch('checked')
        onCheckedChange (value: boolean, oldValue: boolean): void {
            this.checkedState = value
        }
    }
</script>

<style lang="scss"></style>
