<template>
    <div class="checkbox-select">
        <checkbox-input class="checkbox-select__item" v-for="(option, index) of options" :key="index" :true-value="option.value || option" :text="option.label || option" @change="onChange(option, $event)" :checked="value.indexOf(option.value || option) > -1"></checkbox-input>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import CheckboxInput from './CheckboxInput.vue'

    @Component({
        components: {
            CheckboxInput
        }
    })
    export default class SelectCheckboxInput extends Vue {
        @Prop({ default: () => [] }) options!: Array<any>
        @Prop({ default: () => [] }) value!: Array<any>

        public onChange (option: any, checked: any): void {
            const newValue: Array<any> = this.value
            if ((option.value || option) === checked) {
                newValue.push(option.value || option)
            } else {
                for (const item of this.value) {

                }

                const index: number = newValue.indexOf(option.value || option)
                if (index < 0) {
                    return
                }
                newValue.splice(index, 1)
            }
            this.$emit('change', newValue)
        }
    }
</script>

<style lang="scss"></style>
