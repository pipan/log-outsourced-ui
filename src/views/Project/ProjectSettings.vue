<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <div class="card">
                <form @submit.prevent="cancel()">
                    <header class="card__header">Project Settings</header>
                    <div class="card__body">
                        <button-field
                            label="Regenerate URL"
                            text="Generate"
                            @action="generateUrl()"></button-field>
                    </div>
                    <footer class="card__footer">
                        <button type="button" class="btn btn--secondary" @click="cancel()">CANCEL</button>
                    </footer>
                </form>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ButtonField from '@/components/form/ButtonField.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            ButtonField
        }
    })
    export default class ProjectSettings extends Vue {
        @Prop() readonly channel!: Channel<any>

        public generateUrl (): void {
            console.log('project settings generate url')
            // this.channel.dispatch({
            //     event: 'project@generate',
            //     data: {
            //         body: this.project,
            //         success: (project: ProjectEntity) => {
            //             this.$router.push({
            //                 path: '/project/settings',
            //                 query: {
            //                     pid: project.identify()
            //                 }
            //             })
            //         }
            //     }
            // })
        }

        public cancel (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }
    }
</script>

<style lang="scss"></style>
