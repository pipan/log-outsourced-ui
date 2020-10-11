<template>
    <section>
        <div class="card">
            <form @submit.prevent="save()">
                <header class="card__header">Create Project</header>
                <div class="card__body">
                    <string-field
                        v-if="model"
                        id="name"
                        label="Name"
                        :value="model.name"
                        @change="model.name = $event"></string-field>
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
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            StringField
        }
    })
    export default class ProjectCreate extends Vue {
        @Prop() readonly channel!: Channel<any>

        public model: any = {}

        public cancel (): void {
            this.$router.push({
                name: 'project.list',
                params: this.$route.params
            })
        }

        public save (): void {
            this.channel.dispatch({
                event: 'project@create',
                data: {
                    body: {
                        name: this.model.name
                    },
                    success: (project: any) => {
                        console.log('todo: open project after create')
                        // this.$router.push({
                        //     path: '/project',
                        //     query: {
                        //         pid: project.identify()
                        //     }
                        // })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
