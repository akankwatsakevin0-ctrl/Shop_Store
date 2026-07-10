// ─── CheckoutModal ───────────────────────────────────────────────────────────
// Full-screen modal that manages the checkout flow:
//   1. Payment form  →  2. Processing spinner  →  3. Success with order ID
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { CheckCircle, Loader2, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/useCart';
import PaymentForm, { type PaymentFormData } from './PaymentForm';

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckoutStep = 'form' | 'processing' | 'success';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Generate a fake order ID with a random alphanumeric suffix.
 */
function generateOrderId(): string {
  const suffix = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `ORD-${suffix}`;
}

/**
 * Format a price value as USD currency string.
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { total, itemCount, clearCart, closeCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>('form');
  const [orderId, setOrderId] = useState<string>('');
  const processingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Close on Escape key ─────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'processing') onClose();
    },
    [onClose, step],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // ── Reset state when modal opens ────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setOrderId('');
    }
    return () => {
      if (processingTimer.current) {
        clearTimeout(processingTimer.current);
      }
    };
  }, [isOpen]);

  // ── Handle payment form submission ──────────────────────────────────────
  const handleFormSubmit = useCallback(
    (_data: PaymentFormData) => {
      setStep('processing');

      // Simulate 2-second payment processing
      processingTimer.current = setTimeout(() => {
        setOrderId(generateOrderId());
        setStep('success');
      }, 2000);
    },
    [],
  );

  // ── Handle "Continue Shopping" after success ────────────────────────────
  const handleContinue = useCallback(() => {
    clearCart();
    closeCart();
    onClose();
  }, [clearCart, closeCart, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={step !== 'processing' ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative z-10 mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        {/* Close button (hidden during processing) */}
        {step !== 'processing' && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close checkout"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* ── Step 1: Payment Form ────────────────────────────────────────── */}
        {step === 'form' && (
          <PaymentForm onSubmit={handleFormSubmit} onCancel={onClose} />
        )}

        {/* ── Step 2: Processing ──────────────────────────────────────────── */}
        {step === 'processing' && <ProcessingState />}

        {/* ── Step 3: Success ─────────────────────────────────────────────── */}
        {step === 'success' && (
          <SuccessState
            orderId={orderId}
            total={total}
            itemCount={itemCount}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
}

// ─── Processing State ────────────────────────────────────────────────────────

function ProcessingState(): ReactNode {
  return (
    <div className="flex flex-col items-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-brand-600" />
      <p className="mt-6 text-lg font-semibold text-gray-900">
        Processing Payment…
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Please do not close this window.
      </p>
    </div>
  );
}

// ─── Success State ───────────────────────────────────────────────────────────

interface SuccessStateProps {
  orderId: string;
  total: number;
  itemCount: number;
  onContinue: () => void;
}

function SuccessState({
  orderId,
  total,
  itemCount,
  onContinue,
}: SuccessStateProps): ReactNode {
  return (
    <div className="flex flex-col items-center py-6">
      {/* Animated checkmark */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <p className="mt-4 text-xl font-bold text-gray-900">Payment Successful!</p>
      <p className="mt-1 text-sm text-gray-500">
        Thank you for your purchase.
      </p>

      {/* Order details card */}
      <div className="mt-6 w-full rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Order ID</span>
          <span className="font-mono font-semibold text-gray-900">
            {orderId}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-gray-500">Items</span>
          <span className="font-medium text-gray-900">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 text-sm">
          <span className="font-medium text-gray-900">Total Charged</span>
          <span className="text-lg font-bold text-gray-900 tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Continue shopping */}
      <button
        type="button"
        onClick={onContinue}
        className="btn-primary mt-6 w-full gap-2 py-3 text-base"
      >
        <ShoppingBag className="h-5 w-5" />
        Continue Shopping
      </button>
    </div>
  );
}
