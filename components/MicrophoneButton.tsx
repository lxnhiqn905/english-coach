"use client";

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { button: "h-12 w-12", icon: "h-5 w-5" },
  md: { button: "h-16 w-16", icon: "h-7 w-7" },
  lg: { button: "h-24 w-24", icon: "h-10 w-10" },
};

export default function MicrophoneButton({
  isListening,
  onClick,
  disabled = false,
  size = "lg",
}: MicrophoneButtonProps) {
  const { button, icon } = sizeMap[size];

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring */}
      {isListening && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 animate-ping" />
          <span
            className="absolute rounded-full bg-red-500/10 border border-red-500/30"
            style={{
              width: "calc(100% + 24px)",
              height: "calc(100% + 24px)",
              animation: "pulse-ring 2s ease-in-out infinite",
            }}
          />
        </>
      )}

      {/* Main button */}
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={isListening ? "Stop listening" : "Start listening"}
        className={`
          relative z-10 ${button} rounded-full
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-4
          ${
            isListening
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50 focus:ring-red-500/40 animate-pulse-ring"
              : "bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 shadow-lg shadow-purple-500/30 focus:ring-purple-500/40"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
        `}
      >
        {isListening ? (
          // Stop icon when listening
          <svg
            className={`${icon} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          // Microphone icon when idle
          <svg
            className={`${icon} text-white`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
