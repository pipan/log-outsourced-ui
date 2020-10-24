<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <listener-create-card
                :title="'Create Rule'"
                :model="model"
                :handlers="handlers"
                :form="form"
                @cancel="cancel()"
                @save="save($event)"></listener-create-card>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import SelectField from '@/components/form/SelectField.vue'
    import SelectCheckboxField from '@/components/form/SelectCheckboxField.vue'
    import ListenerCreateCard from '@/components/domain/listener/ListenerCreateCard.vue'
    import FormBuilder from '@/components/form/FormBuilder.vue'
    import { Closable, Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import { Uid } from '../Uid'

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

        public uid = Uid.next()

        public model: any = {}

        public form: any = {}
        public formWatcher = new SingleResourceWatcher()

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

            this.formWatcher.withRepository(this.store.forms)
                .withBindingFn(this.onFormChange.bind(this))
                .withId(this.uid)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
            this.formWatcher.stop()
        }

        public onFormChange (item: any): void {
            this.form = item
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
                    uid: this.uid,
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
