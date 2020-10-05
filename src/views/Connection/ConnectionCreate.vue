<template>
    <section class="material__container">
        <connection-card
            title="Add Connection"
            :model="model"
            @cancel="cancel()"
            @submit="save($event)">
        </connection-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ConnectionCard from '@/components/domain/connection/ConnectionCard.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            ConnectionCard
        }
    })
    export default class ConnectionCreate extends Vue {
        @Prop() readonly channel!: Channel<any>

        public model: any = {
            name: '',
            host: '',
            username: ''
        }

        public cancel (): void {
            this.$router.push('/')
        }

        public save (data: any): void {
            this.channel.dispatch({
                event: 'connection@create',
                data: {
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
