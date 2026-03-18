import { Component, Prop, h } from '@stencil/core';

export type BannerType = 'error' | 'info' | 'success' | 'warning';

@Component({
  tag: 'ktb-banner',
  styleUrl: 'ktb-banner.css',
  shadow: true,
})
export class KtbBanner {
  @Prop() type: BannerType = 'info';
  @Prop() title?: string;
  @Prop() message?: string;

  private renderIcon() {
    const icons: Record<BannerType, string> = {
      info: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 11v6m0-8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M12 9v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      success: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    };
    return <span class={`banner__icon banner__icon--${this.type}`} innerHTML={icons[this.type]} aria-hidden="true" />;
  }

  render() {
    return (
      <div class={`banner banner--${this.type}`} role="alert">
        {this.renderIcon()}
        <div class="banner__content">
          {this.title   && <h3 class="banner__title">{this.title}</h3>}
          {this.message && <p  class="banner__message">{this.message}</p>}
          <slot />
        </div>
      </div>
    );
  }
}
