<template>
    <div class="list__item">
        <div class="list__item__top">
            <div>{{ item.getName() }}</div>
        </div>
        <contextmenu>
            <button class="context__menu__item top-s" @click="$emit('delete', item)">Delete</button>
        </contextmenu>
        <div class="list__item__bottom flexbox-row end center">
            <button class="btn btn--primary" @click="open()">EDIT</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ListenerEntity } from '@/lib/log-outsourced-api'
    import Contextmenu from '../../contextmenu/Contextmenu.vue'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class ListenerListItem extends Vue {
        @Prop() readonly item!: ListenerEntity;

        open (): void {
            this.$emit('open', this.item)
        }
    }
</script>

<style lang="scss"></style>
