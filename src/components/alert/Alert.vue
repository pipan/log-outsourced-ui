<template>
    <div class="alert" :class="getClass()">
        <div class="alert__message">{{ alert.message }}</div>
        <button class="btn left-m" type="button" @click="close()">OK</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class Alert extends Vue {
        @Prop() readonly alert!: any

        public close (): void {
            this.$emit('close', this.alert)
        }

        public getClass (): string {
            return 'alert--' + this.alert.type
        }
    }
</script>

<style lang="scss"></style>
