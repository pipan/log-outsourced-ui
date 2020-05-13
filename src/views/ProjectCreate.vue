<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Project</header>
                <div class="card__body">
                    <string-input
                        id="name"
                        label="Name"
                        :value="name"
                        :error="nameError"
                        @change="onNameChange($event)"></string-input>
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
    import { Broadcast } from '../lib/broadcast'
    import StringInput from '@/components/form/StringInput.vue'

    @Component({
        components: {
            StringInput
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly broadcast!: Broadcast
        public name = ''
        public nameError = ''

        public cancel (): void {
            this.broadcast.channel('project.create.cancel')
                .dispatch()
        }

        public save (): void {
            if (this.name === '') {
                this.nameError = 'required'
                return
            }
            this.broadcast.channel('project.save')
                .dispatch()
        }

        public onNameChange (name: string): void {
            this.name = name
            this.nameError = ''
        }
    }
</script>

<style lang="scss"></style>
