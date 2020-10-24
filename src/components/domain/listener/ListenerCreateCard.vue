<template>
    <div class="card">
        <form @submit.prevent="save()" autocomplete="off">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <div v-if="innerModel">
                    <string-field
                        label="Name"
                        :value="innerModel.name"
                        :error="form.error ? form.error.name : ''"
                        @change="innerModel.name = $event"></string-field>
                    <multi-select
                        class="top-m"
                        label="Log levels"
                        :value="innerModel.rules"
                        :error="form.error ? form.error.rules : ''"
                        :options="['debug','info','notice','warning','error','critical','alert','emergency']"
                        @change="innerModel.rules = $event"></multi-select>
                    <handler-select
                        :handlers="handlers"
                        :value="innerModel.handler_slug"
                        :error="form.error ? form.error.handler_slug : ''"
                        @change="onHandlerChange($event)"></handler-select>
                </div>
                <form-builder
                    v-if="fields.length > 0"
                    class="top-m"
                    :fields="fields"
                    :values="innerModel.handler_values"
                    @change="innerModel.handler_values = $event"></form-builder>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="$emit('cancel')">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import HandlerSelect from '@/components/domain/handler/HandlerSelect.vue'
    import MultiSelect from '@/components/form/MultiSelect.vue'

    @Component({
        components: {
            StringField,
            SelectField,
            FormBuilder,
            MultiSelect,
            HandlerSelect
        }
    })
    export default class ListenerCreateCard extends Vue {
        @Prop({ default: () => { return {} } }) readonly model: any
        @Prop({ default: () => { return {} } }) readonly form!: any
        @Prop({ default: '' }) readonly title!: string
        @Prop({ default: () => [] }) readonly handlers!: any[]

        public fields: Array<any> = []

        public innerModel: any = {}

        @Watch('handlers')
        public onHandlersChange (value: any[], oldvalue: any[]): void {
            this.onHandlerChange(this.innerModel.handler_slug)
        }

        @Watch('model', { immediate: true })
        public onModelChange (value: any, oldvalue: any): void {
            let rulesClone: string[] = []
            if (value.rules) {
                rulesClone = [...value.rules]
            }
            this.innerModel = {
                uuid: value.uuid,
                name: value.name,
                rules: rulesClone,
                handler_slug: value.handler_slug,
                handler_values: Object.assign({}, value.handler_values)
            }
            this.onHandlerChange(value.handler_slug)
        }

        private getHandlerBySlug (slug: string): any {
            for (const handler of this.handlers) {
                if (handler.slug !== slug) {
                    continue
                }
                return handler
            }
            return null
        }

        public onHandlerChange (handlerSlug: string): void {
            const handler = this.getHandlerBySlug(handlerSlug)
            if (!handler) {
                this.fields = []
                this.innerModel.handler_slug = ''
                return
            }
            const newFields = []
            for (const fieldSchemaKey in handler.meta.schema) {
                const fieldSchema: any = handler.meta.schema[fieldSchemaKey]
                newFields.push({
                    type: fieldSchema.type,
                    id: fieldSchemaKey,
                    default: fieldSchema.default || '',
                    props: {
                        label: fieldSchema.name,
                        error: '',
                        options: fieldSchema.options || []
                    }
                })
            }
            this.fields = newFields

            this.innerModel.handler_slug = handler.slug
        }

        public save (): void {
            const saveData: any = {
                name: this.innerModel.name,
                rules: this.innerModel.rules,
                handler_slug: this.innerModel.handler_slug,
                handler_values: {}
            }

            for (const field of this.fields) {
                if (!this.innerModel.handler_values) {
                    continue
                }
                saveData.handler_values[field.id] = this.innerModel.handler_values[field.id]
            }

            this.$emit('save', saveData)
        }
    }
</script>

<style lang="scss"></style>
