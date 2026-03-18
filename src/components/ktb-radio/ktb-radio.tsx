import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

export type RadioDirection = 'vertical' | 'horizontal';

export interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  tag: 'ktb-radio',
  styleUrl: 'ktb-radio.css',
  shadow: true,
})
export class KtbRadio {
  @Prop() options: RadioOption[] = [];
  @Prop({ mutable: true }) value: any;
  @Prop() name     = '';
  @Prop() label?: string;
  @Prop() direction: RadioDirection = 'vertical';
  @Prop() disabled  = false;
  @Prop() required  = false;

  @Event() ktbChange: EventEmitter<any>;

  private handleChange(val: any) {
    this.value = val;
    this.ktbChange.emit(val);
  }

  render() {
    const opts: RadioOption[] = typeof this.options === 'string'
      ? JSON.parse(this.options as any)
      : this.options;

    return (
      <div class="radio-group">
        {this.label && (
          <span class="radio-group__label">
            {this.label}
            {this.required && <span class="radio-group__required" aria-hidden="true"> *</span>}
          </span>
        )}
        <div class={`radio-group__options radio-group__options--${this.direction}`}>
          {opts.map(opt => (
            <label class={`radio-item ${(this.disabled || opt.disabled) ? 'radio-item--disabled' : ''}`}>
              <input
                type="radio"
                class="radio"
                name={this.name || undefined}
                value={opt.value}
                checked={opt.value === this.value}
                disabled={this.disabled || opt.disabled}
                onChange={() => this.handleChange(opt.value)}
              />
              <span class="radio-item__label">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
}
