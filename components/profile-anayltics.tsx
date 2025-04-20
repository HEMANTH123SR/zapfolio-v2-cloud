'use client';
import { useAptabase } from '@aptabase/react';
import React from 'react';



export default function ProfileAnalytics({ username }: { username: string }) {
    const { trackEvent } = useAptabase();

    // Use React's useEffect to track the page visit when the component mounts
    React.useEffect(() => {
        // Track profile visit with the username
        trackEvent('profile_visit', {
            username: username,
        });
    }, [trackEvent, username]);

    return null; // This component doesn't render anything
}