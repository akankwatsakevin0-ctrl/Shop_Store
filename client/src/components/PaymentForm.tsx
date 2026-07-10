// ─── PaymentForm ─────────────────────────────────────────────────────────────
// A checkout form collecting Name, Email, Card Number, Expiry, and CVC.
// Performs basic client-side validation before submitting.
// ──────────────────────────────────────────────────────────────────────────────

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { CreditCard, Lock } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PaymentFormData {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  onCancel: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CARD_RE = /^\d{16}$/;
const EXPIRY_RE = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVC_RE = /^\d{3,4}$/;

function validate(data: PaymentFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  const digits = data.cardNumber.replace(/\s/g, '');
  if (!digits) {
    errors.cardNumber = 'Card number is required';
  } else if (!CARD_RE.test(digits)) {
    errors.cardNumber = 'Enter a valid 16-digit card number';
  }

  if (!data.expiry.trim()) {
    errors.expiry = 'Expiry is required';
  } else if (!EXPIRY_RE.test(data.expiry.trim())) {
    errors.expiry = 'Use MM/YY format (e.g. 12/28)';
  }

  if (!data.cvc.trim()) {
    errors.cvc = 'CVC is required';
  } else if (!CVC_RE.test(data.cvc.trim())) {
    errors.cvc = 'Enter a valid 3-digit CVC';
  }

  return errors;
}

/**
 * Format card number input as "XXXX XXXX XXXX XXXX" for readability.
 */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * Format expiry input as "MM/YY" automatically.
 */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PaymentForm({ onSubmit, onCancel }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function handleChange(
    field: keyof PaymentFormData,
    raw: string,
  ): void {
    let value = raw;

    switch (field) {
      case 'cardNumber':
        value = formatCardNumber(raw);
        break;
      case 'expiry':
        value = formatExpiry(raw);
        break;
      default:
        break;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear the error for this field once the user starts fixing it
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleBlur(field: keyof PaymentFormData): void {
    setTouched((prev) => new Set(prev).add(field));
    // Validate single field on blur
    const fieldErrors = validate(formData);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    // Mark all fields as touched
    const allFields: (keyof PaymentFormData)[] = [
      'name',
      'email',
      'cardNumber',
      'expiry',
      'cvc',
    ];
    setTouched(new Set(allFields));

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
        <CreditCard className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
      </div>

      {/* ── Name ──────────────────────────────────────────────────────────── */}
      <Field label="Full Name" error={touched.has('name') ? errors.name : undefined}>
        <input
          type="text"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('name', e.target.value)
          }
          onBlur={() => handleBlur('name')}
          className={inputClass(!!errors.name && touched.has('name'))}
          autoComplete="name"
        />
      </Field>

      {/* ── Email ─────────────────────────────────────────────────────────── */}
      <Field label="Email Address" error={touched.has('email') ? errors.email : undefined}>
        <input
          type="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('email', e.target.value)
          }
          onBlur={() => handleBlur('email')}
          className={inputClass(!!errors.email && touched.has('email'))}
          autoComplete="email"
        />
      </Field>

      {/* ── Card Number ───────────────────────────────────────────────────── */}
      <Field
        label="Card Number"
        error={touched.has('cardNumber') ? errors.cardNumber : undefined}
      >
        <input
          type="text"
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          value={formData.cardNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('cardNumber', e.target.value)
          }
          onBlur={() => handleBlur('cardNumber')}
          className={inputClass(!!errors.cardNumber && touched.has('cardNumber'))}
          autoComplete="cc-number"
          maxLength={19}
        />
      </Field>

      {/* ── Expiry & CVC (side by side) ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Expiry"
          error={touched.has('expiry') ? errors.expiry : undefined}
        >
          <input
            type="text"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('expiry', e.target.value)
            }
            onBlur={() => handleBlur('expiry')}
            className={inputClass(!!errors.expiry && touched.has('expiry'))}
            autoComplete="cc-exp"
            maxLength={5}
          />
        </Field>

        <Field
          label="CVC"
          error={touched.has('cvc') ? errors.cvc : undefined}
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="123"
            value={formData.cvc}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('cvc', e.target.value)
            }
            onBlur={() => handleBlur('cvc')}
            className={inputClass(!!errors.cvc && touched.has('cvc'))}
            autoComplete="cc-csc"
            maxLength={4}
          />
        </Field>
      </div>

      {/* ── Security notice ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Lock className="h-3.5 w-3.5" />
        <span>Your payment info is processed securely. This is a mock demo.</span>
      </div>

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary px-6 py-2.5 text-sm"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}

// ─── Reusable Field Wrapper ──────────────────────────────────────────────────

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </label>
  );
}

// ─── Input class helper ──────────────────────────────────────────────────────

function inputClass(hasError: boolean | undefined): string {
  return `block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-brand-500 focus:ring-brand-500'
  }`;
}
