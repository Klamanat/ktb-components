import { Component, Prop, Event, EventEmitter, State, Watch, Element, Listen, h } from '@stencil/core';

export interface DropdownOption {
  [key: string]: any;
}

@Component({
  tag: 'ktb-dropdown',
  styleUrl: 'ktb-dropdown.css',
  shadow: true,
})
export class KtbDropdown {
  @Element() el!: HTMLElement;

  @Prop() options: DropdownOption[] = [];
  @Prop({ mutable: true }) value: any;
  @Prop() placeholder = 'เลือก...';
  @Prop() label?: string;
  @Prop() hint?: string;
  @Prop() multiple = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() optionLabel = 'label';
  @Prop() optionValue = 'value';

  @State() private open = false;
  @State() private selectedItems: DropdownOption[] = [];

  @Event() ktbChange: EventEmitter<any>;

  @Watch('value')
  onValueChange(newVal: any) {
    this.syncSelected(newVal);
  }

  @Watch('options')
  onOptionsChange() {
    this.syncSelected(this.value);
  }

  componentWillLoad() {
    this.syncSelected(this.value);
  }

  private syncSelected(val: any) {
    const opts = this.normalizeOptions();
    if (this.multiple) {
      const vals = Array.isArray(val) ? val : (val != null ? [val] : []);
      this.selectedItems = opts.filter(o => vals.includes(o[this.optionValue]));
    } else {
      const found = opts.find(o => o[this.optionValue] === val);
      this.selectedItems = found ? [found] : [];
    }
  }

  private normalizeOptions(): DropdownOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return Array.isArray(this.options) ? this.options : [];
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(e: MouseEvent) {
    if (!this.el.contains(e.target as Node)) {
      this.open = false;
    }
  }

  private toggle() {
    if (!this.disabled) this.open = !this.open;
  }

  private isSelected(opt: DropdownOption): boolean {
    return this.selectedItems.some(s => s[this.optionValue] === opt[this.optionValue]);
  }

  private selectOption(opt: DropdownOption) {
    if (opt.disabled) return;
    if (this.multiple) {
      const already = this.isSelected(opt);
      this.selectedItems = already
        ? this.selectedItems.filter(s => s[this.optionValue] !== opt[this.optionValue])
        : [...this.selectedItems, opt];
      const vals = this.selectedItems.map(s => s[this.optionValue]);
      this.value = vals;
      this.ktbChange.emit(vals);
    } else {
      this.selectedItems = [opt];
      this.value = opt[this.optionValue];
      this.ktbChange.emit(opt[this.optionValue]);
      this.open = false;
    }
  }

  private clear(e: MouseEvent) {
    e.stopPropagation();
    this.selectedItems = [];
    this.value = this.multiple ? [] : undefined;
    this.ktbChange.emit(this.value);
  }

  private get displayLabel(): string {
    if (!this.selectedItems.length) return '';
    if (!this.multiple) return this.selectedItems[0][this.optionLabel] ?? '';
    const shown = this.selectedItems.slice(0, 2).map(s => s[this.optionLabel]).join(', ');
    const extra = this.selectedItems.length > 2 ? ` +${this.selectedItems.length - 2}` : '';
    return shown + extra;
  }

  render() {
    const opts = this.normalizeOptions();
    const hasValue = this.selectedItems.length > 0;

    return (
      <div class="dropdown-wrapper">
        {(this.label || this.required) && (
          <label class="dropdown-label">
            {this.label}
            {this.required && <span class="dropdown-required">*</span>}
          </label>
        )}

        <div class={`dropdown ${this.disabled ? 'dropdown--disabled' : ''}`}>
          <button
            class={`dropdown-trigger ${this.open ? 'dropdown-trigger--open' : ''} ${hasValue ? 'dropdown-trigger--has-value' : ''}`}
            type="button"
            disabled={this.disabled}
            onClick={() => this.toggle()}
            aria-haspopup="listbox"
            aria-expanded={this.open}
          >
            <span class={`dropdown-trigger__text ${!hasValue ? 'dropdown-trigger__placeholder' : ''}`}>
              {hasValue ? this.displayLabel : this.placeholder}
            </span>
            <span class="dropdown-trigger__icons">
              {hasValue && !this.disabled && (
                <span class="dropdown-clear" onClick={e => this.clear(e)} aria-label="clear">
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                </span>
              )}
              <span class={`dropdown-chevron ${this.open ? 'dropdown-chevron--up' : ''}`}>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
              </span>
            </span>
          </button>

          {this.open && (
            <ul class="dropdown-menu" role="listbox">
              {opts.map(opt => (
                <li
                  class={`dropdown-option ${this.isSelected(opt) ? 'dropdown-option--selected' : ''} ${opt.disabled ? 'dropdown-option--disabled' : ''}`}
                  role="option"
                  aria-selected={this.isSelected(opt)}
                  onClick={() => this.selectOption(opt)}
                >
                  {this.multiple && (
                    <span class={`dropdown-check ${this.isSelected(opt) ? 'dropdown-check--visible' : ''}`}>
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  )}
                  {opt[this.optionLabel]}
                  {!this.multiple && this.isSelected(opt) && (
                    <span class="dropdown-selected-mark">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  )}
                </li>
              ))}
              {opts.length === 0 && (
                <li class="dropdown-empty">ไม่มีตัวเลือก</li>
              )}
            </ul>
          )}
        </div>

        {this.hint && <span class="dropdown-hint">{this.hint}</span>}
      </div>
    );
  }
}
