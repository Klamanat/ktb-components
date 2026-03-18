import { Component, Prop, State, Host, h } from '@stencil/core';

@Component({
  tag: 'ktb-col',
  styleUrl: 'ktb-col.css',
  shadow: true,
})
export class KtbCol {
  @Prop() span = 12;
  @Prop() sm?: number;
  @Prop() md?: number;
  @Prop() lg?: number;
  @Prop() xl?: number;

  @State() private currentSpan = 12;

  private handleResize = () => this.updateSpan();

  connectedCallback() {
    this.updateSpan();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  private updateSpan() {
    const w = window.innerWidth;
    if      (w >= 1280 && this.xl != null) this.currentSpan = this.xl;
    else if (w >= 1024 && this.lg != null) this.currentSpan = this.lg;
    else if (w >= 768  && this.md != null) this.currentSpan = this.md;
    else if (w >= 640  && this.sm != null) this.currentSpan = this.sm;
    else                                   this.currentSpan = this.span;
  }

  render() {
    const col = `span ${this.currentSpan} / span ${this.currentSpan}`;
    return (
      <Host style={{ gridColumn: col }}>
        <slot />
      </Host>
    );
  }
}
