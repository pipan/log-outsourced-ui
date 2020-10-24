<template>
    <div class="card">
        <form @submit.prevent="save()">
            <header class="card__header">{{ title }}</header>
            <div class="card__body">
                <string-field
                    v-if="model"
                    id="name"
                    label="Name"
                    :value="innerModel.name"
                    :error="form.error ? form.error.name : ''"
                    @change="innerModel.name = $event"></string-field>
                <multi-select
                    class="top-m"
                    label="Permissions"
                    :value="innerModel.permissions"
                    :error="form.error ? form.error.permissions : ''"
                    :options="permissions"
                    filterAvailableSince="6"
                    @change="innerModel.permissions = $event">
                        <template v-slot:actions>
                            <inline-context-menu
                                ref="permissionAddContext"
                                :relative="true"
                                icon="add"
                                class="right-m">
                                <input
                                    type="text"
                                    v-autofocus="true"
                                    @keydown.esc="onEsc()"
                                    @keydown.enter.prevent="permissionAdd()"
                                    :value="newPermissionValue"
                                    class="field__input field__input--auto left-s"
                                    @input="newPermissionValue = $event.target.value" />
                            </inline-context-menu>
                        </template>
                    </multi-select>
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
    import StringField from '@/components/form/StringField.vue'
    import MultiSelect from '@/components/form/MultiSelect.vue'
    import { Channel } from '@wildebeest/observable'
    import InlineContextMenu from '@/components/contextmenu/InlineContextMenu.vue'
    import { Autofocus } from '@/directives/form/Autofocus'

    @Component({
        components: {
            StringField,
            MultiSelect,
            InlineContextMenu
        },
        directives: {
            autofocus: new Autofocus()
        }
    })
    export default class RoleCard extends Vue {
        @Prop() readonly title!: string
        @Prop({ default: () => [] }) permissions!: string[]
        @Prop({ default: () => { return {} } }) model!: any
        @Prop({ default: () => { return {} } }) form!: any

        public innerModel: any = {}
        public newPermissionValue = ''

        @Watch('model', { immediate: true })
        public onModelChange (value: any, oldValue: any): void {
            let permissionsClone: string[] = []
            if (value.permissions) {
                permissionsClone = [...value.permissions]
            }
            this.innerModel = {
                uuid: value.uuid,
                name: value.name,
                permissions: permissionsClone
            }
        }

        public cancel (): void {
            this.$emit('cancel')
        }

        public save (): void {
            this.$emit('submit', this.innerModel)
        }

        public onEsc (): void {
            (this.$refs.permissionAddContext as InlineContextMenu).close()
        }

        public permissionAdd (): void {
            this.$emit('permission', this.newPermissionValue)
            this.newPermissionValue = ''
            this.onEsc()
        }
    }
</script>

<style lang="scss"></style>
