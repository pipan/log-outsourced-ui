<template>
    <section class="material__container">
        <div class="card">
            <header class="card__header">Create Project</header>
            <div class="card__body">
                <string-input id="name" label="Name"></string-input>
            </div>
            <footer class="card__footer">
                <button class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button class="btn btn--primary" @click="save()">SAVE</button>
            </footer>
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

        public cancel (): void {
            this.broadcast.channel('project.create.cancel')
                .dispatch()
        }

        public save (): void {
            this.broadcast.channel('project.save')
                .dispatch()
        }
    }
</script>

<style lang="scss"></style>
