'use client';

import { useState } from 'react';
import { sileo } from 'sileo';

const inputClass =
  'w-full bg-surface-2 border border-border px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none transition-colors';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const submit = fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    });

    try {
      await sileo.promise(submit, {
        loading: { title: 'sending…', description: 'posting to /api/contact' },
        success: {
          title: 'message sent',
          description: "exit code 0 — I'll get back to you soon.",
        },
        error: {
          title: 'send failed',
          description: 'exit code 1 — please try again.',
        },
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-mono">
      <p className="text-sm text-muted mb-6">
        <span className="text-accent">$</span> ./send-message
      </p>

      <div className="mb-5">
        <label htmlFor="name" className="block text-sm text-muted mb-1.5">
          <span className="text-accent">$</span> name:
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className={inputClass}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm text-muted mb-1.5">
          <span className="text-accent">$</span> email:
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className={inputClass}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm text-muted mb-1.5">
          <span className="text-accent">$</span> message:
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="border border-border px-6 py-2.5 text-sm text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-foreground"
      >
        {status === 'loading' ? (
          <>
            sending<span className="caret ml-2" aria-hidden="true" />
          </>
        ) : (
          '[ send ]'
        )}
      </button>
    </form>
  );
}
