import React, { useState } from 'react';
import Button from '../Button';
import './ButtonDemo.css';

/**
 * Button Component Demo & Showcase
 * Displays all button variants, sizes, and states
 */
const ButtonDemo = () => {
  const [loadingButtons, setLoadingButtons] = useState({});

  const toggleLoading = (buttonId) => {
    setLoadingButtons((prev) => ({
      ...prev,
      [buttonId]: !prev[buttonId],
    }));

    // Auto-reset after 2 seconds (simulate async operation)
    if (!loadingButtons[buttonId]) {
      setTimeout(() => {
        setLoadingButtons((prev) => ({
          ...prev,
          [buttonId]: false,
        }));
      }, 2000);
    }
  };

  return (
    <div className="button-demo">
      <header className="demo-header">
        <h1>Button Component Library</h1>
        <p>All variants, sizes, and states aligned with The Pillar design system</p>
      </header>

      {/* VARIANT SHOWCASE */}
      <section className="demo-section">
        <h2>Variants</h2>

        {/* Primary */}
        <div className="variant-group">
          <h3>Primary</h3>
          <div className="button-grid">
            <div className="button-showcase">
              <span className="label">Small</span>
              <Button variant="primary" size="sm">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Medium</span>
              <Button variant="primary" size="md">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Large</span>
              <Button variant="primary" size="lg">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Disabled</span>
              <Button variant="primary" size="md" disabled>
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Loading</span>
              <Button
                variant="primary"
                size="md"
                loading={loadingButtons.primary}
                loadingText="Saving..."
                onClick={() => toggleLoading('primary')}
              >
                Click to Load
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary */}
        <div className="variant-group">
          <h3>Secondary</h3>
          <div className="button-grid">
            <div className="button-showcase">
              <span className="label">Small</span>
              <Button variant="secondary" size="sm">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Medium</span>
              <Button variant="secondary" size="md">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Large</span>
              <Button variant="secondary" size="lg">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Disabled</span>
              <Button variant="secondary" size="md" disabled>
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Loading</span>
              <Button
                variant="secondary"
                size="md"
                loading={loadingButtons.secondary}
                loadingText="Processing..."
                onClick={() => toggleLoading('secondary')}
              >
                Click to Load
              </Button>
            </div>
          </div>
        </div>

        {/* Outline */}
        <div className="variant-group">
          <h3>Outline</h3>
          <div className="button-grid">
            <div className="button-showcase">
              <span className="label">Small</span>
              <Button variant="outline" size="sm">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Medium</span>
              <Button variant="outline" size="md">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Large</span>
              <Button variant="outline" size="lg">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Disabled</span>
              <Button variant="outline" size="md" disabled>
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Loading</span>
              <Button
                variant="outline"
                size="md"
                loading={loadingButtons.outline}
                loadingText="Submitting..."
                onClick={() => toggleLoading('outline')}
              >
                Click to Load
              </Button>
            </div>
          </div>
        </div>

        {/* Ghost */}
        <div className="variant-group">
          <h3>Ghost</h3>
          <div className="button-grid">
            <div className="button-showcase">
              <span className="label">Small</span>
              <Button variant="ghost" size="sm">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Medium</span>
              <Button variant="ghost" size="md">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Large</span>
              <Button variant="ghost" size="lg">
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Disabled</span>
              <Button variant="ghost" size="md" disabled>
                Button
              </Button>
            </div>
            <div className="button-showcase">
              <span className="label">Loading</span>
              <Button
                variant="ghost"
                size="md"
                loading={loadingButtons.ghost}
                loadingText="Loading..."
                onClick={() => toggleLoading('ghost')}
              >
                Click to Load
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATE MATRIX */}
      <section className="demo-section">
        <h2>State Matrix</h2>
        <div className="state-matrix">
          <div className="matrix-header">
            <span>Variant</span>
            <span>Normal</span>
            <span>Hover</span>
            <span>Active</span>
            <span>Disabled</span>
            <span>Loading</span>
          </div>

          {['primary', 'secondary', 'outline', 'ghost'].map((variant) => (
            <div key={variant} className="matrix-row">
              <span className="variant-label">{variant}</span>
              <span className="matrix-cell">
                <Button variant={variant} size="sm">
                  Normal
                </Button>
              </span>
              <span className="matrix-cell matrix-hover">
                <Button variant={variant} size="sm">
                  Hover
                </Button>
              </span>
              <span className="matrix-cell matrix-active">
                <Button variant={variant} size="sm">
                  Active
                </Button>
              </span>
              <span className="matrix-cell">
                <Button variant={variant} size="sm" disabled>
                  Disabled
                </Button>
              </span>
              <span className="matrix-cell">
                <Button variant={variant} size="sm" loading>
                  Loading
                </Button>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* REAL-WORLD EXAMPLES */}
      <section className="demo-section">
        <h2>Real-World Examples</h2>

        <div className="example-group">
          <h3>Form Actions</h3>
          <div className="button-row">
            <Button variant="primary">Save Article</Button>
            <Button variant="outline">Discard Draft</Button>
          </div>
        </div>

        <div className="example-group">
          <h3>Navigation & CTA</h3>
          <div className="button-row">
            <Button variant="primary" size="lg">
              Read Full Story
            </Button>
            <Button variant="ghost">Learn More</Button>
          </div>
        </div>

        <div className="example-group">
          <h3>Destructive Actions</h3>
          <div className="button-row">
            <Button variant="secondary">Delete Article</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>

        <div className="example-group">
          <h3>Full Width (Mobile)</h3>
          <div className="button-col">
            <Button variant="primary" fullWidth>
              Subscribe Now
            </Button>
            <Button variant="outline" fullWidth>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* CODE EXAMPLES */}
      <section className="demo-section code-section">
        <h2>Usage Examples</h2>

        <div className="code-example">
          <h3>Basic Usage</h3>
          <pre>
            <code>{`import Button from './components/ui/Button';

// Primary button
<Button variant="primary" size="md">
  Read More
</Button>

// With click handler
<Button 
  variant="primary" 
  onClick={handleClick}
>
  Save
</Button>`}</code>
          </pre>
        </div>

        <div className="code-example">
          <h3>Loading State</h3>
          <pre>
            <code>{`const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  // Your async operation here
  setIsSubmitting(false);
};

<Button 
  variant="primary"
  loading={isSubmitting}
  loadingText="Submitting..."
  onClick={handleSubmit}
>
  Submit Article
</Button>`}</code>
          </pre>
        </div>

        <div className="code-example">
          <h3>All Props</h3>
          <pre>
            <code>{`<Button
  variant="primary"        // primary | secondary | outline | ghost
  size="md"               // sm | md | lg
  disabled={false}        // boolean
  loading={false}         // boolean
  loadingText="Loading..."// string
  fullWidth={false}       // boolean
  type="button"          // button | submit | reset
  onClick={handler}       // function
  className=""           // string for additional classes
>
  Button Text
</Button>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;
