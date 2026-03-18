import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export type ExpandColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ExpandIconPosition = 'left' | 'right';

@Component({
  tag: 'ktb-expand',
  styleUrl: 'ktb-expand.css',
  shadow: true,
})
export class KtbExpand {
  @Prop() heading = '';
  @Prop({ mutable: true, reflect: true }) expanded = false;
  @Prop() color: ExpandColor = 'default';
  @Prop() iconPosition: ExpandIconPosition = 'right';
  @Prop() disabled = false;

  @Event() ktbToggle: EventEmitter<boolean>;

  private toggle() {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.ktbToggle.emit(this.expanded);
  }

  private get chevron() {
    return (
      <svg class={`expand-icon ${this.expanded ? 'expand-icon--up' : ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    );
  }

  render() {
    return (
      <div class={`expand expand--${this.color} ${this.disabled ? 'expand--disabled' : ''}`}>
        <button
          class="expand-header"
          type="button"
          onClick={() => this.toggle()}
          aria-expanded={this.expanded}
          disabled={this.disabled}
        >
          {this.iconPosition === 'left' && (
            <span class="expand-header__icon">{this.chevron}</span>
          )}
          <span class="expand-header__title">{this.heading}</span>
          {this.iconPosition === 'right' && (
            <span class="expand-header__icon">{this.chevron}</span>
          )}
        </button>

        <div class={`expand-body ${this.expanded ? 'expand-body--open' : ''}`} aria-hidden={!this.expanded}>
          <div class="expand-content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
