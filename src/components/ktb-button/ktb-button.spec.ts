import { newSpecPage } from '@stencil/core/testing';
import { KtbButton } from './ktb-button';

describe('ktb-button', () => {
  it('renders default button', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button>Click</ktb-button>`,
    });
    const btn = page.root.shadowRoot.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.disabled).toBe(false);
  });

  it('sets default props correctly', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button></ktb-button>`,
    });
    const comp = page.rootInstance as KtbButton;
    expect(comp.size).toBe('md');
    expect(comp.color).toBe('');
    expect(comp.rounded).toBe('md');
    expect(comp.disabled).toBe(false);
    expect(comp.loading).toBe(false);
    expect(comp.fullWidth).toBe(false);
    expect(comp.outline).toBe(false);
  });

  it('disables button when disabled=true', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button disabled></ktb-button>`,
    });
    const btn = page.root.shadowRoot.querySelector('button');
    expect(btn.disabled).toBe(true);
    expect(btn.className).toContain('btn--disabled');
  });

  it('disables button when loading=true', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button loading></ktb-button>`,
    });
    const btn = page.root.shadowRoot.querySelector('button');
    expect(btn.disabled).toBe(true);
    expect(btn.className).toContain('btn--loading');
  });

  it('shows spinner when loading', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button loading></ktb-button>`,
    });
    const spinner = page.root.shadowRoot.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('applies size class correctly', async () => {
    for (const [size, cls] of [['sm', 'btn--sm'], ['md', 'btn--md'], ['lg', 'btn--lg'], ['in-table', 'btn--in-table']]) {
      const page = await newSpecPage({
        components: [KtbButton],
        html: `<ktb-button size="${size}"></ktb-button>`,
      });
      expect(page.root.shadowRoot.querySelector('button').className).toContain(cls);
    }
  });

  it('applies solid color class correctly', async () => {
    for (const color of ['primary', 'info', 'warning', 'danger', 'success']) {
      const page = await newSpecPage({
        components: [KtbButton],
        html: `<ktb-button color="${color}"></ktb-button>`,
      });
      expect(page.root.shadowRoot.querySelector('button').className).toContain(`btn-solid--${color}`);
    }
  });

  it('applies outline color class correctly', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button color="primary" outline></ktb-button>`,
    });
    expect(page.root.shadowRoot.querySelector('button').className).toContain('btn-outline--primary');
  });

  it('applies rounded class correctly', async () => {
    for (const r of ['none', 'sm', 'md', 'lg', 'full']) {
      const page = await newSpecPage({
        components: [KtbButton],
        html: `<ktb-button rounded="${r}"></ktb-button>`,
      });
      expect(page.root.shadowRoot.querySelector('button').className).toContain(`btn--rounded-${r}`);
    }
  });

  it('applies full width class', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button full-width></ktb-button>`,
    });
    expect(page.root.shadowRoot.querySelector('button').className).toContain('btn--full');
  });

  it('sets correct button type', async () => {
    const page = await newSpecPage({
      components: [KtbButton],
      html: `<ktb-button type="submit"></ktb-button>`,
    });
    expect(page.root.shadowRoot.querySelector('button').getAttribute('type')).toBe('submit');
  });
});
