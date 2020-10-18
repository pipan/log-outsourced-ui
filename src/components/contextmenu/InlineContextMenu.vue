<template>
    <div class="context context--right" :class="{'context--relative': relative}">
        <button class="btn btn--secondary btn--circle btn--small btn--borderable" type="button" @click="open($event)" :class="{'btn--attantion': attantion}">
            <i class="material-icons">{{ icon }}</i>
        </button>
        <div class="context__menu context__menu--inline" v-if="visible">
            <slot></slot>
            <div class="context__menu__close">
                <button class="btn btn--secondary btn--circle btn--small btn--borderable" type="button" @click="clickClose($event)">
                    <i class="material-icons">{{ icon }}</i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class InlineContextMenu extends Vue {
        @Prop({ default: false }) public relative!: boolean
        @Prop({ default: false }) public attantion!: boolean
        @Prop({ default: 'more_vert' }) public icon!: string

        public visible = false

        public open (event: any): void {
            this.visible = true
            event.stopPropagation()
        }

        public close (): void {
            this.visible = false
        }

        public clickClose (event: any): void {
            this.close()
            event.stopPropagation()
        }
    }
</script>

<style lang="scss"></style>
