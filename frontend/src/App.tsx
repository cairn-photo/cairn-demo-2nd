import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';

type Step = 'login' | 'signup' | 'age' | 'source' | 'years' | 'profile';

type FieldState = {
  loginAccount: string;
  loginPassword: string;
  signupEmail: string;
  signupUsername: string;
  signupPassword: string;
};

const screenAssets = {
  login: {
    statusTop: '-3px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/a9941e1c-a3a5-432f-863e-fb9a6099d4ec.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/10c0dceb-0371-4d0b-b153-6265778616ba.svg',
      battery: 'https://www.figma.com/api/mcp/asset/7d68f4d3-c0a3-4ab2-9f3a-c6a08e9a0770.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/b56d9a6e-afcd-446b-9503-37966df93dce.svg'
  },
  signup: {
    statusTop: '7px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/6a927903-dfea-4df5-a6d2-8cb0aa158a75.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/84b1fb95-f04e-4b17-b44f-dbf918a35a2f.svg',
      battery: 'https://www.figma.com/api/mcp/asset/ea33a6f1-9b55-49a3-acf5-79c2dbb90307.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/48658317-d6f3-4eda-9051-2f7b3b90212b.svg'
  },
  age: {
    statusTop: '7px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/229b1fa9-1450-436e-96d1-d4606eb6194b.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/82fcc227-5ea2-4f36-b393-4d8e0354eae5.svg',
      battery: 'https://www.figma.com/api/mcp/asset/416500ff-27bc-4608-85b6-ac5a18c5406b.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/2df2afde-fb5c-4673-9205-cca33dfcaa67.svg'
  },
  source: {
    statusTop: '7px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/7ed5f111-daa7-434c-8015-8d7567c864f5.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/eda88d1a-75f3-46f9-842a-ded890d74097.svg',
      battery: 'https://www.figma.com/api/mcp/asset/202b7f54-2324-4b07-8717-83f3dc57a1b9.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/6f978989-7186-4883-9b7b-4849b6db057d.svg'
  },
  years: {
    statusTop: '7px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/e9c9c2bd-d9fc-4ba8-a919-ea97db49487c.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/66741f05-5703-4972-9d74-891ec8978225.svg',
      battery: 'https://www.figma.com/api/mcp/asset/5069e2a3-2977-4dd4-b5d7-af2c94879858.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/2a7d7204-b4f2-4225-a053-5e796f11d85f.svg'
  },
  profile: {
    statusTop: '7px',
    status: {
      cellular: 'https://www.figma.com/api/mcp/asset/7f2267b7-b896-488d-9623-262bed396b01.svg',
      wifi: 'https://www.figma.com/api/mcp/asset/1fe160ce-c1fa-43c7-b7ea-ca17c93f9159.svg',
      battery: 'https://www.figma.com/api/mcp/asset/2e54dc6f-5749-4f42-ad18-803bf942d3bf.svg'
    },
    logo: 'https://www.figma.com/api/mcp/asset/8c3828e3-2881-48ac-a1fb-e1c72fb0aabe.svg'
  }
} as const;

const ageOptions = Array.from({ length: 31 }, (_, index) => 13 + index);

function App() {
  const [step, setStep] = useState<Step>('login');
  const [fields, setFields] = useState<FieldState>({
    loginAccount: '',
    loginPassword: '',
    signupEmail: '',
    signupUsername: '',
    signupPassword: ''
  });

  return (
    <main className="phone-shell">
      {step === 'login' ? <LoginScreen fields={fields} setFields={setFields} onNext={() => setStep('signup')} /> : null}
      {step === 'signup' ? <SignupScreen fields={fields} setFields={setFields} onBack={() => setStep('login')} onNext={() => setStep('age')} /> : null}
      {step === 'age' ? <AgeScreen onNext={() => setStep('source')} /> : null}
      {step === 'source' ? (
        <ChoiceScreen title="Where did you hear the app?" logo={screenAssets.source.logo} status={screenAssets.source.status} onNext={() => setStep('years')} choices={['friends', 'discord', 'YouTube', 'Advertisement', 'Others']} />
      ) : null}
      {step === 'years' ? (
        <ChoiceScreen title="How long have you been taking photos?" logo={screenAssets.years.logo} status={screenAssets.years.status} onNext={() => setStep('profile')} choices={['I just started', 'A few months', 'A year', 'A few years', 'Many years']} />
      ) : null}
      {step === 'profile' ? <ProfileScreen onDone={() => setStep('login')} /> : null}
    </main>
  );
}

function StatusBar({ step }: { step: keyof typeof screenAssets }) {
  const assets = screenAssets[step];

  return (
    <div className="status-bar" style={{ top: assets.statusTop }} aria-hidden="true">
      <div className="status-time">9:41</div>
      <div className="status-levels">
        <img src={assets.status.cellular} alt="" />
        <img src={assets.status.wifi} alt="" />
        <img src={assets.status.battery} alt="" />
      </div>
    </div>
  );
}

function LoginScreen({ fields, setFields, onNext }: { fields: FieldState; setFields: Dispatch<SetStateAction<FieldState>>; onNext: () => void }) {
  return (
    <section className="screen">
      <StatusBar step="login" />
      <img className="screen-logo login-logo" src={screenAssets.login.logo} alt="" />
      <h1 className="screen-title login-title">Login</h1>
      <div className="field-stack login-fields">
        <label>
          <span>account</span>
          <input className="field-input" value={fields.loginAccount} onChange={(event) => setFields((current) => ({ ...current, loginAccount: event.target.value }))} placeholder="username/email address" />
        </label>
        <label>
          <span>password</span>
          <input className="field-input" value={fields.loginPassword} onChange={(event) => setFields((current) => ({ ...current, loginPassword: event.target.value }))} placeholder="" type="password" />
        </label>
      </div>
      <div className="social-row login-social">
        <button className="social-pill social-pill-google" type="button">
          <span className="social-icon social-icon-google" aria-hidden="true">G</span>
          <span className="social-label">gmail</span>
        </button>
        <button className="social-pill social-pill-facebook" type="button">
          <span className="social-icon social-icon-facebook" aria-hidden="true">f</span>
          <span className="social-label">outlook</span>
        </button>
      </div>
      <button className="primary-pill login-button" type="button" onClick={onNext}>Sign in</button>
      <button className="bottom-link login-link" type="button" onClick={onNext}>no account? sign up</button>
    </section>
  );
}

function SignupScreen({ fields, setFields, onBack, onNext }: { fields: FieldState; setFields: Dispatch<SetStateAction<FieldState>>; onBack: () => void; onNext: () => void }) {
  return (
    <section className="screen">
      <StatusBar step="signup" />
      <img className="screen-logo signup-logo" src={screenAssets.signup.logo} alt="" />
      <h1 className="screen-title login-title">Sign up</h1>
      <div className="field-stack signup-fields">
        <label>
          <span>email address</span>
          <input className="field-input" value={fields.signupEmail} onChange={(event) => setFields((current) => ({ ...current, signupEmail: event.target.value }))} placeholder="name@example.com" />
        </label>
        <label>
          <span>username</span>
          <input className="field-input" value={fields.signupUsername} onChange={(event) => setFields((current) => ({ ...current, signupUsername: event.target.value }))} placeholder="yourname" />
        </label>
        <label>
          <span>password</span>
          <input className="field-input" value={fields.signupPassword} onChange={(event) => setFields((current) => ({ ...current, signupPassword: event.target.value }))} placeholder="create a password" type="password" />
        </label>
      </div>
      <div className="social-row signup-social">
        <button className="social-pill social-pill-google" type="button">
          <span className="social-icon social-icon-google" aria-hidden="true">G</span>
          <span className="social-label">gmail</span>
        </button>
        <button className="social-pill social-pill-facebook" type="button">
          <span className="social-icon social-icon-facebook" aria-hidden="true">f</span>
          <span className="social-label">outlook</span>
        </button>
      </div>
      <button className="primary-pill signup-button" type="button" onClick={onNext}>sign up</button>
      <button className="bottom-link signup-link" type="button" onClick={onBack}>already have an account? login</button>
      <button className="bottom-link next-link" type="button" onClick={onNext}>next</button>
    </section>
  );
}

function AgeScreen({ onNext }: { onNext: () => void }) {
  const ageWheelRef = useRef<HTMLDivElement | null>(null);
  const [selectedAge, setSelectedAge] = useState(20);

  useEffect(() => {
    const node = ageWheelRef.current;

    if (!node) {
      return;
    }

    const selectedIndex = ageOptions.indexOf(selectedAge);
    node.scrollTop = selectedIndex * 48;
  }, [ageOptions, selectedAge]);

  function handleAgeScroll() {
    const node = ageWheelRef.current;

    if (!node) {
      return;
    }

    const selectedIndex = Math.max(0, Math.min(ageOptions.length - 1, Math.round(node.scrollTop / 48)));
    const nextAge = ageOptions[selectedIndex];

    setSelectedAge((currentAge) => (currentAge === nextAge ? currentAge : nextAge));
  }

  return (
    <section className="screen">
      <StatusBar step="age" />
      <img className="screen-logo age-logo" src={screenAssets.age.logo} alt="" />
      <h1 className="screen-title age-title">Your age?</h1>
      <div className="age-wheel" ref={ageWheelRef} onScroll={handleAgeScroll}>
        <div className="age-wheel-spacer" aria-hidden="true" />
        {ageOptions.map((age) => (
          <div key={age} className={`age-wheel-item${age === selectedAge ? ' is-selected' : ''}`}>
            {age}
          </div>
        ))}
        <div className="age-wheel-spacer" aria-hidden="true" />
      </div>
      <div className="age-wheel-frame" aria-hidden="true" />
      <div className="age-gradient-bottom" />
      <div className="age-gradient-top" />
      <button className="primary-pill age-button" type="button" onClick={onNext}>next</button>
    </section>
  );
}

function ChoiceScreen({ title, logo, status, onNext, choices }: { title: string; logo: string; status: { cellular: string; wifi: string; battery: string }; onNext: () => void; choices: string[] }) {
  return (
    <section className="screen">
      <div className="status-bar" style={{ top: '7px' }} aria-hidden="true">
        <div className="status-time">9:41</div>
        <div className="status-levels">
          <img src={status.cellular} alt="" />
          <img src={status.wifi} alt="" />
          <img src={status.battery} alt="" />
        </div>
      </div>
      <img className="screen-logo choice-logo" src={logo} alt="" />
      <h1 className="screen-title choice-title">{title}</h1>
      <div className="option-stack">
        {choices.map((choice) => (
          <button key={choice} className="option-pill" type="button" onClick={onNext}>
            {choice}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProfileScreen({ onDone }: { onDone: () => void }) {
  return (
    <section className="screen">
      <StatusBar step="profile" />
      <p className="profile-heading">basic information</p>
      <p className="profile-subheading">Let us know more about you!</p>
      <img className="profile-picture" src={screenAssets.profile.logo} alt="" />
      <p className="profile-picture-label">Profile picture</p>
      <div className="field-stack profile-fields">
        <label>
          <span>age</span>
          <input className="field-input" placeholder="" />
        </label>
        <label>
          <span>interest</span>
          <input className="field-input" placeholder="" />
        </label>
        <label>
          <span>favorite location</span>
          <input className="field-input" placeholder="" />
        </label>
      </div>
      <button className="bottom-link profile-link" type="button" onClick={onDone}>I will do that later</button>
    </section>
  );
}

export default App;