<template>
    <section>
        <role-card
            title="Create role"
            @submit="save($event)"
            @cancel="cancel()"></role-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import RoleCard from '@/components/domain/role/RoleCard.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            RoleCard
        }
    })
    export default class RoleCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly project!: any

        public cancel (): void {
            this.$router.push({
                name: 'role.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'role@create',
                data: {
                    body: {
                        name: model.name,
                        permissions: ['user.view'],
                        project_uuid: this.project.uuid
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'role.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
