<script>
  import { classnames } from "../utils/classnames";
  export let variant = "is-primary";
  export let handleClick;

  const classname = classnames("nes-btn", variant);
</script>

<button class="{classname}" on:click="{handleClick}" {...$$restProps}>
  <slot />
</button>
