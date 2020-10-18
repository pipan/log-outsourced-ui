<template>
    <div class="flex flexbox-row">
        <section class="material__container" :class="{'hide-m': listener}">
            <div class="flexbox-row center bottom-m">
                <h2 class="text-h2 flex">Rules</h2>
                <button class="btn btn--forward left-m" @click="create()">
                    <i class="material-icons md-18">add</i>
                </button>
            </div>
            <listener-list
                :items="listeners"
                @open="openListener($event)"
                @test="testListener($event)"
                @delete="deleteListener($event)"
                :active="listener"
                :handlers="handlers"></listener-list>
        </section>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
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

        public listeners: Array<any> = []
        public listener: any | null = null
        public handlers: Map<string, any> = new Map()

        private closables: Array<Closable> = []

        public create (): void {
            this.$router.push({
                path: '/project/rule/create',
                query: this.$route.query
            })
        }

        public openListener (listener: any): void {
            this.$router.push({
                path: '/project/rule',
                query: {
                    pid: this.$route.query.pid,
                    rid: listener.identify()
                }
            })
        }

        public deleteListener (listener: any): void {
            this.channel.dispatch({
                event: 'listener@delete',
                data: listener
            })
        }

        public testListener (listener: any): void {
            this.channel.dispatch({
                event: 'listener@test',
                data: {
                    project: this.$route.query.pid,
                    rules: listener.getRules()
                }
            })
        }
    }
</script>

<style lang="scss"></style>
