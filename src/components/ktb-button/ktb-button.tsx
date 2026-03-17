import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export type ButtonSize    = 'sm' | 'md' | 'lg' | 'in-table';
export type ButtonColor   = 'primary' | 'info' | 'warning' | 'danger' | 'success' | '';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonType    = 'button' | 'submit' | 'reset';

@Component({
  tag: 'ktb-button',
  styleUrl: 'ktb-button.css',
  shadow: true,
})
export class KtbButton {
  /** ขนาดปุ่ม */
  @Prop() size: ButtonSize = 'md';

  /** สีปุ่ม */
  @Prop() color: ButtonColor = '';

  /** ความโค้งมุม */
  @Prop() rounded: ButtonRounded = 'md';

  /** ประเภทของ button element */
  @Prop() type: ButtonType = 'button';

  /** ปิดการใช้งาน */
  @Prop() disabled = false;

  /** แสดง spinner และล็อกการคลิก */
  @Prop() loading = false;

  /** ขยายเต็มความกว้าง */
  @Prop() fullWidth = false;

  /** แสดงแบบ outline */
  @Prop() outline = false;

  /** Event เมื่อคลิก */
  @Event() ktbClick: EventEmitter<MouseEvent>;

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    this.ktbClick.emit(e);
  }

  private get sizeClass(): string {
    switch (this.size) {
      case 'sm':       return 'btn--sm';
      case 'lg':       return 'btn--lg';
      case 'in-table': return 'btn--in-table';
      default:         return 'btn--md';
    }
  }

  private get colorClass(): string {
    const prefix = this.outline ? 'btn-outline' : 'btn-solid';
    return this.color ? `${prefix}--${this.color}` : `${prefix}--default`;
  }

  private get roundedClass(): string {
    return `btn--rounded-${this.rounded}`;
  }

  private renderSpinner() {
    return <span class={`spinner spinner--${this.outline ? 'outline' : this.color || 'default'}`} aria-hidden="true" />;
  }

  render() {
    const classes = [
      'btn',
      this.sizeClass,
      this.colorClass,
      this.roundedClass,
      this.fullWidth  ? 'btn--full'     : '',
      this.disabled   ? 'btn--disabled' : '',
      this.loading    ? 'btn--loading'  : '',
    ].filter(Boolean).join(' ');

    return (
      <button
        class={classes}
        type={this.type}
        disabled={this.disabled || this.loading}
        onClick={e => this.handleClick(e)}
      >
        {this.loading
          ? this.renderSpinner()
          : <slot name="icon-left" />
        }
        <slot />
        {!this.loading && <slot name="icon-right" />}
      </button>
    );
  }
}
