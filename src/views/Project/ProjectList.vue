<template>
    <section>
        <filtered-list
            title="Projects"
            @add="create()">
            <simple-list-item
                v-for="item of projects"
                :key="item.uuid"
                :text="item.name"
                :value="item"
                :contexts="['Edit', 'Delete']"
                @select="open($event)"
                @edit="edit($event)"
                @delete="remove($event)">
            </simple-list-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import Contextmenu from '@/components/contextmenu/Contextmenu.vue'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import SimpleListItem from '@/components/list/simple/SimpleListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'

    @Component({
        components: {
            Contextmenu,
            FilteredList,
            SimpleListItem
        }
    })
    export default class ProjectList extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() store!: any

        public projects: any[] = []
        public projectProperty: Channel<any> = new ProxyChannel()

        private watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'project@load'
            })

            this.projectProperty.connectFn((items: any[]) => {
                this.projects = items
            })

            this.watcher.withRepository(this.store.projects)
                .withBinding(this.projectProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public open (project: any): void {
            this.$router.push({
                name: 'user.list',
                params: {
                    connectionId: this.$route.params.connectionId,
                    projectUuid: project.uuid
                }
            })
        }

        public remove (project: any): void {
            this.channel.dispatch({
                event: 'project@delete',
                data: {
                    body: project
                }
            })
        }

        public create (): void {
            this.$router.push({
                name: 'project.create',
                params: this.$route.params
            })
        }

        public edit (project: any): void {
            this.$router.push({
                name: 'project.edit',
                params: this.$route.params,
                query: {
                    uuid: project.uuid
                }
            })
        }
    }
</script>

<style lang="scss"></style>
