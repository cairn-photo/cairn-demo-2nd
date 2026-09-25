import type { FastifyPluginAsync } from 'fastify';

const statusBar = {
  cellular: 'https://www.figma.com/api/mcp/asset/a9941e1c-a3a5-432f-863e-fb9a6099d4ec.svg',
  wifi: 'https://www.figma.com/api/mcp/asset/10c0dceb-0371-4d0b-b153-6265778616ba.svg',
  battery: 'https://www.figma.com/api/mcp/asset/7d68f4d3-c0a3-4ab2-9f3a-c6a08e9a0770.svg'
} as const;

const icons = {
  login: 'https://www.figma.com/api/mcp/asset/b56d9a6e-afcd-446b-9503-37966df93dce.svg',
  signup: 'https://www.figma.com/api/mcp/asset/48658317-d6f3-4eda-9051-2f7b3b90212b.svg',
  age: 'https://www.figma.com/api/mcp/asset/2df2afde-fb5c-4673-9205-cca33dfcaa67.svg',
  source: 'https://www.figma.com/api/mcp/asset/6f978989-7186-4883-9b7b-4849b6db057d.svg',
  years: 'https://www.figma.com/api/mcp/asset/2a7d7204-b4f2-4225-a053-5e796f11d85f.svg',
  profile: 'https://www.figma.com/api/mcp/asset/8c3828e3-2881-48ac-a1fb-e1c72fb0aabe.svg'
} as const;

const renderStatusBar = (): string => `
  <div class="status-bar" aria-hidden="true">
    <div class="status-time">9:41</div>
    <div class="status-icons">
      <img src="${statusBar.cellular}" alt="" />
      <img src="${statusBar.wifi}" alt="" />
      <img src="${statusBar.battery}" alt="" />
    </div>
  </div>
`;

const renderField = (label: string, placeholder = ''): string => `
  <label class="field">
    <span class="field-label">${label}</span>
    <span class="field-box${placeholder ? ' is-placeholder' : ''}">${placeholder}</span>
  </label>
`;

const renderPill = (label: string, extraClass = ''): string => `
  <button class="pill ${extraClass}" type="button">${label}</button>
`;

const screens = [
  `
    <section class="screen is-active">
      ${renderStatusBar()}
      <div class="screen-icon"><img src="${icons.login}" alt="" /></div>
      <h1 class="screen-title">Login</h1>
      <div class="stack top-gap-login">
        ${renderField('account', 'username/email address')}
        ${renderField('password')}
      </div>
      <button class="link-note" data-target="signup" type="button">no account? sign up</button>
      <div class="button-row social-row" aria-hidden="true">
        ${renderPill('gmail', 'social')}
        ${renderPill('outlook', 'social')}
      </div>
      <div class="primary-wrap">
        ${renderPill('Sign in', 'primary')}
      </div>
    </section>
  `,
  `
    <section class="screen">
      ${renderStatusBar()}
      <div class="screen-icon"><img src="${icons.signup}" alt="" /></div>
      <h1 class="screen-title">Sign up</h1>
      <div class="stack top-gap-signup">
        ${renderField('email address')}
        ${renderField('username')}
        ${renderField('password')}
      </div>
      <div class="button-row social-row" aria-hidden="true">
        ${renderPill('gmail', 'social')}
        ${renderPill('outlook', 'social')}
      </div>
      <div class="primary-wrap signup-primary">
        <button class="pill primary" data-target="age" type="button">sign up</button>
      </div>
    </section>
  `,
  `
    <section class="screen">
      ${renderStatusBar()}
      <div class="screen-icon"><img src="${icons.age}" alt="" /></div>
      <h1 class="screen-title">Your age?</h1>
      <div class="age-stack" aria-hidden="true">
        <div class="age-value">19</div>
        <div class="age-value selected">20</div>
        <div class="age-value">21</div>
        <div class="age-value faint">22</div>
      </div>
      <div class="primary-wrap age-primary">
        <button class="pill primary" data-target="source" type="button">next</button>
      </div>
    </section>
  `,
  `
    <section class="screen">
      ${renderStatusBar()}
      <div class="screen-icon"><img src="${icons.source}" alt="" /></div>
      <h1 class="screen-title narrow">Where did you hear the app?</h1>
      <div class="option-stack">
        ${renderPill('friends', 'option')}
        ${renderPill('discord', 'option')}
        ${renderPill('YouTube', 'option')}
        ${renderPill('Advertisement', 'option')}
        ${renderPill('Others', 'option')}
      </div>
    </section>
  `,
  `
    <section class="screen">
      ${renderStatusBar()}
      <div class="screen-icon"><img src="${icons.years}" alt="" /></div>
      <h1 class="screen-title narrow">How long have you been taking photos?</h1>
      <div class="option-stack">
        ${renderPill('I just started', 'option')}
        ${renderPill('A few months', 'option')}
        ${renderPill('A year', 'option')}
        ${renderPill('A few years', 'option')}
        ${renderPill('Many years', 'option')}
      </div>
    </section>
  `,
  `
    <section class="screen">
      ${renderStatusBar()}
      <div class="profile-head">
        <h1 class="screen-title profile-title">basic information</h1>
        <p class="profile-subtitle">Let us know more about you!</p>
      </div>
      <div class="profile-photo"><img src="${icons.profile}" alt="" /></div>
      <div class="profile-photo-label">Profile picture</div>
      <div class="stack profile-fields">
        ${renderField('age')}
        ${renderField('interest')}
        ${renderField('favorite location')}
      </div>
      <button class="link-note final-link" data-target="done" type="button">I will do that later</button>
    </section>
  `
];

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cairn onboarding demo</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #ffffff;
        --text: #111111;
        --field: #e7e7e7;
        --pill: #e4e2e2;
        --shell: #f3f3f3;
        --shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
      }

      * { box-sizing: border-box; }

      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(0, 0, 0, 0.05), transparent 26%),
          radial-gradient(circle at bottom right, rgba(0, 0, 0, 0.06), transparent 28%),
          var(--shell);
        color: var(--text);
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }

      .device {
        width: min(430px, 100vw);
        aspect-ratio: 430 / 932;
        background: var(--bg);
        border-radius: 34px;
        overflow: hidden;
        position: relative;
        box-shadow: var(--shadow);
      }

      .screen {
        position: absolute;
        inset: 0;
        display: none;
        background: var(--bg);
      }

      .screen.is-active { display: block; }

      .status-bar {
        height: 68px;
        padding: 21px 24px 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .status-time {
        width: 50px;
        font-size: 17px;
        font-weight: 600;
        line-height: 22px;
        text-align: center;
      }

      .status-icons {
        display: flex;
        align-items: center;
        gap: 7px;
      }

      .status-icons img { display: block; }

      .screen-icon {
        width: 60px;
        height: 60px;
        margin: 79px auto 0;
      }

      .screen-icon img,
      .profile-photo img {
        display: block;
        width: 100%;
        height: 100%;
      }

      .screen-title {
        margin: 20px auto 0;
        padding: 0 24px;
        max-width: 280px;
        font-size: 24px;
        line-height: 1.15;
        font-weight: 400;
        text-align: center;
        letter-spacing: -0.02em;
      }

      .screen-title.narrow { max-width: 290px; }

      .stack {
        width: min(342px, calc(100% - 48px));
        margin: 30px auto 0;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .top-gap-login { margin-top: 60px; }
      .top-gap-signup { margin-top: 44px; }

      .field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      .field-label {
        font-size: 14px;
        line-height: 1;
      }

      .field-box {
        height: 42px;
        border-radius: 11px;
        background: var(--field);
      }

      .field-box.is-placeholder {
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #b0b0b0;
        font-size: 12px;
      }

      .link-note {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 0;
        background: transparent;
        color: #b5b5b5;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        padding: 0;
      }

      .screen .link-note { bottom: 479px; }
      .screen .final-link { bottom: 48px; }

      .button-row {
        display: flex;
        justify-content: center;
        gap: 25px;
      }

      .social-row {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 337px;
      }

      .pill {
        border: 0;
        border-radius: 999px;
        background: var(--pill);
        color: var(--text);
        font: inherit;
        cursor: pointer;
      }

      .pill.primary {
        width: 173px;
        height: 35px;
        font-size: 14px;
      }

      .pill.social {
        width: 38px;
        height: 38px;
        font-size: 10px;
      }

      .pill.option {
        width: 280px;
        height: 43px;
        font-size: 14px;
      }

      .primary-wrap {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .primary-wrap.signup-primary { top: 647px; }
      .primary-wrap.age-primary { top: 553px; }
      .primary-wrap:not(.signup-primary):not(.age-primary) { top: 595px; }

      .age-stack {
        width: 208px;
        margin: 46px auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .age-value {
        line-height: 1;
        font-size: 28px;
        color: #d8d8d8;
      }

      .age-value.selected {
        font-size: 36px;
        color: #111111;
      }

      .age-value.faint { opacity: 0.35; }

      .option-stack {
        width: 280px;
        margin: 86px auto 0;
        display: flex;
        flex-direction: column;
        gap: 22px;
      }

      .profile-head {
        padding-top: 82px;
        text-align: center;
      }

      .profile-title {
        margin-top: 0;
      }

      .profile-subtitle {
        margin: 4px 0 0;
        font-size: 12px;
        color: #bcbcbc;
      }

      .profile-photo {
        width: 60px;
        height: 60px;
        margin: 41px auto 0;
      }

      .profile-photo-label {
        margin-top: 16px;
        text-align: center;
        font-size: 14px;
      }

      .profile-fields {
        margin-top: 22px;
      }

      @media (max-width: 480px) {
        body {
          padding: 0;
          background: var(--bg);
        }

        .device {
          width: 100vw;
          height: 100vh;
          aspect-ratio: auto;
          border-radius: 0;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="device">
      ${screens.join('')}
    </main>
    <script>
      const screens = Array.from(document.querySelectorAll('.screen'));
      const targetIndex = {
        signup: 1,
        age: 2,
        source: 3,
        years: 4,
        done: 5
      };

      const showScreen = (index) => {
        screens.forEach((screen, screenIndex) => {
          screen.classList.toggle('is-active', screenIndex === index);
        });
      };

      document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
          return;
        }

        const trigger = target.closest('[data-target]');
        if (!trigger) {
          return;
        }

        const nextIndex = targetIndex[trigger.getAttribute('data-target') || ''];
        if (typeof nextIndex === 'number') {
          showScreen(nextIndex);
        }
      });
    </script>
  </body>
</html>`;

export const onboardingRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (_, reply) => reply.type('text/html').send(html));
};