<template>
    <div class="list">
        <listener-list-item v-for="item of items" :key="item.getUuid()" :listener="item" @open="open($event)"></listener-list-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ListenerEntity } from '@/lib/log-outsourced-api'
    import ListenerListItem from './ListenerListItem.vue'

    @Component({
        components: {
            ListenerListItem
        }
    })
    export default class ListenerList extends Vue {
        @Prop() readonly items!: Array<ListenerEntity>;

        public open (listener: ListenerEntity): void {
            this.$emit('open', listener)
        }
    }
</script>

<style lang="scss"></style>
