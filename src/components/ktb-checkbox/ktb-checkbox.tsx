import { Component, Prop, Event, EventEmitter, Watch, h } from '@stencil/core';

export type CheckboxColor = 'primary' | 'success' | 'error';

@Component({
  tag: 'ktb-checkbox',
  styleUrl: 'ktb-checkbox.css',
  shadow: true,
})
export class KtbCheckbox {
  @Prop({ mutable: true, reflect: true }) checked  = false;
  @Prop() indeterminate = false;
  @Prop() disabled      = false;
  @Prop() label         = '';
  @Prop() color: CheckboxColor = 'primary';

  @Event() ktbChange: EventEmitter<boolean>;

  private inputRef?: HTMLInputElement;

  @Watch('indeterminate')
  watchIndeterminate(val: boolean) {
    if (this.inputRef) this.inputRef.indeterminate = val;
  }

  @Watch('checked')
  watchChecked() {
    if (this.inputRef) this.inputRef.indeterminate = false;
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.ktbChange.emit(this.checked);
  }

  render() {
    return (
      <label class={`checkbox-wrap ${this.disabled ? 'checkbox-wrap--disabled' : ''}`}>
        <input
          ref={el => {
            if (el) {
              this.inputRef = el;
              el.indeterminate = this.indeterminate;
            }
          }}
          type="checkbox"
          class={`checkbox checkbox--${this.color}`}
          checked={this.checked}
          disabled={this.disabled}
          onChange={e => this.handleChange(e)}
        />
        {this.label && <span class="checkbox__label">{this.label}</span>}
        <slot />
      </label>
    );
  }
}
