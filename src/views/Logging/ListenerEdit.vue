<template>
    <section class="material__container">
        <listener-create-card
            v-if="listener"
            :title="'Edit Rule'"
            :model="listener"
            :handlers="handlers"
            @cancel="cancel()"
            @save="save($event)"></listener-create-card>
        <error-status
            v-if="!listener"
            status="404"
            message="Rule not found"></error-status>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import SelectCheckboxField from '@/components/form/SelectCheckboxField.vue'
    import ListenerCreateCard from '@/components/domain/listener/ListenerCreateCard.vue'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import { Closable, Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            StringField,
            SelectField,
            FormBuilder,
            SelectCheckboxField,
            ListenerCreateCard,
            ErrorStatus
        }
    })
    export default class ListenerEdit extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any
        @Prop() readonly listener!: any

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
                params: this.$route.params
            })
        }

        public save (data: any): void {
            data.uuid = this.$route.query.uuid
            this.channel.dispatch({
                event: 'listener@update',
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
