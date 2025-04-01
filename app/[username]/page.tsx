import { notFound } from "next/navigation"
import Image from "next/image"
import type { UserData } from "@/lib/userdata.interface"
import { GraduationCap, Languages, MapPin, } from "lucide-react"
import { Metadata } from "next"
import { hackerMedium } from "@/fonts/font"

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
                canonical: `https://zapfolio.vercel.app/${username}`,
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
        const response = await fetch(`https://zapfolio-app.vercel.app/api/get-user-data/${username}`, {
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

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
    try {
        const resolvedParams = await params;
        const username = resolvedParams.username;
        const userData = await getUserData(username)
        const hasJobExperience = userData.jobExperience && userData.jobExperience.length > 0;
        const hasEducation = userData.education && userData.education.length > 0;
        const hasSkills = userData.skills && userData.skills.length > 0;
        const hasLanguages = userData.languages && userData.languages.length > 0;



        return (
            <div className={`min-h-screen bg-[#EFEBE5] text-black ${hackerMedium.className}`}
                style={{
                    backgroundImage: "url('/bg/10.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                {/* Main content container */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    {/* Hero Section */}
                    <section className="py-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
                            <div className="md:w-2/3 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {`Hi, I'm ${userData.firstName} ${userData.lastName}`}
                                    <span className="ml-2 inline-block">👻</span>
                                </h1>

                                <p className="text-xl mb-6">{userData.headline || `${userData.industry || ''} professional`}</p>

                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {userData.location?.address && (
                                        <div className="flex items-center text-sm">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {userData.location.address}
                                            {userData.location.countryCode && `, ${userData.location.countryCode}`}
                                        </div>
                                    )}



                                    {userData.industry && (
                                        <div className="text-sm">
                                            <span className="underline">{userData.industry}</span>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="">
                                <div className="w-32 h-32 md:w-44 md:h-44 border border-black overflow-hidden rounded-full mx-auto md:mx-0 md:ml-auto">
                                    {userData.image ? (
                                        <Image
                                            src={userData.image}
                                            alt={`${userData.firstName} ${userData.lastName}`}
                                            width={160}
                                            height={160}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                                            <span className="text-3xl font-bold">
                                                {userData.firstName?.charAt(0) || ""}
                                                {userData.lastName?.charAt(0) || ""}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>


                        </div>
                    </section>

                    {/* About Section */}
                    <section id="about" className="py-12">
                        <h2 className="text-3xl font-bold mb-6">About</h2>

                        <div className="max-w-3xl">
                            {userData.summary ? (
                                <p>{userData.summary}</p>
                            ) : (
                                <p>
                                    {`I'm a ${userData.industry || 'professional'} passionate about building impactful products 
                                    that leverage technology to make a difference. I often share my work to contribute to 
                                    the community. In addition to my development work, I'm always exploring new ideas, 
                                    particularly in areas like machine learning and robotics.`}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Career Path Section */}
                    {hasJobExperience && (
                        <section id="career" className="py-12">
                            <h2 className="text-3xl font-bold mb-6">Career</h2>

                            <div className="max-w-3xl">
                                <p className="mb-6">{`  Get to know how I started my career `}
                                </p>

                                {userData.jobExperience && userData.jobExperience.map((job, index) => (
                                    <div key={index} className="mb-8">
                                        <div className="flex flex-col gap-3 border border-black p-5 rounded-xl">
                                            <div>
                                                <h3 className="text-xl font-semibold">{job.company?.name}</h3>
                                                {job.employmentType && <p className="text-sm">{job.employmentType}</p>}
                                            </div>

                                            <div>
                                                {job.positions && job.positions.map((position, posIndex) => (
                                                    <div key={posIndex} className={posIndex > 0 ? "mt-4" : ""}>
                                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                                            <h4 className="text-lg font-medium">{position.function}</h4>
                                                            {position.tenure && (
                                                                <div className="text-sm whitespace-nowrap">
                                                                    {position.tenure.start?.month && position.tenure.start?.year
                                                                        ? `${position.tenure.start.month}/${position.tenure.start.year}`
                                                                        : ""}{" "}
                                                                    -
                                                                    {position.tenure.end?.month && position.tenure.end?.year
                                                                        ? ` ${position.tenure.end.month}/${position.tenure.end.year}`
                                                                        : " Present"}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {position.location && (
                                                            <p className="text-sm mt-1 flex items-center">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                {position.location}
                                                            </p>
                                                        )}

                                                        {position.description && (
                                                            <p className="mt-2">{position.description}</p>
                                                        )}

                                                        {position.skills && position.skills.length > 0 && (
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {position.skills.map((skill, skillIndex) => (
                                                                    <span key={skillIndex} className="border border-black px-3 py-1 rounded-full text-sm">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {hasEducation && (
                        <section id="education" className="py-12">
                            <h2 className="text-3xl font-bold mb-6">Education</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.education && userData.education.map((edu, index) => (
                                    <div key={index} className="border border-black rounded-xl p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-black">
                                                {edu.company?.imageUrl ? (
                                                    <Image
                                                        src={edu.company.imageUrl}
                                                        alt={edu.company.name || ""}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <GraduationCap className="w-6 h-6" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{edu.company?.name}</h3>
                                                {edu.subject && <p className="mt-1">{edu.subject}</p>}
                                                {edu.tenure && (
                                                    <p className="text-sm mt-2">
                                                        {edu.tenure.start?.year ? edu.tenure.start.year : ""}
                                                        {(edu.tenure.start?.year || edu.tenure.end?.year) && " - "}
                                                        {edu.tenure.end?.year ? edu.tenure.end.year : edu.tenure.start?.year ? "Present" : ""}
                                                    </p>
                                                )}
                                                {edu.courseDescription && <p className="text-sm mt-3">{edu.courseDescription}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills and Languages Section */}
                    {(hasSkills || hasLanguages) && (
                        <section id="skills" className="py-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Skills */}
                                {hasSkills && (
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6">Skills</h2>

                                        <div className="flex flex-wrap gap-3">
                                            {userData.skills && userData.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-colors"
                                                >
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {hasLanguages && (
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6">Languages</h2>

                                        <div className="space-y-4">
                                            {userData.languages && userData.languages.map((lang, index) => (
                                                <div key={index} className="border border-black rounded-xl p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <Languages className="w-5 h-5 mr-2" />
                                                            <span className="font-medium">{lang.language}</span>
                                                        </div>
                                                        {lang.proficiency && <span className="text-sm">{lang.proficiency}</span>}
                                                    </div>

                                                    {lang.proficiency && (
                                                        <div className="w-full bg-[#EFEBE5] border border-black rounded-full h-2 mt-2">
                                                            <div
                                                                className="bg-black h-2 rounded-full"
                                                                style={{
                                                                    width:
                                                                        lang.proficiency === "Native"
                                                                            ? "100%"
                                                                            : lang.proficiency === "Fluent"
                                                                                ? "90%"
                                                                                : lang.proficiency === "Professional"
                                                                                    ? "75%"
                                                                                    : lang.proficiency === "Intermediate"
                                                                                        ? "50%"
                                                                                        : "25%",
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}



                    {/* Navigation - Floating */}
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="backdrop-blur-md bg-white/80 border border-black rounded-full px-6 py-3 flex space-x-6">
                            <a href="#about" className="hover:underline">About</a>
                            {hasJobExperience && <a href="#career" className="hover:underline">Career</a>}
                            {hasEducation && <a href="#education" className="hover:underline">Education</a>}
                            {(hasSkills || hasLanguages) && <a href="#skills" className="hover:underline">Skills</a>}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 mt-12 ">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm">
                                    © {new Date().getFullYear()} {userData.firstName} {userData.lastName}
                                </span>
                            </div>

                            <div>
                                <a href="https://zapfolio.in" className="text-sm hover:underline">
                                    Build Your Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Schema.org structured data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfilePage",
                            "mainEntity": {
                                "@type": "Person",
                                "name": `${userData.firstName} ${userData.lastName}`,
                                "headline": userData.headline,
                                "image": userData.image,
                                "jobTitle": userData.headline,
                                "worksFor": userData.jobExperience?.[0]?.company?.name,
                                "description": userData.summary,
                                "knowsLanguage": userData.languages?.map(l => l.language),
                                "knowsAbout": userData.skills,
                                "alumniOf": userData.education?.map(e => e.company?.name),
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": userData.location?.address,
                                    "addressCountry": userData.location?.countryCode
                                }
                            },
                            "provider": {
                                "@type": "Organization",
                                "name": "Zapfolio",
                                "description": "Build your professional portfolio in two clicks"
                            }
                        })
                    }}
                />
            </div>
        )
    } catch (error) {
        console.error("Error rendering user profile:", error)
        notFound()
    }
}