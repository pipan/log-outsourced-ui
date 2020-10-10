<template>
    <div class="context context--right" :class="{'context--relative': relative}">
        <button class="btn btn--secondary btn--circle btn--small" type="button" @click="open($event)">
            <i class="material-icons">more_vert</i>
        </button>
        <div class="context__menu" v-if="visible">
            <div class="context__menu__close">
                <button class="btn btn--secondary btn--circle btn--small" type="button" @click="clickClose($event)">
                    <i class="material-icons">more_vert</i>
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class Contextmenu extends Vue {
        @Prop({ default: false }) public relative!: boolean

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
