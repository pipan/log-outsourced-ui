<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Project</header>
                <div class="card__body">
                    <string-field
                        v-if="model.name"
                        id="name"
                        label="Name"
                        :value="model.name.value"
                        :error="model.name.error"
                        @change="onNameChange($event)"></string-field>
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
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableProperty, PropertyChange, Closable } from '@wildebeest/observe-changes'
    import { FormField } from '../lib/form'
    import { ViewRepository } from './ViewRepository'

    @Component({
        components: {
            StringField
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly shared!: any

        public model: { [key: string]: FormField } = {}
        public repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindProperty('model', this.shared.projectCreate)
        }

        public cancel (): void {
            this.channel.dispatch({ event: 'project.create@close' })
        }

        private onModelPropertyChange (change: PropertyChange<any>): void {
            this.model = change.next()
        }

        public save (): void {
            this.channel.dispatch({
                event: 'project@create',
                data: {
                    name: this.model.name.get()
                }
            })
        }

        public onNameChange (name: string): void {
            this.model.name.set(name)
        }
    }
</script>

<style lang="scss"></style>
