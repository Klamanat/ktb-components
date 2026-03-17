import { Component, Prop, State, Method, h } from '@stencil/core';

export type AlertType = 'success' | 'error' | 'info' | 'warning';
export type AlertPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

interface IAlert {
  id: number;
  message: string;
  type: AlertType;
  closing?: boolean;
}

@Component({
  tag: 'ktb-alert',
  styleUrl: 'ktb-alert.css',
  shadow: true,
})
export class KtbAlert {
  @Prop() position: AlertPosition = 'top-right';

  @State() private currentPosition: AlertPosition = 'top-right';
  @State() private alerts: IAlert[] = [];
  private counter = 0;

  componentWillLoad() {
    this.currentPosition = this.position;
  }

  /** เปลี่ยนตำแหน่งของ alert container */
  @Method()
  async setPosition(pos: AlertPosition) {
    this.currentPosition = pos;
  }

  /** เพิ่ม alert ใหม่ */
  @Method()
  async add(message: string, type: AlertType = 'info', duration = 3000) {
    const id = ++this.counter;
    this.alerts = [...this.alerts, { id, message, type }];

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  /** ปิด alert ตาม id (มี fade-out animation) */
  @Method()
  async remove(id: number) {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) return;

    this.alerts = this.alerts.map(a => (a.id === id ? { ...a, closing: true } : a));
    setTimeout(() => {
      this.alerts = this.alerts.filter(a => a.id !== id);
    }, 300);
  }

  private borderClass(type: AlertType): string {
    const map: Record<AlertType, string> = {
      success: 'alert--success',
      error:   'alert--error',
      warning: 'alert--warning',
      info:    'alert--info',
    };
    return map[type] ?? 'alert--info';
  }

  private renderIcon(type: AlertType) {
    const icons: Record<AlertType, string> = {
      success: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
      error: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 7v5m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
      warning: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M12 9v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
      info: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 11v6m0-8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
    };

    return (
      <span
        class={`icon icon--${type}`}
        aria-hidden="true"
        innerHTML={icons[type]}
      />
    );
  }

  private renderCloseIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    );
  }

  render() {
    return (
      <div class={`alert-container alert-container--${this.currentPosition}`}>
        {this.alerts.map(alert => (
          <div
            key={alert.id}
            class={`alert ${this.borderClass(alert.type)} ${alert.closing ? 'alert--closing' : ''} ${alert.type === 'error' ? 'alert--tall' : ''}`}
            role="alert"
            aria-live="assertive"
          >
            <div class="alert__body">
              {this.renderIcon(alert.type)}
              <div class="alert__content">
                {alert.type === 'error' && (
                  <p class="alert__title">เกิดข้อผิดพลาด</p>
                )}
                <span class="alert__message">{alert.message}</span>
              </div>
            </div>

            <button
              class="alert__close"
              aria-label="ปิด"
              onClick={() => this.remove(alert.id)}
            >
              {this.renderCloseIcon()}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
