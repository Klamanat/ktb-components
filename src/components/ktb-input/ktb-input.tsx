import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ktb-input',
  styleUrl: 'ktb-input.css',
  shadow: true,
})
export class KtbInput {
  @Prop() label?: string;
  @Prop() hint?: string;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() placeholder = '';
  @Prop() type: InputType = 'text';
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() readonly = false;
  @Prop() maxlength?: number;
  @Prop() size: InputSize = 'md';
  @Prop() clearable = true;

  @State() private showPassword = false;

  @Event() ktbInput: EventEmitter<string>;
  @Event() ktbChange: EventEmitter<string>;
  @Event() ktbClear: EventEmitter<void>;

  private get isPassword() { return this.type === 'password'; }

  private get inputType() {
    if (this.isPassword) return this.showPassword ? 'text' : 'password';
    return this.type;
  }

  private get showClear() {
    return this.clearable && !!this.value && !this.disabled && !this.readonly && !this.isPassword;
  }

  private onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.value = val;
    this.ktbInput.emit(val);
  }

  private onBlur() {
    this.ktbChange.emit(this.value);
  }

  private clearInput() {
    this.value = '';
    this.ktbInput.emit('');
    this.ktbClear.emit();
  }

  private togglePassword() {
    this.showPassword = !this.showPassword;
  }

  render() {
    const hasIcons = this.showClear || this.isPassword;
    return (
      <div class="input-wrapper">
        {(this.label || this.required) && (
          <label class="input-label">
            {this.label}
            {this.required && <span class="input-required">*</span>}
          </label>
        )}

        <div class={`input-box input-box--${this.size} ${this.disabled ? 'input-box--disabled' : ''}`}>
          <input
            class={`input ${hasIcons ? 'input--padded-right' : ''}`}
            type={this.inputType}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            maxLength={this.maxlength}
            onInput={e => this.onInput(e)}
            onBlur={() => this.onBlur()}
          />
          {hasIcons && (
            <div class="input-icons">
              {this.showClear && (
                <button class="input-icon-btn" type="button" onClick={() => this.clearInput()} aria-label="clear">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </button>
              )}
              {this.isPassword && (
                <button class="input-icon-btn" type="button" onClick={() => this.togglePassword()} aria-label={this.showPassword ? 'hide password' : 'show password'}>
                  {this.showPassword
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              )}
            </div>
          )}
        </div>

        <div class="input-footer">
          <span class="input-hint">{this.hint}</span>
          {this.maxlength && (
            <span class="input-counter">{(this.value || '').length} / {this.maxlength}</span>
          )}
        </div>
      </div>
    );
  }
}
