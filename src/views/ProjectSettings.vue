<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="cancel()">
                <header class="card__header">Settings</header>
                <div class="card__body">
                    <button-field
                        label="Regenerate URL"
                        text="Generate"
                        @action="generateUrl()"></button-field>
                    <button-field
                        label="Delete project"
                        text="Delete"
                        level="danger"
                        @action="remove()"></button-field>
                </div>
                <footer class="card__footer">
                    <button type="button" class="btn btn--secondary" @click="cancel()">CANCEL</button>
                </footer>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ButtonField from '@/components/form/ButtonField.vue'
    import { FormField } from '../lib/form'
    import { ViewRepository } from './ViewRepository'
    import { Channel } from '@wildebeest/observable'
    import { ProjectEntity } from '../lib/log-outsourced-api'

    @Component({
        components: {
            ButtonField
        }
    })
    export default class ProjectSettings extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly queries!: any

        public project: ProjectEntity | null = null

        private repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindProperty('project', this.queries.projectActive)
        }

        public cancel (): void {
            this.$router.push({
                path: '/project',
                query: this.$route.query
            })
        }

        public generateUrl (): void {
            this.channel.dispatch({
                event: 'project@generate',
                data: {
                    body: this.project,
                    success: (project: ProjectEntity) => {
                        this.$router.push({
                            path: '/project/settings',
                            query: {
                                pid: project.identify()
                            }
                        })
                    }
                }
            })
        }

        public remove (): void {
            this.channel.dispatch({
                event: 'project@delete',
                data: {
                    body: this.project,
                    success: () => {
                        this.$router.push({
                            path: '/'
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
