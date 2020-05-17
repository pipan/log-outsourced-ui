<template>
    <div class="list__item">
        <div class="list__item__top">
            {{ listener.getName() }}
        </div>
        <div class="list__item__bottom flexbox-row end center">
            <button class="btn btn--primary" @click="open()">OPEN</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ListenerEntity } from '@/lib/log-outsourced-api'

    @Component
    export default class ListenerListItem extends Vue {
        @Prop() readonly listener!: ListenerEntity;

        open (): void {
            this.$emit('open', this.listener)
        }
    }
</script>

<style lang="scss"></style>
