import { UserData } from "@/lib/userdata.interface";
import { hackerMedium } from "@/fonts/font"
import { GraduationCap, Languages, MapPin } from "lucide-react"
import Image from "next/image";

interface ProfileContentProps {
    userData: UserData;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
    const hasJobExperience = userData.jobExperience && userData.jobExperience.length > 0;
    const hasEducation = userData.education && userData.education.length > 0;
    const hasSkills = userData.skills && userData.skills.length > 0;
    const hasLanguages = userData.languages && userData.languages.length > 1;

    // Function to convert month number to short month name
    const getShortMonthName = (month: number | undefined): string => {
        if (!month) return "";
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month - 1] || "";
    };

    return <div className={`min-h-screen bg-[#EFEBE5] text-black ${hackerMedium.className}`}
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
                                    src={`/api/proxy-image?url=${encodeURIComponent(userData.image)}`}
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
                        <p className="mb-6">{`Get to know how I started my career`}</p>

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
                                                                ? `${getShortMonthName(Number(position.tenure.start.month))}/${position.tenure.start.year}`
                                                                : ""}{" "}
                                                            -
                                                            {position.tenure.end?.month && position.tenure.end?.year
                                                                ? ` ${getShortMonthName(Number(position.tenure.end.month))}/${position.tenure.end.year}`
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
                                                src={`/api/proxy-image?url=${encodeURIComponent(edu.company.imageUrl)}`}
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {userData.projects && userData.projects.length > 0 && (
                <section id="projects" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Projects</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.projects.map((project, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                {project.imageUrl && (
                                    <div className="mb-4 aspect-video relative rounded-lg overflow-hidden">
                                        <Image
                                            src={`/api/proxy-image?url=${encodeURIComponent(project.imageUrl)}`}
                                            alt={project.title || "Project image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-sm mb-4">{project.description}</p>
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="border border-black px-3 py-1 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                                        className="text-sm underline hover:no-underline">
                                        View Project →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research Papers Section */}
            {userData.researchPapers && userData.researchPapers.length > 0 && (
                <section id="research" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Research Papers</h2>
                    <div className="space-y-6">
                        {userData.researchPapers.map((paper, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                                <p className="text-sm mb-4">{paper.abstract}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {paper.authors && paper.authors.map((author, authorIndex) => (
                                        <span key={authorIndex} className="text-sm">{author}</span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {paper.journal && <span>{paper.journal}</span>}
                                    {paper.publicationDate && (
                                        <span>
                                            {paper.publicationDate.month}/{paper.publicationDate.year}
                                        </span>
                                    )}
                                    {paper.doi && <span>DOI: {paper.doi}</span>}
                                </div>
                                {paper.url && (
                                    <a href={paper.url} target="_blank" rel="noopener noreferrer"
                                        className="text-sm underline hover:no-underline mt-4 inline-block">
                                        Read Paper →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Social Media Section */}
            {userData.socialMedia && (
                <section id="social" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Connect With Me</h2>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(userData.socialMedia).map(([platform, url]) => {
                            if (url && platform !== 'other') {
                                return (
                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                        className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors">
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </a>
                                );
                            }
                            return null;
                        })}
                    </div>
                </section>
            )}

            {/* Freelance Services Section */}
            {userData.freelanceServices && userData.freelanceServices.length > 0 && (
                <section id="services" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Freelance Services</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.freelanceServices.map((service, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    {service.category && (
                                        <span className="border border-black px-3 py-1 rounded-full text-sm">
                                            {service.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm mb-4">{service.description}</p>
                                {service.pricing && (
                                    <div className="mb-4">
                                        <span className="font-medium">
                                            {service.pricing.currency} {service.pricing.amount}
                                        </span>
                                        <span className="text-sm ml-2">({service.pricing.model})</span>
                                    </div>
                                )}
                                {service.availability && (
                                    <div className="mb-4">
                                        <span className="text-sm font-medium">Work Type: </span>
                                        <span className="text-sm">{service.availability}</span>
                                    </div>
                                )}
                                {service.skills && (
                                    <div className="flex flex-wrap gap-2">
                                        {service.skills.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="border border-black px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Clients Section */}
            {userData.clients && userData.clients.length > 0 && (
                <section id="clients" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Clients</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.clients.map((client, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    {client.logoUrl && (
                                        <div className="w-16 h-16 relative">
                                            <Image
                                                src={`/api/proxy-image?url=${encodeURIComponent(client.logoUrl)}`}
                                                alt={client.name || "Client logo"}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold">{client.name}</h3>
                                        {client.industry && <p className="text-sm">{client.industry}</p>}
                                        {client.ongoing === true && (
                                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                Active Client
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm mb-4">{client.workDescription}</p>
                                {client.testimonial && (
                                    <div className="border-t border-black pt-4 mt-4">
                                        <p className="italic text-sm mb-2">&ldquo;{client.testimonial.text}&rdquo;</p>
                                        <p className="text-sm font-medium">{client.testimonial.author}</p>
                                        {client.testimonial.position && (
                                            <p className="text-sm">{client.testimonial.position}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Articles Section */}
            {userData.articles && userData.articles.length > 0 && (
                <section id="articles" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Articles</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.articles.map((article, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                {article.imageUrl && (
                                    <div className="mb-4 aspect-video relative rounded-lg overflow-hidden">
                                        <Image
                                            src={`/api/proxy-image?url=${encodeURIComponent(article.imageUrl)}`}
                                            alt={article.title || "Article image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <p className="text-sm mb-4">{article.summary}</p>
                                {article.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="border border-black px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {article.url && (
                                    <a href={article.url} target="_blank" rel="noopener noreferrer"
                                        className="text-sm underline hover:no-underline">
                                        Read Article →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {userData.gallery && userData.gallery.length > 0 && (
                <section id="gallery" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Gallery</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {userData.gallery.map((item, index) => (
                            <div key={index} className="border border-black rounded-xl overflow-hidden">
                                {item.imageUrl && (
                                    <div className="aspect-square relative">
                                        <Image
                                            src={`/api/proxy-image?url=${encodeURIComponent(item.imageUrl)}`}
                                            alt={item.title || "Gallery image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm mb-4">{item.description}</p>
                                    {item.tags && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="border border-black px-3 py-1 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications Section */}
            {userData.certifications && userData.certifications.length > 0 && (
                <section id="certifications" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Certifications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.certifications.map((cert, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                <div className="flex items-start gap-6">
                                    {cert.credentialUrl && (
                                        <div className="w-32 h-32 relative flex-shrink-0 rounded-md overflow-hidden">
                                            <img
                                                src={`/api/proxy-image?url=${encodeURIComponent(cert.credentialUrl)}`}
                                                alt={cert.name || "Certification"}
                                                className="object-contain w-full h-full rounded-md"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                                        <p className="text-sm mb-2">{cert.issuer}</p>
                                        <div className="text-sm mb-4">
                                            {cert.issueDate && (
                                                <span>
                                                    Issued: {cert.issueDate.month}/{cert.issueDate.year}
                                                </span>
                                            )}
                                            {cert.expiryDate && (
                                                <span className="ml-4">
                                                    Expires: {cert.expiryDate.month}/{cert.expiryDate.year}
                                                </span>
                                            )}
                                        </div>
                                        {cert.credentialUrl && (
                                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                                                className="text-sm underline hover:no-underline">
                                                View Credential →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards Section */}
            {userData.awards && userData.awards.length > 0 && (
                <section id="awards" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {userData.awards.map((award, index) => (
                            <div key={index} className="border border-black rounded-xl p-6">
                                <div className="flex items-start gap-6">
                                    {award.imageUrl && (
                                        <div className="w-32 h-32 relative flex-shrink-0 rounded-md overflow-hidden">
                                            <img
                                                src={`/api/proxy-image?url=${encodeURIComponent(award.imageUrl)}`}
                                                alt={award.title || "Award"}
                                                className="object-contain w-full h-full rounded-md"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                                        <p className="text-sm mb-2">{award.issuer}</p>
                                        {award.date && (
                                            <p className="text-sm mb-4">
                                                {award.date.month}/{award.date.year}
                                            </p>
                                        )}
                                        <p className="text-sm">{award.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {userData.contactInfo && (
                <section id="contact" className="py-12">
                    <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
                    <div className="border border-black rounded-xl p-6 max-w-2xl">
                        <div className="space-y-4">
                            {userData.contactInfo.email && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Email:</span>
                                    <a href={`mailto:${userData.contactInfo.email}`}
                                        className="text-sm underline hover:no-underline">
                                        {userData.contactInfo.email}
                                    </a>
                                </div>
                            )}
                            {userData.contactInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Phone:</span>
                                    <a href={`tel:${userData.contactInfo.phone}`}
                                        className="text-sm underline hover:no-underline">
                                        {userData.contactInfo.phone}
                                    </a>
                                </div>
                            )}
                            {userData.contactInfo.address && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Address:</span>
                                    <span className="text-sm">{userData.contactInfo.address}</span>
                                </div>
                            )}
                            {userData.contactInfo.availabilityHours && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Available Hours:</span>
                                    <span className="text-sm">{userData.contactInfo.availabilityHours}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Navigation - Floating */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="backdrop-blur-md bg-white/80 border border-black rounded-full px-6 py-3 flex space-x-6">
                    <a href="#about" className="hover:underline">About</a>
                    {hasJobExperience && <a href="#career" className="hover:underline">Experience</a>}
                    {hasEducation && <a href="#education" className="hover:underline">Education</a>}
                    {(hasSkills || hasLanguages) && <a href="#skills" className="hover:underline">Skills</a>}
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="py-8 mt-12">
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
    </div>
}

export default ProfileContent;