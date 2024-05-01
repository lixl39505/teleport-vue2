<script lang="ts">
export default {
  name: 'Teleport',
  abstract: true,
  props: {
    to: [String, HTMLElement],
    disabled: Boolean,
  },
  data() {
    let nonReactive = {
      teleported: false,
      rootEl: undefined,
      originalEl: undefined,
      dumb: document.createComment(' teleport '),
    } as {
      rootEl?: Node
      originalEl?: Node
      dumb: Node
      teleported: boolean
    }
    Object.preventExtensions(nonReactive)
    return nonReactive
  },
  methods: {
    onEnter() {
      // @ts-ignore
      this.rootEl = this._vnode.elm
      this.originalEl = this.$vnode.elm?.parentNode || undefined

      this.disabled ? this.restore() : this.telport()
    },
    restore() {
      if (!this.teleported) return
      this.teleported = false
      this.$vnode.elm = this.rootEl
      if (!this.originalEl) return
      this.rootEl && this.originalEl.insertBefore(this.rootEl, this.dumb)
      this.dumb.parentNode?.removeChild(this.dumb)
    },
    telport() {
      if (!this.rootEl || !this.originalEl) return
      let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
      if (!targetEl) return
      if (!this.teleported) this.originalEl.insertBefore(this.dumb, this.rootEl)
      targetEl.appendChild(this.rootEl)
      this.$vnode.elm = this.dumb
      this.teleported = true
    },
  },
  mounted() {
    this.onEnter()
  },
  updated() {
    this.onEnter()
  },
  beforeDestroy() {
    this.dumb.parentNode?.removeChild(this.dumb)
    this.rootEl?.parentNode?.removeChild(this.rootEl)
  },
  render(h) {
    let first = this.$slots.default?.[0]
    return first
  },
}
</script>
