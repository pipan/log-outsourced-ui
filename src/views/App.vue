<template>
    <div>
        <router-view></router-view>
        <alert-container :alerts="this.alerts" @close="closeAlert($event)"></alert-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import AlertContainer from '@/components/alert/AlertContainer.vue'
    import { Channel, ProxyChannel } from '@wildebeest/observable'
    import { ListWatcher } from '@/lib/watcher'

    @Component({
        components: {
            AlertContainer
        }
    })
    export default class App extends Vue {
        @Prop() readonly store!: any
        @Prop() public channel!: Channel<any>

        public alerts: Array<any> = []
        public alertsChannel: Channel<any[]> = new ProxyChannel()

        private watcher: ListWatcher<any> = new ListWatcher()

        public created (): void {
            this.alertsChannel.connectFn((items: any[]) => {
                this.alerts = items
            })
            this.watcher.withRepository(this.store.alerts)
                .withBinding(this.alertsChannel)
        }

        public beforeDestroy (): void {
            this.watcher.stop()
        }

        public closeAlert (alert: any): void {
            this.channel.dispatch({
                event: 'alert@remove',
                data: alert
            })
        }
    }
</script>

<style lang="scss">
@import "../assets/scss/root.scss";
@import "../assets/scss/layout.scss";
@import "../assets/scss/navigation.scss";
@import "../assets/scss/card.scss";
@import "../assets/scss/list.scss";
@import "../assets/scss/button.scss";
@import "../assets/scss/form.scss";
@import "../assets/scss/composition.scss";
@import "../assets/scss/text.scss";
@import "../assets/scss/alert.scss";
@import "../assets/scss/contextmenu.scss";
@import "../assets/scss/error.scss";
</style>
