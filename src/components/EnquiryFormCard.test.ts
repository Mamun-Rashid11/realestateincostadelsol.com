import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, beforeAll } from 'vitest';
import EnquiryFormCard from './EnquiryFormCard.astro';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

async function render(props: Record<string, unknown> = {}) {
  return container.renderToString(EnquiryFormCard, { props });
}

describe('EnquiryFormCard — phone field', () => {
  it('renders a tel input', async () => {
    const html = await render();
    expect(html).toContain('type="tel"');
  });

  it('phone is not required by default', async () => {
    const html = await render();
    // The tel input must exist but must not carry the required attribute
    const telIndex = html.indexOf('type="tel"');
    const fieldHtml = html.slice(telIndex - 50, telIndex + 200);
    expect(fieldHtml).not.toContain('required');
  });

  it('phone is required when required_phone prop is true', async () => {
    const html = await render({ required_phone: true });
    const telIndex = html.indexOf('type="tel"');
    const fieldHtml = html.slice(telIndex - 50, telIndex + 200);
    expect(fieldHtml).toContain('required');
  });
});

describe('EnquiryFormCard — property hidden fields', () => {
  it('renders no property hidden fields when props are absent', async () => {
    const html = await render();
    expect(html).not.toContain('name="property_ref"');
    expect(html).not.toContain('name="property_title"');
    expect(html).not.toContain('name="property_price"');
  });

  it('renders property hidden fields with correct values when props are provided', async () => {
    const html = await render({
      property_ref: 'R1234567',
      property_title: '3-Bed Villa in Marbella',
      property_price: '€450,000',
    });
    expect(html).toContain('name="property_ref"');
    expect(html).toContain('value="R1234567"');
    expect(html).toContain('name="property_title"');
    expect(html).toContain('value="3-Bed Villa in Marbella"');
    expect(html).toContain('name="property_price"');
    expect(html).toContain('value="€450,000"');
  });
});

describe('EnquiryFormCard — form handler', () => {
  it('submits to Web3Forms endpoint', async () => {
    const html = await render();
    expect(html).toContain('action="https://api.web3forms.com/submit"');
  });

  it('has no data-netlify attribute', async () => {
    const html = await render();
    expect(html).not.toContain('data-netlify');
  });

  it('has no form-name hidden field', async () => {
    const html = await render();
    expect(html).not.toContain('name="form-name"');
  });

  it('has a Web3Forms access_key hidden field', async () => {
    const html = await render();
    expect(html).toContain('name="access_key"');
  });

  it('does not use Web3Forms redirect field — JS handles redirect instead', async () => {
    const html = await render();
    expect(html).not.toContain('name="redirect"');
  });
});
