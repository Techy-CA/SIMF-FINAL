interface RazorpayPrefill {
  name?:    string;
  email?:   string;
  contact?: string;
}

interface RazorpayTheme {
  color?: string;
}

interface RazorpayModal {
  ondismiss?:    () => void;
  escape?:       boolean;
  backdropclose?: boolean;
}

interface RazorpayOptions {
  key:          string;
  amount:       number;
  currency:     string;
  name:         string;
  description:  string;
  image?:       string;
  order_id?:    string;
  prefill?:     RazorpayPrefill;
  notes?:       Record<string, string>;
  theme?:       RazorpayTheme;
  handler:      (response: RazorpayPaymentResponse) => void;
  modal?:       RazorpayModal;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id:  string;
  razorpay_order_id?:   string;
  razorpay_signature?:  string;
}

interface RazorpayConstructor {
  new(options: RazorpayOptions): RazorpayInstance;
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}
