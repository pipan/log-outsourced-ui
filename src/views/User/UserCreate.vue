<template>
    <section>
        <user-card
            title="Create user"
            @submit="save($event)"
            @cancel="cancel()"></user-card>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import UserCard from '@/components/domain/user/UserCard.vue'
    import { Channel } from '@wildebeest/observable'

    @Component({
        components: {
            UserCard
        }
    })
    export default class UserCreate extends Vue {
        @Prop() readonly channel!: Channel<any>
        @Prop() readonly project!: any

        public cancel (): void {
            this.$router.push({
                name: 'user.list',
                params: this.$route.params
            })
        }

        public save (model: any): void {
            this.channel.dispatch({
                event: 'user@create',
                data: {
                    body: {
                        username: model.username,
                        project_uuid: this.project.uuid
                    },
                    success: (project: any) => {
                        this.$router.push({
                            name: 'user.list',
                            params: this.$route.params
                        })
                    }
                }
            })
        }
    }
</script>

<style lang="scss"></style>
