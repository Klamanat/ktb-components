import { Component, Prop, h } from '@stencil/core';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
export type BadgeSize   = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  tag: 'ktb-badge',
  styleUrl: 'ktb-badge.css',
  shadow: true,
})
export class KtbBadge {
  @Prop() variant: BadgeVariant = 'default';
  @Prop() size: BadgeSize = 'xs';
  @Prop() outline = false;

  render() {
    const classes = [
      'badge',
      `badge--${this.variant}`,
      `badge--${this.size}`,
      this.outline ? 'badge--outline' : '',
    ].filter(Boolean).join(' ');

    return (
      <span class={classes}>
        <slot name="icon" />
        <slot />
      </span>
    );
  }
}
