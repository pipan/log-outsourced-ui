<template>
    <div class="error">
        <div class="error__status">
            {{ this.status }}
        </div>
        <div class="error__message">
            {{ this.message }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Contextmenu from '../../contextmenu/Contextmenu.vue'

    @Component({})
    export default class ErrorStatus extends Vue {
        @Prop() readonly status!: string
        @Prop() readonly message!: string
    }
</script>

<style lang="scss"></style>
