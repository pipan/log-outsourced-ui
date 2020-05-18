<template>
    <div>
        <router-view></router-view>
        <alert-container :alerts="alerts" @close="closeAlert($event)"></alert-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ProjectsContainer from '@/components/ProjectsContainer.vue'
    import StringInput from '@/components/form/StringInput.vue'
    import AlertContainer from '@/components/alert/AlertContainer.vue'
    import { AlertContract } from '../components/alert'
    import { ObservableList, Closable } from '@wildebeest/observe-changes'
    import { Channel } from '../lib/broadcast/Channel'
    @Component({
        components: {
            ProjectsContainer,
            StringInput,
            AlertContainer
        }
    })
    export default class App extends Vue {
        @Prop() public alertsProperty!: ObservableList<AlertContract>
        @Prop() public channel!: Channel

        public alerts: Array<AlertContract> = []
        private closables: Array<Closable> = []

        public closeAlert (alert: AlertContract): void {
            this.channel.dispatch({
                event: 'alert@remove',
                data: alert
            })
        }

        public mounted (): void {
            this.closables.push(
                this.alertsProperty.addListenerAndCall(() => {
                    this.alerts = this.alertsProperty.all()
                })
            )
        }

        public beforeDestroy (): void {
            for (const closable of this.closables) {
                closable.close()
            }
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
