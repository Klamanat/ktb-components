import { Component, Prop, Event, EventEmitter, Watch, Element, h } from '@stencil/core';

@Component({
  tag: 'ktb-textarea',
  styleUrl: 'ktb-textarea.css',
  shadow: true,
})
export class KtbTextarea {
  @Element() el!: HTMLElement;

  @Prop() label?: string;
  @Prop() hint?: string;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() placeholder = '';
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() readonly = false;
  @Prop() rows = 3;
  @Prop() maxlength?: number;
  @Prop() autoResize = true;
  @Prop() maxAutoRows = 12;

  @Event() ktbInput: EventEmitter<string>;
  @Event() ktbChange: EventEmitter<string>;

  private textareaRef?: HTMLTextAreaElement;

  @Watch('value')
  onValueChange() {
    this.scheduleResize();
  }

  componentDidLoad() {
    this.scheduleResize();
  }

  private scheduleResize() {
    requestAnimationFrame(() => this.resize());
  }

  private resize() {
    if (!this.autoResize || !this.textareaRef) return;
    const el = this.textareaRef;
    el.style.height = 'auto';
    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight || '20');
    const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const maxHeight = this.maxAutoRows * lineHeight + paddingY + border;
    el.style.height = `${Math.min(el.scrollHeight + border, maxHeight)}px`;
  }

  private onInput(e: Event) {
    const val = (e.target as HTMLTextAreaElement).value;
    this.value = val;
    this.ktbInput.emit(val);
    this.resize();
  }

  private onBlur() {
    this.ktbChange.emit(this.value);
  }

  render() {
    return (
      <div class="textarea-wrapper">
        {(this.label || this.required) && (
          <label class="textarea-label">
            {this.label}
            {this.required && <span class="textarea-required">*</span>}
          </label>
        )}

        <textarea
          class="textarea"
          ref={el => { this.textareaRef = el; }}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.readonly}
          rows={this.rows}
          maxLength={this.maxlength}
          onInput={e => this.onInput(e)}
          onBlur={() => this.onBlur()}
        />

        <div class="textarea-footer">
          <span class="textarea-hint">{this.hint}</span>
          {this.maxlength && (
            <span class="textarea-counter">{(this.value || '').length} / {this.maxlength}</span>
          )}
        </div>
      </div>
    );
  }
}
