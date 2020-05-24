<template>
    <section class="material__container">
        <listener-create-card
            v-if="model"
            :title="'Create Rule'"
            :model="model"
            :fields="fields"
            :handler-options="handlerOptions"
            @handlerChange="onHandlerChange($event)"
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
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableProperty, PropertyChange, Closable, ObservableList, ListChange, ObservableMap } from '@wildebeest/observe-changes'
    import { HandlerEntity, ProjectEntity } from '../lib/log-outsourced-api'
    import { ViewRepository } from './ViewRepository'

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
        @Prop() readonly channel!: Channel
        @Prop() readonly shared!: any

        public model: any | null = null
        public handlerOptions: Array<any> = []
        public fields: Array<any> = []

        private repo!: ViewRepository
        private closables: Array<Closable> = []

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
            this.repo.bindProperty('model', this.shared.listenerCreate)
            this.repo.bindList('handlerOptions', this.shared.handlerFormOptions)

            if (this.model.handler.slug) {
                this.onHandlerChange(this.model.handler.slug)
            }
        }

        public cancel (): void {
            this.channel.dispatch({ event: 'listener.create@close' })
        }

        public save (data: any): void {
            data.projectUuid = this.shared.projectActive.get().getUuid()

            this.channel.dispatch({
                event: 'listener@create',
                data: data
            })
        }

        public onNameChange (name: string): void {
            this.model.name.set(name)
        }

        public onRulesChange (rules: string): void {
            this.model.rules.set(rules)
        }

        public onHandlerChange (slug: string): void {
            this.fields = this.shared.handlerFormSchema.get(slug)
        }
    }
</script>

<style lang="scss"></style>
