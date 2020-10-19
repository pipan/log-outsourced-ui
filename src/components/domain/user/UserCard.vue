<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <string-field
                    v-if="model"
                    id="username"
                    label="Username"
                    :value="model.username"
                    @change="model.username = $event"></string-field>
                <multi-select
                    class="top-m"
                    label="Roles"
                    :value="model.roles"
                    :options="roles"
                    filterAvailableSince="6"
                    @change="model.roles = $event"></multi-select>
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

    @Component({
        components: {
            StringField,
            MultiSelect
        }
    })
    export default class UserCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => [] }) roles!: any
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
