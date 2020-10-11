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
    import { AlertHelper } from '@/module/alert'

    @Component({
        components: {
            FilteredList,
            IconListItem
        }
    })
    export default class AdministratorView extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() repositories!: any
        @Prop() properties!: any

        public connection: any
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

            this.watcher.withRepository(this.repositories.administrators)
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
            this.channel.dispatch({
                event: 'administrator@delete',
                data: {
                    body: admin
                }
            })
        }

        public copyInviteUrl (admin: any): void {
            const connection = this.properties.connection.get()
            clipboardCopy(location.origin + '/connection/invite/' + admin.invite_token + '?host=' + connection.host)
            this.channel.dispatch(
                AlertHelper.infoEvent('Invite URL was copied to clipboard')
            )
        }
    }
</script>

<style lang="scss"></style>