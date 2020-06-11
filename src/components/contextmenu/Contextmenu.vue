<template>
    <div class="context context--right" :class="{'context--relative': relative}">
        <button class="btn btn--secondary btn--circle" type="button" @click="open()">
            <i class="material-icons">more_vert</i>
        </button>
        <div class="context__menu" v-if="visible">
            <div class="context__menu__close">
                <button class="btn btn--secondary btn--circle" type="button" @click="close()">
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

        public open (): void {
            this.visible = true
        }

        public close (): void {
            this.visible = false
        }
    }
</script>

<style lang="scss"></style>
