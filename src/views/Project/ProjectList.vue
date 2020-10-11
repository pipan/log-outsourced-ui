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
                @select="$emit('open', $event)"
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
        @Prop() repositories!: any

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

            this.watcher.withRepository(this.repositories.projects)
                .withBinding(this.projectProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public back (): void {
            this.$router.push('/')
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
    }
</script>

<style lang="scss"></style>
