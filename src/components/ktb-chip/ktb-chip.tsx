import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export type ChipVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
export type ChipSize    = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ktb-chip',
  styleUrl: 'ktb-chip.css',
  shadow: true,
})
export class KtbChip {
  @Prop() label?:   string;
  @Prop() variant:  ChipVariant = 'default';
  @Prop() size:     ChipSize    = 'md';
  @Prop() outline   = false;
  @Prop() removable = false;
  @Prop() disabled  = false;
  @Prop() clickable = false;
  @Prop() avatar?:  string;

  @Event() ktbRemove: EventEmitter<void>;
  @Event() ktbClick:  EventEmitter<void>;

  private readonly avatarSizeMap: Record<ChipSize, number> = { sm: 16, md: 20, lg: 24 };
  private readonly removeIconSizeMap: Record<ChipSize, number> = { sm: 12, md: 14, lg: 16 };

  private handleRemove(e: MouseEvent) {
    e.stopPropagation();
    if (!this.disabled) this.ktbRemove.emit();
  }

  private handleClick() {
    if (this.clickable && !this.disabled) this.ktbClick.emit();
  }

  private renderCloseIcon(size: number) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    );
  }

  render() {
    const classes = [
      'chip',
      `chip--${this.variant}`,
      `chip--${this.size}`,
      this.outline   ? 'chip--outline'   : '',
      this.removable ? 'chip--removable' : '',
      this.clickable ? 'chip--clickable' : '',
      this.disabled  ? 'chip--disabled'  : '',
    ].filter(Boolean).join(' ');

    const avSize = this.avatarSizeMap[this.size];
    const rmSize = this.removeIconSizeMap[this.size];

    return (
      <div
        class={classes}
        onClick={() => this.handleClick()}
        role={this.clickable ? 'button' : undefined}
        tabIndex={this.clickable && !this.disabled ? 0 : undefined}
        onKeyDown={e => { if (this.clickable && (e.key === 'Enter' || e.key === ' ')) this.handleClick(); }}
      >
        {this.avatar && (
          <span class="chip__avatar" style={{ width: `${avSize}px`, height: `${avSize}px` }}>
            <img src={this.avatar} alt={this.label || ''} class="chip__avatar-img" />
          </span>
        )}
        <slot name="icon" />
        {this.label && <span class="chip__label">{this.label}</span>}
        <slot />
        {this.removable && !this.disabled && (
          <button
            class="chip__remove"
            type="button"
            aria-label="ลบ"
            onClick={e => this.handleRemove(e)}
          >
            {this.renderCloseIcon(rmSize)}
          </button>
        )}
      </div>
    );
  }
}
