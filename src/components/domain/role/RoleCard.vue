<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <string-field
                    v-if="model"
                    id="name"
                    label="Name"
                    :value="model.name"
                    @change="model.name = $event"></string-field>
                <multi-select
                    class="top-m"
                    label="Permissions"
                    :value="model.permissions"
                    :options="permissions"
                    filterAvailableSince="6"
                    @change="model.permissions = $event"></multi-select>
            </div>
            <footer class="card__footer">
                <button type="button" class="btn btn--secondary right-s" @click="cancel()">CANCEL</button>
                <button type="submit" class="btn btn--primary">SAVE</button>
            </footer>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import StringField from '@/components/form/StringField.vue'
    import MultiSelect from '@/components/form/MultiSelect.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            StringField,
            MultiSelect
        }
    })
    export default class RoleCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => [] }) permissions!: string[]
        @Prop({ default: () => { return {} } }) model!: any

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.model)
        }
    }
</script>

<style lang="scss"></style>
