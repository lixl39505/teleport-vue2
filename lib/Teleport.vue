<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Teleport',
  abstract: true,
  props: {
    to: {
      type: [String, HTMLElement],
      required: true,
    },
    disabled: Boolean,
  },
  data() {
    let nonReactive = {
      teleported: false,
      lastTo: '',
      rootEl: undefined,
      originalEl: undefined,
      dumb: document.createComment(' teleport '),
    } as {
      teleported: boolean
      lastTo: string | HTMLElement
      rootEl?: Node
      originalEl?: Node
      dumb: Node
    }
    Object.preventExtensions(nonReactive)
    return nonReactive
  },
  methods: {
    onEnter() {
      // @ts-ignore
      this.rootEl = this._vnode.elm
      // @ts-ignore
      this.originalEl = this.teleported ? this.dumb?.parentNode : this.rootEl?.parentNode 

      this.disabled ? this.restore() : this.telport()
    },
    restore() {
      if (!this.teleported) return
      this.$vnode.elm = this.rootEl
      this.teleported = false
      this.lastTo = ''

      if (!this.originalEl) return
      this.rootEl && this.originalEl.insertBefore(this.rootEl, this.dumb)
      this.dumb.parentNode?.removeChild(this.dumb)
    },
    telport() {
      if (!this.rootEl || !this.originalEl) return
      if (!this.teleported) this.originalEl.insertBefore(this.dumb, this.rootEl)
      this.$vnode.elm = this.dumb
      this.teleported = true

      let targetEl
      if (this.to !== this.lastTo) targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
      if (!targetEl) return
      targetEl.appendChild(this.rootEl)
      this.lastTo = this.to
    },
  },
  mounted() {
    this.onEnter()
  },
  updated() {
    this.onEnter() // 除了 to、disabled 外，rootEl 以及 originalEl 也可能发生变化
  },
  beforeDestroy() {
    this.dumb.parentNode?.removeChild(this.dumb)
    this.rootEl?.parentNode?.removeChild(this.rootEl)
  },
  render(h) {
    let first = this.$slots.default?.[0]
    return first
  },
})
</script>
