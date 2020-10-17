<template>
    <section class="material__container">
        <listener-create-card
            v-if="model"
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
    import { HandlerEntity, ListenerEntity } from '../lib/log-outsourced-api'
    import { ViewRepository } from './ViewRepository'
    import { Closable, Channel } from '@wildebeest/observable'

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
        @Prop() readonly queries!: any

        public model: any | null = null
        public handlers: Array<HandlerEntity> = []

        private closables: Array<Closable> = []

        public cancel (): void {
            this.$router.push({
                path: '/project',
                query: this.$route.query
            })
        }

        public save (data: any): void {
            const routeQuery = this.$route.query
            data.projectUuid = routeQuery.pid

            this.channel.dispatch({
                event: 'listener@create',
                data: {
                    body: data,
                    success: (listener: ListenerEntity) => {
                        this.$router.push({ path: '/project', query: { pid: routeQuery.pid, rid: listener.identify() } })
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
    }
</script>

<style lang="scss"></style>
