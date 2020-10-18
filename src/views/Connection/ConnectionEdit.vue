<template>
    <section class="material__container">
        <connection-card
            title="Edit Connection"
            :model="model"
            @cancel="cancel()"
            @submit="save($event)">
        </connection-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import ConnectionCard from '@/components/domain/connection/ConnectionCard.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'

    @Component({
        components: {
            ConnectionCard
        }
    })
    export default class ConnectionEdit extends Vue {
        @Prop() readonly repositories!: any
        @Prop() readonly channel!: Channel<any>

        public model: any = {}

        @Watch('$route.query.id')
        public onIdChange (value: string, oldValue: string): void {
            this.loadConnection(value)
        }

        public created (): void {
            const id = this.$route.query.id.toString()
            if (!id) {
                return
            }
            this.loadConnection(id)
        }

        private loadConnection (id: string): void {
            const query = this.repositories.connections.query()
                .property(id)

            const connection = query.get()
            this.model = {
                name: connection.name,
                host: connection.host,
                username: connection.username
            }
            query.close()
        }

        public cancel (): void {
            this.$router.push('/')
        }

        public save (data: any): void {
            this.channel.dispatch({
                event: 'connection@update',
                data: {
                    id: this.$route.query.id.toString(),
                    body: data,
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
