import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'ktb-row',
  styleUrl: 'ktb-row.css',
  shadow: true,
})
export class KtbRow {
  /** จำนวน gap ตาม spacing scale (1 = 0.25rem, 4 = 1rem) */
  @Prop() gap = 4;

  render() {
    const gapValue = `${this.gap * 0.25}rem`;
    return (
      <Host style={{ '--ktb-row-gap': gapValue }}>
        <slot />
      </Host>
    );
  }
}
