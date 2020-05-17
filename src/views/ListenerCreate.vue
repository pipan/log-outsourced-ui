<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Rule</header>
                <div class="card__body">
                    <div>
                        <string-field
                            id="name"
                            label="Name"
                            :value="model.name"
                            :error="nameError"
                            @change="onNameChange($event)"></string-field>
                        <select-field
                            id="handler"
                            label="Handler"
                            :value="model.handler"
                            :error="''"
                            :options="handlerOptions"
                            @change="onHandlerChange($event)"></select-field>
                    </div>
                    <h3 class="top-l">Database</h3>
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
    import { ObservableProperty, PropertyChange, Closable, ObservableList, ListChange } from '@wildebeest/observe-changes'
    import { HandlerEntity, ProjectEntity } from '../lib/log-outsourced-api'

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
        @Prop() readonly activeProjectProperty!: ObservableProperty<ProjectEntity>

        public nameError = ''
        public model: any = {}
        protected handlers: Array<HandlerEntity> = []
        public handlerOptions: Array<any> = []
        private closables: Array<Closable> = []
        public fields: Array<any> = [
            {
                type: 'string',
                props: {
                    id: 'host',
                    label: 'Host',
                    value: 'localhost'
                }
            },
            {
                type: 'number',
                props: {
                    id: 'port',
                    label: 'Port',
                    value: 3306
                }
            },
            {
                type: 'string',
                props: {
                    id: 'database',
                    label: 'Database',
                    value: 'ovaldo'
                }
            },
            {
                type: 'string',
                props: {
                    id: 'uesr',
                    label: 'User',
                    value: 'user'
                }
            },
            {
                type: 'password',
                props: {
                    id: 'password',
                    label: 'Password'
                }
            },
            {
                type: 'string',
                props: {
                    id: 'table',
                    label: 'Table',
                    value: 'logs'
                }
            }
        ]

        public mounted (): void {
            this.closables.push(
                this.modelProperty.addListenerAndCall(
                    this.onModelPropertyChange.bind(this)
                )
            )

            this.closables.push(
                this.handlersProperty.addListenerAndCall(
                    this.onHandlersPropertyChange.bind(this)
                )
            )
        }

        public beforeDestry (): void {
            for (const closable of this.closables) {
                closable.close()
            }
        }

        public cancel (): void {
            this.channel.dispatch({ event: 'listener.create@close' })
        }

        private onModelPropertyChange (change: PropertyChange<any>): void {
            this.model = change.next()
        }

        private onHandlersPropertyChange (): void {
            const options: Array<any> = []
            for (const handler of this.handlersProperty.all()) {
                options.push({
                    label: handler.getName(),
                    value: handler
                })
            }
            this.handlerOptions = options
        }

        public save (): void {
            if (this.model?.name === '') {
                this.nameError = 'required'
                return
            }
            this.channel.dispatch({
                event: 'listener@create',
                data: {
                    name: this.model.name,
                    projectUuid: this.activeProjectProperty.get().getUuid()
                }
            })
        }

        public onNameChange (name: string): void {
            this.model.name = name
            this.nameError = ''
        }

        public onHandlerChange (value: string): void {
            console.log('change', value)
        }
    }
</script>

<style lang="scss"></style>
