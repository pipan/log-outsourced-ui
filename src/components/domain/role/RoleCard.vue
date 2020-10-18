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
                <select-checkbox-field
                    label="Permissions"
                    :value="model.permissions"
                    :options="permissions"
                    @change="model.permissions = $event"></select-checkbox-field>
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
    import SelectCheckboxField from '@/components/form/SelectCheckboxField.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            StringField,
            SelectCheckboxField
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
