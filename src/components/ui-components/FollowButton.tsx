import { useState } from 'react';
import { Check, Plus, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FollowButton() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (isLoading) return;

        setIsLoading(true);

        // Simulate an API delay
        setTimeout(() => {
            setIsFollowing((prev) => !prev);
            setIsLoading(false);
        }, 800);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            variant={isFollowing ? 'default' : 'outline'}
            className={cn(
                'transition-all duration-300 flex items-center gap-2',
                isFollowing ? 'bg-green-600 hover:bg-green-700 text-white' : ''
            )}
        >
            {isLoading ? (
                <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span className="opacity-70">Loading...</span>
                </>
            ) : isFollowing ? (
                <>
                    <Check className="h-4 w-4" />
                    Following
                </>
            ) : (
                <>
                    <Plus className="h-4 w-4" />
                    Follow
                </>
            )}
        </Button>
    );
}
