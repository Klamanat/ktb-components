import { Component, Prop, Event, EventEmitter, State, Watch, h } from '@stencil/core';

export interface TabItem {
  label: string;
  disabled?: boolean;
}

export type TabStyle = 'default' | 'underline' | 'pills' | 'minimal';
export type TabVariant = 'primary' | 'secondary' | 'accent';

@Component({
  tag: 'ktb-tabs',
  styleUrl: 'ktb-tabs.css',
  shadow: true,
})
export class KtbTabs {
  @Prop() tabs: TabItem[] = [];
  @Prop({ mutable: true, reflect: true }) active = 0;
  @Prop() tabStyle: TabStyle = 'default';
  @Prop() variant: TabVariant = 'primary';

  @State() private _active = 0;

  @Event() ktbChange: EventEmitter<number>;

  @Watch('active')
  onActivePropChange(val: number) {
    this._active = val;
  }

  componentWillLoad() {
    this._active = this.active;
  }

  private normalizedTabs(): TabItem[] {
    if (typeof this.tabs === 'string') {
      try { return JSON.parse(this.tabs); } catch { return []; }
    }
    return Array.isArray(this.tabs) ? this.tabs : [];
  }

  private selectTab(index: number) {
    const tabs = this.normalizedTabs();
    if (tabs[index]?.disabled) return;
    this._active = index;
    this.active = index;
    this.ktbChange.emit(index);
  }

  render() {
    const tabs = this.normalizedTabs();

    return (
      <div class="tabs-wrapper">
        <div class={`tabs-nav tabs-nav--${this.tabStyle} tabs-nav--${this.variant}`} role="tablist">
          {tabs.map((tab, i) => (
            <button
              class={`tabs-tab tabs-tab--${this.tabStyle} tabs-tab--${this.variant} ${i === this._active ? 'tabs-tab--active' : ''} ${tab.disabled ? 'tabs-tab--disabled' : ''}`}
              role="tab"
              type="button"
              aria-selected={i === this._active}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => this.selectTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div class={`tabs-content tabs-content--${this.tabStyle}`}>
          {tabs.map((_, i) => (
            <div
              class={`tabs-panel ${i === this._active ? 'tabs-panel--active' : ''}`}
              role="tabpanel"
              aria-hidden={i !== this._active}
            >
              <slot name={`panel-${i}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
