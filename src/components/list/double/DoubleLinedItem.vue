<template>
    <div class="list__item" :class="{'list__item--active': active}" @click="select()">
        <div class="list__item__top">
            {{ this.text }}
        </div>
        <contextmenu ref="contextmenu" v-if="this.contexts.length > 0">
            <button class="context__menu__item bottom-s" v-for="context of this.contexts" :key="context" @click="emit(context, $event)">{{ context }}</button>
        </contextmenu>
        <div class="list__item__bottom flexbox-row center">
            <div class="flex text--auxilery text-ellipsis flexfix">
                {{ this.subtext }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { ListenerEntity, HandlerEntity } from '@/lib/log-outsourced-api'
    import Contextmenu from '../../contextmenu/Contextmenu.vue'

    @Component({
        components: {
            Contextmenu
        }
    })
    export default class DoubleLinedItem extends Vue {
        @Prop() readonly text!: string
        @Prop() readonly subtext!: string
        @Prop() readonly value!: any
        @Prop() readonly contexts!: Array<string>
        @Prop({ default: false }) readonly active!: boolean

        select (): void {
            this.$emit('select', this.value)
        }

        emit (name: string, event: any): void {
            event.stopPropagation()
            this.$emit(name, this.value)
        }
    }
</script>

<style lang="scss"></style>
