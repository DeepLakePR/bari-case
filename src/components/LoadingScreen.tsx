"use client";

type LoadingScreenProps = {
    label?: string;
};

export default function LoadingScreen({ label = "Carregando" }: LoadingScreenProps) {
    return (
        <div className="loading-screen" role="status" aria-live="polite">
            <div className="loading-spinner" />
            <p className="loading-label">{label}...</p>
        </div>
    );
}
