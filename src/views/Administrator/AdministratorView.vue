<template>
    <section>
        <filtered-list
            title="Administrators"
            @add="create()">
            <icon-list-item
                v-for="item of admins"
                :key="item.uuid"
                :text="item.username"
                :value="item"
                :icon="item.invite_token !== '' ? 'query_builder' : 'check'"
                :contexts="item.invite_token !== '' ? ['Copy invite URL', 'Delete'] : ['Delete']"
                @select="$emit('open', $event)"
                @delete="remove($event)"
                @copy_invite_url="copyInviteUrl($event)">
            </icon-list-item>
        </filtered-list>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import FilteredList from '@/components/list/filtered/FilteredList.vue'
    import IconListItem from '@/components/list/simple/IconListItem.vue'
    import { ListWatcher, SingleResourceWatcher } from '@/lib/watcher'
    import clipboardCopy from 'clipboard-copy'

    @Component({
        components: {
            FilteredList,
            IconListItem
        }
    })
    export default class AdministratorView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() connection!: any
        @Prop() store!: any

        public admins: any[] = []

        public adminProperty: Channel<any> = new ProxyChannel()

        private watcher = new ListWatcher()

        public created (): void {
            this.channel.dispatch({
                event: 'administrator@load'
            })

            this.adminProperty.connectFn((items: any[]) => {
                this.admins = items
            })

            this.watcher.withRepository(this.store.administrators)
                .withBinding(this.adminProperty)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public back (): void {
            this.$router.push('/')
        }

        public create (): void {
            this.$router.push({
                name: 'administrator.invite',
                params: this.$route.params
            })
        }

        public remove (admin: any): void {
            const consent = confirm('You are about to delete an administrator: ' + admin.username)
            if (!consent) {
                return
            }

            this.channel.dispatch({
                event: 'administrator@delete',
                data: {
                    body: admin
                }
            })
        }

        public copyInviteUrl (admin: any): void {
            clipboardCopy(location.origin + '/connection/invite/' + admin.invite_token + '?host=' + this.connection.host)
            this.channel.dispatch({
                event: 'alert@create',
                data: {
                    type: 'info',
                    message: 'Invite URL has been copied to clipboard'
                }
            })
        }
    }
</script>

<style lang="scss"></style>
