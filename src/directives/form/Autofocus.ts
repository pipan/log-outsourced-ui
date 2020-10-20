import { DirectiveOptions } from 'vue/types/umd'

export class Autofocus implements DirectiveOptions {
    public inserted (el: any, binding: any, vnode: any) {
        if (!binding.value) {
            return
        }
        el.focus()
    }
}
