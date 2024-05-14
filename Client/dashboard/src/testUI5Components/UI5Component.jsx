import '@ui5/webcomponents/dist/Button';
import '@ui5/webcomponents-fiori/dist/ShellBar';

const UI5Component = () => {
  return (
    <div>
      <ui5-shellbar
        primary-title="UI5 Integration"
        secondary-title="React Project"
      ></ui5-shellbar>
      <div style={{ padding: '1rem' }}>
        <ui5-button design="Emphasized">Click Me</ui5-button>
      </div>
    </div>
  );
};

export default UI5Component;