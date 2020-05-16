<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Rule</header>
                <div class="card__body">
                    <string-input
                        id="name"
                        label="Name"
                        :value="model.name"
                        :error="nameError"
                        @change="onNameChange($event)"></string-input>
                    <select-input
                        id="handler"
                        label="Handler"
                        :value="'one'"
                        :error="''"
                        :options="['one', {label: 'two'}]"
                        @change="onHandlerChange($event)"></select-input>
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
    import StringInput from '@/components/form/StringInput.vue'
    import SelectInput from '@/components/form/SelectInput.vue'
    import { Channel } from '@/lib/broadcast/Channel'
    import { ObservableProperty, PropertyChange, Closable } from '@wildebeest/observe-changes'

    @Component({
        components: {
            StringInput,
            SelectInput
        }
    })
    export default class ListenerCreate extends Vue {
        @Prop() readonly channel!: Channel
        @Prop() readonly modelProperty!: ObservableProperty<any>

        public nameError = ''
        public model: any = {}
        private closables: Array<Closable> = []

        public mounted (): void {
            this.closables.push(
                this.modelProperty.addListenerAndCall(
                    this.onModelPropertyChange.bind(this)
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

        public save (): void {
            if (this.model?.name === '') {
                this.nameError = 'required'
                return
            }
            this.channel.dispatch({
                event: 'listener@create',
                data: {
                    name: this.model.name
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
