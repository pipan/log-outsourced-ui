<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()" autocomplete="off">
                <header class="card__header">Create Rule</header>
                <div class="card__body">
                    <div>
                        <string-field
                            v-if="model.name"
                            label="Name"
                            :value="model.name.get()"
                            :error="model.name.getError()"
                            @change="onNameChange($event)"></string-field>
                        <string-field
                            v-if="model.rules"
                            label="Log Levels"
                            :value="model.rules.get()"
                            :error="model.rules.getError()"
                            @change="onRulesChange($event)"></string-field>
                        <select-field
                            v-if="model.handler"
                            label="Handler"
                            :value="model.handler.get()"
                            :error="model.handler.getError()"
                            :options="handlerOptions"
                            @change="onHandlerChange($event)"></select-field>
                    </div>
                    <h3 class="top-l" v-if="fields.length > 0">{{ model.handler.get().getName() }} Settings</h3>
                    <form-builder class="top-m" :fields="fields"></form-builder>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                    <button type="submit" class="btn btn--primary">SAVE</button>
                </footer>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableProperty, PropertyChange, Closable, ObservableList, ListChange, ObservableMap } from '@wildebeest/observe-changes'
    import { HandlerEntity, ProjectEntity } from '../lib/log-outsourced-api'
    import { ViewRepository } from './ViewRepository'

    @Component({
        components: {
            StringField,
            SelectField,
            FormBuilder
        }
    })
    export default class ListenerCreate extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly modelProperty!: ObservableProperty<any>
        @Prop() readonly handlersProperty!: ObservableList<HandlerEntity>
        @Prop() readonly projectProperty!: ObservableProperty<ProjectEntity>
        @Prop() readonly handlerSchemaProperty!: ObservableMap<string, any>

        public model: any = {}
        public handlerOptions: Array<any> = []
        private closables: Array<Closable> = []
        public fields: Array<any> = []
        private repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
            for (const closable of this.closables) {
                closable.close()
            }
        }

        public mounted (): void {
            this.repo.bindProperty('model', this.modelProperty)

            this.closables.push(
                this.handlersProperty.addListenerAndCall(
                    this.onHandlersPropertyChange.bind(this)
                )
            )

            if (this.model.handler.get()) {
                this.fields = this.handlerSchemaProperty.get(
                    this.model.handler.get().getSlug()
                )
            }
        }

        public cancel (): void {
            this.channel.dispatch({ event: 'listener.create@close' })
        }

        private onHandlersPropertyChange (): void {
            const options: Array<any> = []
            for (const handler of this.handlersProperty.all()) {
                options.push({
                    id: handler.getSlug(),
                    label: handler.getName(),
                    value: handler
                })
            }
            this.handlerOptions = options
        }

        public save (): void {
            const handlerValues: any = {}
            for (const field of this.fields) {
                handlerValues[field.id] = field.props.value
            }

            this.channel.dispatch({
                event: 'listener@create',
                data: {
                    name: this.model.name.get(),
                    projectUuid: this.projectProperty.get().getUuid(),
                    rules: this.model.rules.get().split(','),
                    handler: {
                        slug: this.model.handler.get()?.getSlug(),
                        values: handlerValues
                    }
                }
            })
        }

        public onNameChange (name: string): void {
            this.model.name.set(name)
        }

        public onRulesChange (rules: string): void {
            this.model.rules.set(rules)
        }

        public onHandlerChange (value: HandlerEntity): void {
            this.model.handler.set(value)
            this.fields = this.handlerSchemaProperty.get(value.getSlug())
        }
    }
</script>

<style lang="scss"></style>
