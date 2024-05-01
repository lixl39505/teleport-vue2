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
      let children = this.$slots.default || []
      this.rootEl = children[0]?.elm
      this.originalEl = this.$vnode.elm?.parentNode || undefined
    },
    restore() {
      if (!this.rootEl || !this.originalEl) return
      if (!this.teleported) return
      this.originalEl.insertBefore(this.rootEl, this.dumb)
      this.dumb.parentNode?.removeChild(this.dumb)
      this.$vnode.elm = this.rootEl
      this.teleported = false
    },
    telport(target: Node) {
      if (!this.rootEl || !this.originalEl) return
      if (!this.teleported) this.originalEl.insertBefore(this.dumb, this.rootEl)
      target.appendChild(this.rootEl)
      this.$vnode.elm = this.dumb
      this.teleported = true
    },
  },
  mounted() {
    this.onEnter()
    if (!this.rootEl || !this.originalEl) return

    this.$watch(
      () => [this.to, this.disabled],
      () => {
        let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
        if (!targetEl) return
        this.disabled ? this.restore() : this.telport(targetEl)
      },
      {
        immediate: true,
      },
    )
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
