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
                    <multi-select
                        class="top-m"
                        label="Log levels"
                        :value="model.rules"
                        :options="['debug','info','notice','warning','error','critical','alert','emergency']"
                        @change="model.rules = $event"></multi-select>
                    <handler-select
                        :handlers="handlers"
                        :value="model.handler_slug"
                        @change="onHandlerChange($event)"></handler-select>
                </div>
                <form-builder
                    v-if="fields.length > 0"
                    class="top-m"
                    :fields="fields"
                    :values="model.handler_values"
                    @change="model.handler_values = $event"></form-builder>
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
        @Prop({ default: '' }) readonly title!: string
        @Prop({ default: () => [] }) readonly handlers!: any[]

        public fields: Array<any> = []

        @Watch('handlers')
        public onHandlersChange (value: any[], oldvalue: any[]): void {
            this.onHandlerChange(this.model.handler_slug)
        }

        @Watch('model', { immediate: true })
        public onModelChange (value: any, oldvalue: any): void {
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
                this.model.handler_slug = ''
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

            this.model.handler_slug = handler.slug
        }

        public save (): void {
            const saveData: any = {
                name: this.model.name,
                rules: this.model.rules,
                handler_slug: this.model.handler_slug,
                handler_values: {}
            }

            for (const field of this.fields) {
                saveData.handler_values[field.id] = this.model.handler_values[field.id]
            }

            this.$emit('save', saveData)
        }
    }
</script>

<style lang="scss"></style>
