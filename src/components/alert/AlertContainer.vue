<template>
    <div class="alert-container">
        <alert v-for="(alert, index) of alerts" :key="index" :alert="alert" @close="close($event)"></alert>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { AlertContract } from './contract/AlertContract'
    import Alert from './Alert.vue'

    @Component({
        components: {
            Alert
        }
    })
    export default class AlertContainer extends Vue {
        @Prop({ default: () => [] }) readonly alerts!: Array<AlertContract>

        public close (alert: any): void {
            this.$emit('close', alert)
        }
    }
</script>

<style lang="scss"></style>
