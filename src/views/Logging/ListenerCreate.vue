<template>
    <section>
        <listener-create-card
            :title="'Create Rule'"
            :model="model"
            :handlers="handlers"
            @cancel="cancel()"
            @save="save($event)"></listener-create-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import SelectCheckboxField from '@/components/form/SelectCheckboxField.vue'
    import ListenerCreateCard from '@/components/domain/listener/ListenerCreateCard.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import { Closable, Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            StringField,
            SelectField,
            FormBuilder,
            SelectCheckboxField,
            ListenerCreateCard
        }
    })
    export default class ListenerCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public model: any = {}

        public handlers: any[] = []
        public handlersProperty: Channel<any[]> = new ProxyChannel()
        public watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'handler@load'
            })

            this.handlersProperty.connectFn((items: any[]) => {
                this.handlers = items
            })

            this.watcher.withRepository(this.store.handlers)
                .withBinding(this.handlersProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public cancel (): void {
            this.$router.push({
                name: 'logging.list',
                query: this.$route.query
            })
        }

        public save (data: any): void {
            data.project_uuid = this.project.uuid

            this.channel.dispatch({
                event: 'listener@create',
                data: {
                    body: data,
                    success: (listener: any) => {
                        this.$router.push({
                            name: 'logging.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
