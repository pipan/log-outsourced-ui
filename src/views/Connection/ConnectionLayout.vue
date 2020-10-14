<template>
    <div>
        <header class="material__header">
            <div class="flexbox-row space-between center flex flexfix">
                <button class="btn btn--secondary btn--circle material__header__back" @click="back()"><i class="material-icons md-18">arrow_back</i></button>
                <div class="material__header__title text-h2 text-ellipsis" v-if="connection">{{ connection.name }}</div>
            </div>
        </header>
        <connection-navigation></connection-navigation>
        <div class="material__body">
            <div class="material__container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Channel } from '@wildebeest/observable'
    import ConnectionNavigation from '@/components/domain/connection/ConnectionNavigation.vue'

    @Component({
        components: {
            ConnectionNavigation
        }
    })
    export default class ConnectionLayout extends Vue {
        @Prop() channel!: Channel<any>
        @Prop() connection!: any

        public back (): void {
            this.$router.push('/')
        }
    }
</script>

<style lang="scss"></style>
