<template>
    <error-status
        status="404"
        message="Page not found.">
    </error-status>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import ErrorStatus from '@/components/error/ErrorStatus.vue'

    @Component({
        components: {
            ErrorStatus
        }
    })
    export default class NotFound extends Vue {}
</script>

<style lang="scss"></style>
