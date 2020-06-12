<template>
    <section class="material__container">
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Project</header>
                <div class="card__body">
                    <string-field
                        v-if="model"
                        id="name"
                        label="Name"
                        :value="model.field.name"
                        :error="model.error.name"
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
    import { FormField } from '../lib/form'
    import { ViewRepository } from './ViewRepository'
    import { Channel } from '@wildebeest/observable'
    import { ProjectEntity } from '../lib/log-outsourced-api'

    @Component({
        components: {
            StringField
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly queries!: any

        public model: any = null
        public repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindProperty('model', this.queries.projectCreate)
        }

        public cancel (): void {
            this.$router.push('/')
        }

        public save (): void {
            this.channel.dispatch({
                event: 'project@create',
                data: {
                    body: {
                        name: this.model.field.name
                    },
                    success: (project: ProjectEntity) => {
                        this.$router.push({
                            path: '/project',
                            query: {
                                pid: project.identify()
                            }
                        })
                    }
                }
            })
        }

        public onNameChange (name: string): void {
            this.model.field.name = name
            this.model.error.name = ''
        }
    }
</script>

<style lang="scss"></style>
