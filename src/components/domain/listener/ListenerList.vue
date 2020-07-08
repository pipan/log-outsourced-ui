<template>
    <div class="list">
        <listener-list-item
            v-for="item of items" :key="item.getUuid()"
            :item="item"
            @open="$emit('open', $event)"
            @test="$emit('test', $event)"
            @delete="$emit('delete', $event)"
            :active="item === active"
            :handler="getHandler(item.getHandlerSlug())"></listener-list-item>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ListenerListItem from './ListenerListItem.vue'
    import { ListenerEntity, HandlerEntity } from '../../../lib/log-outsourced-api'

    @Component({
        components: {
            ListenerListItem
        }
    })
    export default class ListenerList extends Vue {
        @Prop() readonly items!: Array<ListenerEntity>
        @Prop() readonly active!: ListenerEntity
        @Prop() readonly handlers!: Map<string, HandlerEntity>

        public getHandler (slug: string): HandlerEntity | undefined {
            return this.handlers.get(slug)
        }
    }
</script>

<style lang="scss"></style>
