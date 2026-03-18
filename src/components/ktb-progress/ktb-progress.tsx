import { Component, Prop, h } from '@stencil/core';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'error';

const COLOR_MAP: Record<ProgressColor, string> = {
  primary:   'var(--color-primary,   #60a5fa)',
  secondary: 'var(--color-secondary, #818cf8)',
  success:   'var(--color-success,   #34d399)',
  warning:   'var(--color-warning,   #fbbf24)',
  danger:    'var(--color-danger,    #f87171)',
  info:      'var(--color-info,      #22d3ee)',
  error:     'var(--color-danger,    #f87171)',
};

@Component({
  tag: 'ktb-progress',
  styleUrl: 'ktb-progress.css',
  shadow: true,
})
export class KtbProgress {
  @Prop() value = 0;
  @Prop() max = 100;
  @Prop() size: ProgressSize = 'md';
  @Prop() color: ProgressColor = 'primary';
  @Prop() showValue = false;
  @Prop() suffix = '%';
  @Prop() thickness = 3;

  private get percentage(): number {
    if (this.max === 0) return 0;
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  private get strokeDasharray(): string {
    return `${this.percentage}, 100`;
  }

  private get displayValue(): string {
    return `${Math.round(this.percentage)}${this.suffix}`;
  }

  render() {
    return (
      <div
        class={`progress progress--${this.size}`}
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin={0}
        aria-valuemax={this.max}
      >
        <svg class="progress-svg" viewBox="0 0 36 36">
          {/* Track */}
          <path
            class="progress-track"
            stroke-width={this.thickness}
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Fill */}
          <path
            class="progress-fill"
            stroke-width={this.thickness}
            stroke-dasharray={this.strokeDasharray}
            stroke-dashoffset="25"
            style={{ stroke: COLOR_MAP[this.color] ?? COLOR_MAP.primary }}
            fill="none"
            stroke-linecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {this.showValue && (
          <span class="progress-label">
            <slot>{this.displayValue}</slot>
          </span>
        )}
      </div>
    );
  }
}
