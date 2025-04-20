import { notFound } from "next/navigation"
import type { UserData } from "@/lib/userdata.interface"
import type { Metadata } from "next"

import ProfileContent from "@/components/profile-component";
import ProfileAnalytics from "@/components/profile-anayltics";



// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const username = resolvedParams.username;
        const userData = await getUserData(username);

        return {
            title: `${userData.firstName} ${userData.lastName} - Professional Portfolio | Zapfolio`,
            description: userData.headline || `View ${userData.firstName} ${userData.lastName}'s professional portfolio. ${userData.industry || 'Professional'} based in ${userData.location?.address || 'the world'}. Built with Zapfolio.`,
            keywords: [
                userData.firstName || '',
                userData.lastName || '',
                userData.industry || '',
                'portfolio',
                'professional',
                'resume',
                'career',
                ...(userData.skills || []),
                'zapfolio'
            ].filter(Boolean),
            openGraph: {
                title: `${userData.firstName} ${userData.lastName} | Professional Portfolio`,
                description: userData.headline || `Professional portfolio of ${userData.firstName} ${userData.lastName}`,
                images: userData.image ? [userData.image] : ['/zapfolio-og.jpg'],
                type: 'profile',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${userData.firstName} ${userData.lastName} | Professional Portfolio`,
                description: userData.headline || `Professional portfolio of ${userData.firstName} ${userData.lastName}`,
                images: userData.image ? [userData.image] : ['/zapfolio-og.jpg'],
            },
            alternates: {
                canonical: `https://zapfolio.in/${username}`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            title: 'Professional Portfolio | Zapfolio',
            description: 'Create your professional portfolio in two clicks with Zapfolio',
        };
    }
}

async function getUserData(username: string): Promise<UserData> {
    try {
        const response = await fetch(`https://zapfolio.in/api/get-user-data/${username}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}



export default async function CloudThemeProfilePage({ params }: { params: Promise<{ username: string }> }) {
    try {

        const resolvedParams = await params;
        const username = resolvedParams.username;
        const userData = await getUserData(username);
        return (
            <div className={`min-h-screen bg-[#0a0a0a] text-white $`}>
                {/* Schema.org structured data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfilePage",
                            mainEntity: {
                                "@type": "Person",
                                name: `${userData.firstName} ${userData.lastName}`,
                                headline: userData.headline,
                                image: userData.image,
                                jobTitle: userData.headline,
                                worksFor: userData.jobExperience?.[0]?.company?.name,
                                description: userData.summary,
                                knowsLanguage: userData.languages?.map((l) => l.language),
                                knowsAbout: userData.skills,
                                alumniOf: userData.education?.map((e) => e.company?.name),
                                address: {
                                    "@type": "PostalAddress",
                                    addressLocality: userData.location?.address,
                                    addressCountry: userData.location?.countryCode,
                                },
                            },
                            provider: {
                                "@type": "Organization",
                                name: "Zapfolio",
                                description: "Build your professional portfolio in two clicks",
                            },
                        }),
                    }}
                />

                <ProfileContent userData={userData} />


                <ProfileAnalytics username={username} />




            </div>
        )
    } catch (error) {
        console.error("Error rendering user profile:", error)
        notFound()
    }
}

