<template>
    <div class="material__body material__body--with-nav">
        <section class="material__container">
            <filtered-list
                title="Access Keys"
                :filterAvailable="keys.length > 6"
                @filter="filter($event)"
                @add="create()">
                <double-lined-item
                    v-for="item of keys"
                    :key="item.key"
                    :text="item.name"
                    :subtext="item.key"
                    :value="item"
                    :contexts="['Copy Key to Clipboard', 'Rename', 'Delete']"
                    @delete="remove($event)"
                    @rename="open($event)"
                    @copy_key_to_clipboard="copyKeyToClipboard($event)">
                </double-lined-item>
            </filtered-list>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import DoubleLinedItem from '@/components/list/double/DoubleLinedItem.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'
    import clipboardCopy from 'clipboard-copy'

    @Component({
        components: {
            FilteredList,
            DoubleLinedItem
        }
    })
    export default class ProjectKeyList extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly store!: any
        @Prop() readonly project!: any

        public keys: any[] = []
        protected keysProperty: Channel<any> = new ProxyChannel()
        public keysWatcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'projectKey@load',
                data: this.project.uuid
            })

            this.keysProperty.connectFn((items: any[]) => {
                this.keys = items
            })
            this.keysWatcher.withRepository(this.store.projectKeys)
                .withBinding(this.keysProperty)
        }

        public beforeDestroy (): void {
            this.keysWatcher.stop()
        }

        public cancel (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }

        public create (): void {
            this.$router.push({
                name: 'projectkey.create',
                params: this.$route.params
            })
        }

        public open (key: any): void {
            this.$router.push({
                name: 'projectkey.rename',
                params: this.$route.params,
                query: {
                    key: key.key
                }
            })
        }

        public remove (key: any): void {
            const consent = confirm('You are about to delete an access key: ' + key.name)
            if (!consent) {
                return
            }

            this.channel.dispatch({
                event: 'projectKey@delete',
                data: {
                    body: key
                }
            })
        }

        public copyKeyToClipboard (key: any): void {
            clipboardCopy(key.key)
            this.channel.dispatch({
                event: 'alert@create',
                data: {
                    type: 'info',
                    message: 'Acces key has been copied to clipboard'
                }
            })
        }
    }
</script>

<style lang="scss"></style>
