type SubmitButtonProps = {
  children: React.ReactNode;
  pending: boolean;
  pendingText?: string;
};

export function SubmitButton({ children, pending, pendingText = "Please wait…" }: SubmitButtonProps) {
  return (
    <button type="submit" className="button button-lg auth-submit-btn" disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
