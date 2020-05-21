<template>
    <div>
        <router-view></router-view>
        <alert-container :alerts="this.alerts" @close="closeAlert($event)"></alert-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringInput from '@/components/form/StringInput.vue'
    import AlertContainer from '@/components/alert/AlertContainer.vue'
    import { AlertContract } from '../components/alert'
    import { ObservableList } from '@wildebeest/observe-changes'
    import { Channel } from '../lib/broadcast/Channel'
    import { ViewRepository } from './ViewRepository'
    @Component({
        components: {
            StringInput,
            AlertContainer
        }
    })
    export default class App extends Vue {
        @Prop() public alertList!: ObservableList<AlertContract>
        @Prop() public channel!: Channel

        public alerts: Array<AlertContract> = []
        public repo!: ViewRepository

        public created (): void {
            this.repo = new ViewRepository(this)
        }

        public beforeDestroy (): void {
            this.repo.unbindAll()
        }

        public mounted (): void {
            this.repo.bindList('alerts', this.alertList)
        }

        public closeAlert (alert: AlertContract): void {
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
@import "../assets/scss/card.scss";
@import "../assets/scss/list.scss";
@import "../assets/scss/button.scss";
@import "../assets/scss/form.scss";
@import "../assets/scss/composition.scss";
@import "../assets/scss/text.scss";
@import "../assets/scss/alert.scss";
@import "../assets/scss/contextmenu.scss";
</style>
