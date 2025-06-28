import { Progress } from '@/components/ui/progress'; // Import Shadcn's Progress component
import type { FC } from 'react';

interface LoadingOverlayProps {
    /**
     * Controls the overall visibility of the loading overlay.
     */
    isLoading: boolean;
    /**
     * The current progress percentage (0-100) to display.
     */
    progress: number;
    /**
     * Optional text to display alongside the progress bar.
     */
    loadingText?: string;
    /**
     * Optional background color for the overlay.
     * Defaults to 'bg-black/70 backdrop-blur-sm'.
     */
    overlayBg?: string;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({
    isLoading,
    progress,
    loadingText = "Loading...",
    overlayBg = 'bg-black/70 backdrop-blur-sm'
}) => {
    // Keep the component mounted briefly to allow fade-out transition.
    // Ensure it stays visible if progress is not yet 100 and it's still "loading".
    const isActuallyVisible = isLoading || (progress > 0 && progress < 100);

    if (!isActuallyVisible && !isLoading) {
        return null;
    }

    return (
        <div
            className={`
                fixed inset-0 z-[9999] flex flex-col items-center justify-center
                ${overlayBg}
                transition-opacity duration-300 ease-in-out
                ${isLoading || (progress > 0 && progress < 100) ? 'opacity-100 pointer-events-auto loading-overlay-visible' : 'opacity-0 pointer-events-none'}
            `}
        >
            {/* Only render content if the overlay is considered visible */}
            {(isLoading || (progress > 0 && progress < 100)) && (
                 <>
                    {/* Optional loading text */}
                    {loadingText && (
                        <p className="text-black text-lg md:text-xl font-semibold mb-6 text-center">
                            {loadingText} {Math.min(100, Math.round(progress))}%
                        </p>
                    )}

                    {/* Shadcn Progress Bar */}
                    <div className="w-11/12 max-w-sm">
                        <Progress value={progress} className="w-full h-2 md:h-3" />
                    </div>
                 </>
            )}
        </div>
    );
};

export default LoadingOverlay;