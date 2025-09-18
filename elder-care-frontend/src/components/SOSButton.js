export default function SOSButton({ onClick, sent }) {
  const triggerSOS = () => {
    if (onClick) onClick();
  };

  return (
    <button
      onClick={triggerSOS}
      className="bg-red-600 text-white px-6 py-3 rounded-full text-xl disabled:opacity-60"
      disabled={sent}
      title={sent ? "SOS already sent" : "Send SOS"}
    >
      {sent ? "✅ SOS Sent" : "🚨 SOS"}
    </button>
  );
}
