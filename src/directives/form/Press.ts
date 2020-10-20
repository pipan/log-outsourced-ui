import { DirectiveOptions } from 'vue/types/umd'

export class Press implements DirectiveOptions {
    public inserted (el: any, binding: any, vnode: any) {
        el.addEventListener('keydown', (event: any) => {
            if (event.key !== binding.arg) {
                return
            }
            binding.value()
        })
    }
}
