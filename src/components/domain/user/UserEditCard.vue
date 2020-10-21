<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <multi-select
                    label="Roles"
                    :value="innerModel.roles"
                    :options="roles"
                    filterAvailableSince="6"
                    @change="innerModel.roles = $event"></multi-select>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import MultiSelect from '@/components/form/MultiSelect.vue'

    @Component({
        components: {
            MultiSelect
        }
    })
    export default class UserCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => [] }) roles!: any
        @Prop({ default: () => { return {} } }) model!: any
        @Prop({ default: () => { return {} } }) form!: any

        public innerModel: any = {}

        @Watch('model', { immediate: true })
        public onModelChange (value: any, oldValue: any): void {
            this.innerModel = {
                uuid: value.uuid,
                username: value.username,
                roles: [...value.roles]
            }
        }

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.innerModel)
        }
    }
</script>

<style lang="scss"></style>
