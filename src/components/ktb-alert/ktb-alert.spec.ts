import { newSpecPage } from '@stencil/core/testing';
import { KtbAlert } from './ktb-alert';

describe('ktb-alert', () => {
  it('should render without alerts initially', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });
    const container = page.root.shadowRoot.querySelector('.alert-container');
    expect(container).toBeTruthy();
    expect(container.querySelectorAll('.alert').length).toBe(0);
  });

  it('should add and display an alert', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });

    const component = page.rootInstance as KtbAlert;
    await component.add('Test message', 'success');
    await page.waitForChanges();

    expect(component['alerts'].length).toBe(1);
    expect(component['alerts'][0].message).toBe('Test message');
    expect(component['alerts'][0].type).toBe('success');
  });

  it('should add multiple alerts', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });

    const component = page.rootInstance as KtbAlert;
    await component.add('First alert', 'success');
    await component.add('Second alert', 'error');
    await page.waitForChanges();

    expect(component['alerts'].length).toBe(2);
  });

  it('should mark alert as closing when remove is called', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });

    const component = page.rootInstance as KtbAlert;
    await component.add('Test message', 'info', 0);
    const id = component['alerts'][0].id;

    await component.remove(id);
    await page.waitForChanges();

    expect(component['alerts'][0].closing).toBe(true);
  });

  it('should return correct border class for each type', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });

    const component = page.rootInstance as KtbAlert;
    expect(component['borderClass']('success')).toBe('alert--success');
    expect(component['borderClass']('error')).toBe('alert--error');
    expect(component['borderClass']('warning')).toBe('alert--warning');
    expect(component['borderClass']('info')).toBe('alert--info');
  });

  it('should default type to info when not specified', async () => {
    const page = await newSpecPage({
      components: [KtbAlert],
      html: `<ktb-alert></ktb-alert>`,
    });

    const component = page.rootInstance as KtbAlert;
    await component.add('Default type alert');
    await page.waitForChanges();

    expect(component['alerts'][0].type).toBe('info');
  });
});
