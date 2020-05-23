<template>
    <div class="card">
        <form @submit.prevent="save()" autocomplete="off">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <div v-if="model">
                    <string-field
                        label="Name"
                        :value="model.name"
                        @change="model.name = $event"></string-field>
                    <select-checkbox-field
                        label="Log levels"
                        :value="model.rules"
                        :options="['debug','info','notice','warning','error','critical','alert','emergency']"
                        @change="model.rules = $event"></select-checkbox-field>
                    <select-field
                        label="Handle by"
                        :value="model.handler.slug"
                        :options="handlerOptions"
                        @change="onHandlerChange($event)"></select-field>
                </div>
                <form-builder class="top-l" :fields="fields" :values="model.handler.values"></form-builder>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="$emit('cancel')">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import SelectCheckboxField from '@/components/form/SelectCheckboxField.vue'
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableProperty, PropertyChange, Closable, ObservableList, ListChange, ObservableMap } from '@wildebeest/observe-changes'
    import { HandlerEntity, ProjectEntity } from '../../../lib/log-outsourced-api'

    @Component({
        components: {
            StringField,
            SelectField,
            FormBuilder,
            SelectCheckboxField
        }
    })
    export default class ListenerCreateCard extends Vue {
        @Prop({ default: () => { return {} } }) readonly model: any
        @Prop({ default: '' }) readonly title!: string
        @Prop({ default: () => [] }) readonly fields!: Array<any>
        @Prop({ default: () => [] }) readonly handlerOptions!: Array<any>

        public onHandlerChange (slug: string): void {
            this.model.handler.slug = slug
            this.$emit('handlerChange', slug)
        }

        public save (): void {
            const saveData: any = {
                name: this.model.name,
                rules: this.model.rules,
                handler: {
                    slug: this.model.handler?.slug,
                    values: {}
                }
            }

            const handlerValues: any = {}
            for (const field of this.fields) {
                saveData.handler.values[field.id] = this.model.handler?.values[field.id]
            }

            this.$emit('save', saveData)
        }
    }
</script>

<style lang="scss"></style>
