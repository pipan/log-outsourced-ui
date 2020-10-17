<template>
    <section class="material__container" v-if="editModel">
        <listener-create-card
        :title="listener.getName()"
        :model="editModel"
        :handlers="handlers"
        @cancel="close()"
        @save="update($event)"></listener-create-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { ListenerEntity, HandlerEntity } from '../lib/log-outsourced-api'
    import ListenerCreateCard from '../components/domain/listener/ListenerCreateCard.vue'
    import { Channel, Closable } from '@wildebeest/observable'

    @Component({
        components: {
            ListenerCreateCard
        }
    })
    export default class ProjectDetail extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly queries!: any

        public editModel: any | null = null
        public listener: ListenerEntity | null = null
        public handlers: Map<string, HandlerEntity> = new Map()

        @Watch('$route.query.rid', { immediate: true })
        public onUuidChange (value: string, oldValue: string): void {
            this.channel.dispatch({
                event: 'listener@open',
                data: value
            })
        }

        public close (): void {
            this.$router.push({
                path: '/project',
                query: {
                    pid: this.$route.query.pid
                }
            })
        }

        public update (data: any): void {
            data.uuid = this.listener!.getUuid()
            data.projectUuid = this.listener!.getProjecUuid()
            this.channel.dispatch({
                event: 'listener@update',
                data: {
                    body: data
                }
            })
        }
    }
</script>

<style lang="scss"></style>
