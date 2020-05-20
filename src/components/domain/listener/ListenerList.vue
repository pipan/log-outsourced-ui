<template>
    <div class="list">
        <listener-list-item v-for="item of items" :key="item.getUuid()" :item="item" @open="$emit('open', $event)" @delete="$emit('delete', $event)"></listener-list-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ListenerListItem from './ListenerListItem.vue'
    import { ListenerEntity } from '../../../lib/log-outsourced-api'

    @Component({
        components: {
            ListenerListItem
        }
    })
    export default class ListenerList extends Vue {
        @Prop() readonly items!: Array<ListenerEntity>
    }
</script>

<style lang="scss"></style>
