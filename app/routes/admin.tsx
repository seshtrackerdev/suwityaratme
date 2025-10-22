import type { Route } from "./+types/admin";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Tools — Timothy Suwityarat" },
    { name: "description", content: "Admin tools for generating cover letters and job application materials." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Admin Tools — Timothy Suwityarat" },
    { property: "og:description", content: "Admin tools for generating cover letters and job application materials." },
    { property: "og:type", content: "website" },
  ];
}

export function loader({ request, context }: Route.LoaderArgs) {
  // Check for authentication via cookie instead of URL parameter
  const cookieHeader = request.headers.get("Cookie");
  const isAuthenticated = cookieHeader?.includes("admin_authenticated=true");
  
  return { authenticated: !!isAuthenticated };
}

type LoaderData = {
  authenticated: boolean;
};

// Resume data structure
const resumeData = {
  name: "Timothy Suwityarat",
  title: "Solutions Engineer",
  email: "jobs@suwityarat.com",
  phone: "+1 (401) 218-7310",
  location: "Warwick, RI",
  linkedin: "https://www.linkedin.com/in/timothy-suwityarat-1737002a0/",
  experience: [
    {
      company: "TeamDynamix",
      position: "Solutions Engineer",
      duration: "Feb 2024 – Present",
      highlights: [
        "Work closely with Account Executives, Customer Success Managers, and Sales Representatives to deliver tailored demonstrations across ITSM, PPM, and iPaaS solutions",
        "Participate in discovery calls to understand prospect needs, identify technical fit, and shape demo strategy based on their goals and pain points",
        "Build customized demo environments, workflows, and outlines that reflect real-world scenarios and demonstrate how TeamDynamix can solve prospect-specific challenges",
        "Provide deep product knowledge on the TeamDynamix platform, including intake design, ticketing, automation, and portfolio management"
      ]
    },
    {
      company: "Community College of Rhode Island",
      position: "Senior Info. Tech",
      duration: "Aug 2021 – Feb 2024",
      highlights: [
        "Lead Admin for TeamDynamix: maintained ITSM service, major updates, automation rules; restructured KB and workflows",
        "Key role in DUO Authentication integration across the college",
        "Redesigned/coded IT Help Desk website to improve accessibility and UX",
        "Executed TDX projects: cleaned 600+ KB articles; digitized Banner request forms for efficient administration"
      ]
    }
  ],
  skills: [
    "TeamDynamix (TDX)", "Office 365", "Workflow Automation", "Help Desk", 
    "Active Directory", "SharePoint", "DUO MFA", "Troubleshooting", 
    "Technical Writing", "ITSM", "PPM", "iPaaS"
  ],
  certifications: [
    "Demo2Win! (2024)",
    "MEDDPICC Masterclass (2024)", 
    "HDI Support Center Analyst (2022)",
    "Academic Impressions: Higher Ed Customer Service (2021)"
  ],
  education: "Associate in Science (AS), Computer Science — Community College of Rhode Island"
};

export default function Admin({ loaderData }: Route.ComponentProps) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(loaderData ? (loaderData as LoaderData).authenticated : false);
  const [jobDetails, setJobDetails] = useState({
    company: "",
    position: "",
    jobDescription: "",
    requirements: "",
    whyInterested: "",
    relevantExperience: "",
    customNotes: ""
  });

  const [generatedContent, setGeneratedContent] = useState({
    coverLetter: "",
    emailTemplate: "",
    linkedinMessage: ""
  });

  const [savedApplications, setSavedApplications] = useState<any[]>([]);
  const [showSavedApplications, setShowSavedApplications] = useState(false);
  const [applicationName, setApplicationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [isResettingAnalytics, setIsResettingAnalytics] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setJobDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCoverLetter = () => {
    const { company, position, jobDescription, requirements, whyInterested, relevantExperience } = jobDetails;
    
    const coverLetter = `Dear Hiring Manager,

I'm writing to express my strong interest in the ${position} position at ${company}. With my background in solutions engineering, ITSM, and workflow automation, I'm excited about the opportunity to contribute to your team.

${whyInterested ? `I'm particularly drawn to this role because ${whyInterested.toLowerCase()}.` : ''}

In my current role as Solutions Engineer at TeamDynamix, I work closely with Account Executives and Customer Success Managers to deliver tailored demonstrations across ITSM, PPM, and iPaaS solutions. I participate in discovery calls to understand prospect needs, identify technical fit, and shape demo strategy based on their goals and pain points. This experience has honed my ability to translate complex technical concepts into clear, compelling value propositions.

${relevantExperience ? `Specifically relevant to this position, ${relevantExperience.toLowerCase()}.` : ''}

My technical expertise includes:
• TeamDynamix platform mastery (intake design, ticketing, automation, portfolio management)
• Office 365 and SharePoint administration
• Workflow automation and process optimization
• DUO Authentication implementation and management
• Technical writing and knowledge base management

${jobDescription ? `I understand that this role involves ${jobDescription.toLowerCase()}, and I'm confident that my experience in ${resumeData.experience[0].highlights[0].toLowerCase()} makes me well-suited for this challenge.` : ''}

I would welcome the opportunity to discuss how my skills and experience can contribute to ${company}'s success. Thank you for your consideration.

Best regards,
${resumeData.name}
${resumeData.email}
${resumeData.phone}`;

    setGeneratedContent(prev => ({
      ...prev,
      coverLetter
    }));
  };

  const generateEmailTemplate = () => {
    const { company, position } = jobDetails;
    
    const emailTemplate = `Subject: Application for ${position} Position - ${resumeData.name}

Dear Hiring Manager,

I hope this email finds you well. I'm writing to express my interest in the ${position} position at ${company}.

I'm a Solutions Engineer with extensive experience in ITSM, workflow automation, and technical support. I've attached my resume for your review and would welcome the opportunity to discuss how my skills can contribute to your team.

Key highlights of my experience:
• Solutions Engineer at TeamDynamix (2024-Present)
• Senior IT role at Community College of Rhode Island (2021-2024)
• Expertise in TeamDynamix, Office 365, and workflow automation
• Strong background in technical writing and process optimization

I'm available for a conversation at your convenience and can be reached at ${resumeData.phone} or ${resumeData.email}.

Thank you for your time and consideration.

Best regards,
${resumeData.name}
${resumeData.phone}
${resumeData.email}
LinkedIn: ${resumeData.linkedin}`;

    setGeneratedContent(prev => ({
      ...prev,
      emailTemplate
    }));
  };

  const generateLinkedInMessage = () => {
    const { company, position } = jobDetails;
    
    const linkedinMessage = `Hi there! I noticed the ${position} position at ${company} and I'm very interested in learning more about the role. 

I'm a Solutions Engineer with experience in ITSM, workflow automation, and technical support. I'd love to connect and discuss how my background might be a good fit for your team.

Would you be open to a brief conversation about the position?

Best regards,
Tim`;

    setGeneratedContent(prev => ({
      ...prev,
      linkedinMessage
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const exportCoverLetterToPDF = () => {
    if (!generatedContent.coverLetter) {
      alert("Please generate a cover letter first");
      return;
    }

    const { company, position } = jobDetails;
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Create a new window with the cover letter formatted for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to export the PDF");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${company || 'Application'}</title>
          <meta name="robots" content="noindex, nofollow">
          <style>
            @media print {
              @page {
                margin: 0.5in;
                size: letter;
              }
              body {
                font-family: 'Times New Roman', serif;
                font-size: 10pt;
                line-height: 1.2;
                color: #000;
                max-width: none;
                margin: 0;
                padding: 0;
              }
            }
            body {
              font-family: 'Times New Roman', serif;
              font-size: 10pt;
              line-height: 1.2;
              color: #000;
              max-width: 7.5in;
              margin: 0 auto;
              padding: 0.5in;
            }
            .header {
              margin-bottom: 0.75em;
            }
            .name {
              font-size: 12pt;
              font-weight: bold;
              margin-bottom: 0.2em;
            }
            .contact-info {
              font-size: 8pt;
              margin-bottom: 0.3em;
            }
            .date {
              margin-bottom: 0.5em;
            }
            .subject {
              font-weight: bold;
              margin-bottom: 0.5em;
            }
            .content {
              white-space: pre-line;
              font-size: 10pt;
              line-height: 1.2;
            }
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #dc2626;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
              z-index: 1000;
            }
            .print-button:hover {
              background: #b91c1c;
            }
            @media print {
              .print-button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print()">Print / Save as PDF</button>
          
          <div class="header">
            <div class="name">${resumeData.name}</div>
            <div class="contact-info">
              ${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
            </div>
            <div class="date">${currentDate}</div>
          </div>

          ${position ? `<div class="subject">Re: Application for ${position} Position</div>` : ''}

          <div class="content">${generatedContent.coverLetter}</div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-focus the print dialog after a short delay
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  const saveApplication = async () => {
    if (!applicationName.trim()) {
      alert("Please enter a name for this application");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDetails,
          generatedContent,
          applicationName: applicationName.trim()
        }),
      });

      if (response.ok) {
        alert("Application saved successfully!");
        setApplicationName("");
        loadSavedApplications();
      } else {
        const error = await response.json() as { error: string };
        alert(`Failed to save application: ${error.error}`);
      }
    } catch (error) {
      alert("Error saving application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      if (response.ok) {
        const data = await response.json() as { applications: any[] };
        setSavedApplications(data.applications);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  const loadAnalyticsData = async () => {
    setIsLoadingAnalytics(true);
    try {
      const response = await fetch('/api/analytics/summary', {
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json() as { data: any };
        setAnalyticsData(data.data);
      } else {
        console.error('Failed to fetch analytics data');
        setAnalyticsData(null);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      setAnalyticsData(null);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const resetAnalyticsData = async () => {
    if (!confirm('Are you sure you want to reset all analytics data? This action cannot be undone.')) {
      return;
    }

    setIsResettingAnalytics(true);
    try {
      const response = await fetch('/api/analytics/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });
      
      if (response.ok) {
        setAnalyticsData(null);
        alert('Analytics data has been reset successfully!');
      } else {
        const errorData = await response.json() as { error: string };
        alert(`Failed to reset analytics: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error resetting analytics:', error);
      alert('Failed to reset analytics data');
    } finally {
      setIsResettingAnalytics(false);
    }
  };

  const loadApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`);
      if (response.ok) {
        const data = await response.json() as { application: any };
        const app = data.application;
        setJobDetails(app.jobDetails);
        setGeneratedContent(app.generatedContent);
        setApplicationName(app.name);
        setShowSavedApplications(false);
      } else {
        alert("Failed to load application");
      }
    } catch (error) {
      alert("Error loading application. Please try again.");
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Application deleted successfully!");
        loadSavedApplications();
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      alert("Error deleting application. Please try again.");
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate PIN by making a request to the server
    try {
      const response = await fetch("/api/admin/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        // Clear the PIN from the URL if it exists
        const url = new URL(window.location.href);
        url.searchParams.delete("pin");
        window.history.replaceState({}, "", url.toString());
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" })) as { error: string };
        console.error("Authentication error:", errorData);
        
        if (response.status === 500 && errorData.error === "Admin PIN not configured") {
          alert("Admin PIN is not configured on the server. Please contact the administrator.");
        } else {
          alert(`Authentication failed: ${errorData.error || "Invalid PIN"}`);
        }
        setPin("");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
      setPin("");
    }
  };

  // Show PIN entry form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-neutral-900 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl border border-black bg-white p-8 shadow-[0_6px_0_0_#000] text-center">
            <div className="mb-6">
              <h1 className="text-2xl font-black tracking-tight mb-2">Admin Access</h1>
              <p className="text-neutral-700">Enter PIN to access admin tools</p>
            </div>
            
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full rounded-xl border border-black px-4 py-3 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Enter PIN"
                  maxLength={4}
                  autoComplete="off"
                />
              </div>
              
              <button
                type="submit"
                className="w-full rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none"
              >
                Access Admin Tools
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-black/10">
              <a
                href="/"
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                ← Back to main site
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#F7F6F2]/80 border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-lg md:text-xl font-black tracking-tight">
            suwityarat<span className="text-black">.me</span> <span className="text-sm font-normal">/admin</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Admin Tools</h1>
          <p className="text-neutral-700 mb-8">Generate cover letters, email templates, and LinkedIn messages for job applications.</p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]">
                <h2 className="text-xl font-extrabold mb-4">Job Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company Name</label>
                    <input
                      type="text"
                      value={jobDetails.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="e.g., Microsoft, Google, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Position Title</label>
                    <input
                      type="text"
                      value={jobDetails.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="e.g., Senior Solutions Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Job Description (Key Points)</label>
                    <textarea
                      value={jobDetails.jobDescription}
                      onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 h-20 resize-none"
                      placeholder="Brief description of the role and key responsibilities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Key Requirements</label>
                    <textarea
                      value={jobDetails.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 h-20 resize-none"
                      placeholder="List key requirements or qualifications..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Why Interested</label>
                    <textarea
                      value={jobDetails.whyInterested}
                      onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 h-20 resize-none"
                      placeholder="What draws you to this company/role specifically?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Relevant Experience</label>
                    <textarea
                      value={jobDetails.relevantExperience}
                      onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 h-20 resize-none"
                      placeholder="Specific experience that matches this role..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Custom Notes</label>
                    <textarea
                      value={jobDetails.customNotes}
                      onChange={(e) => handleInputChange('customNotes', e.target.value)}
                      className="w-full rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 h-20 resize-none"
                      placeholder="Any additional notes or specific points to include..."
                    />
                  </div>
                </div>

                {/* Save Application Section */}
                <div className="mt-6 pt-6 border-t border-black/10">
                  <h3 className="text-lg font-extrabold mb-3">Save Application</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={applicationName}
                      onChange={(e) => setApplicationName(e.target.value)}
                      className="flex-1 rounded-xl border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="Enter a name for this application..."
                    />
                    <button
                      onClick={saveApplication}
                      disabled={isLoading || !applicationName.trim()}
                      className="rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Generated Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Cover Letter */}
              <div className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold">Cover Letter</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={generateCoverLetter}
                      className="rounded-xl border border-black bg-black px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                    >
                      Generate
                    </button>
                    {generatedContent.coverLetter && (
                      <>
                        <button
                          onClick={() => copyToClipboard(generatedContent.coverLetter)}
                          className="rounded-xl border border-black px-3 py-2 text-xs font-semibold shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                        >
                          Copy
                        </button>
                        <button
                          onClick={exportCoverLetterToPDF}
                          className="rounded-xl border border-red-600 bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#dc2626] active:translate-y-[2px] active:shadow-none"
                        >
                          Export PDF
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <textarea
                  value={generatedContent.coverLetter}
                  readOnly
                  className="w-full rounded-xl border border-black/20 px-3 py-2 text-sm bg-neutral-50 h-64 resize-none"
                  placeholder="Generated cover letter will appear here..."
                />
              </div>

              {/* Email Template */}
              <div className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold">Email Template</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={generateEmailTemplate}
                      className="rounded-xl border border-black bg-black px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                    >
                      Generate
                    </button>
                    {generatedContent.emailTemplate && (
                      <button
                        onClick={() => copyToClipboard(generatedContent.emailTemplate)}
                        className="rounded-xl border border-black px-3 py-2 text-xs font-semibold shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={generatedContent.emailTemplate}
                  readOnly
                  className="w-full rounded-xl border border-black/20 px-3 py-2 text-sm bg-neutral-50 h-48 resize-none"
                  placeholder="Generated email template will appear here..."
                />
              </div>

              {/* LinkedIn Message */}
              <div className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold">LinkedIn Message</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={generateLinkedInMessage}
                      className="rounded-xl border border-black bg-black px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                    >
                      Generate
                    </button>
                    {generatedContent.linkedinMessage && (
                      <button
                        onClick={() => copyToClipboard(generatedContent.linkedinMessage)}
                        className="rounded-xl border border-black px-3 py-2 text-xs font-semibold shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={generatedContent.linkedinMessage}
                  readOnly
                  className="w-full rounded-xl border border-black/20 px-3 py-2 text-sm bg-neutral-50 h-32 resize-none"
                  placeholder="Generated LinkedIn message will appear here..."
                />
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mt-8 rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl font-extrabold mb-4">Quick Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <button
                onClick={() => {
                  generateCoverLetter();
                  generateEmailTemplate();
                  generateLinkedInMessage();
                }}
                className="rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none text-center"
              >
                Generate All
              </button>
              <button
                onClick={exportCoverLetterToPDF}
                disabled={!generatedContent.coverLetter}
                className="rounded-xl border border-red-600 bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#dc2626] active:translate-y-[3px] active:shadow-none text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400"
              >
                Export PDF
              </button>
              <button
                onClick={() => setJobDetails({
                  company: "",
                  position: "",
                  jobDescription: "",
                  requirements: "",
                  whyInterested: "",
                  relevantExperience: "",
                  customNotes: ""
                })}
                className="rounded-xl border border-black px-4 py-3 text-sm font-semibold shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none text-center"
              >
                Clear Form
              </button>
              <button
                onClick={() => {
                  setShowSavedApplications(!showSavedApplications);
                  if (!showSavedApplications) {
                    loadSavedApplications();
                  }
                }}
                className="rounded-xl border border-black px-4 py-3 text-sm font-semibold shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none text-center"
              >
                {showSavedApplications ? "Hide Saved" : "View Saved"}
              </button>
              <a
                href="/Timothy_Suwityarat_Resume.pdf"
                download="Timothy_Suwityarat_Resume.pdf"
                className="rounded-xl border border-black px-4 py-3 text-sm font-semibold text-center shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none block"
              >
                Download Resume
              </a>
              <a
                href="/"
                className="rounded-xl border border-black px-4 py-3 text-sm font-semibold text-center shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none block"
              >
                Back to Site
              </a>
            </div>
          </motion.div>

          {/* Saved Applications Panel */}
          {showSavedApplications && (
            <motion.div
              className="mt-8 rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-xl font-extrabold mb-4">Saved Applications</h2>
              {savedApplications.length === 0 ? (
                <p className="text-neutral-600 text-center py-8">No saved applications yet. Create and save your first application above!</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {savedApplications.map((app) => (
                    <div key={app.id} className="rounded-xl border border-black/20 bg-neutral-50 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{app.name}</h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => loadApplication(app.id)}
                            className="rounded-lg border border-black bg-black px-2 py-1 text-xs font-semibold text-white shadow-[0_1px_0_0_#000] active:translate-y-[1px] active:shadow-none"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="rounded-lg border border-red-600 bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-[0_1px_0_0_#dc2626] active:translate-y-[1px] active:shadow-none"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 mb-1">
                        <strong>{app.company}</strong> - {app.position}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Analytics Dashboard */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold">Website Analytics</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadAnalyticsData}
                    disabled={isLoadingAnalytics}
                    className="rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                  >
                    {isLoadingAnalytics ? "Loading..." : "Refresh Data"}
                  </button>
                  <button
                    onClick={resetAnalyticsData}
                    disabled={isResettingAnalytics}
                    className="rounded-xl border border-red-600 bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#dc2626] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                  >
                    {isResettingAnalytics ? "Resetting..." : "Reset Analytics"}
                  </button>
                </div>
              </div>

              {analyticsData ? (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-black/20 bg-neutral-50 p-4 text-center">
                      <div className="text-2xl font-black text-black">{analyticsData.totalPageViews}</div>
                      <div className="text-sm text-neutral-600">Page Views</div>
                    </div>
                    <div className="rounded-xl border border-black/20 bg-neutral-50 p-4 text-center">
                      <div className="text-2xl font-black text-black">{analyticsData.totalDownloads}</div>
                      <div className="text-sm text-neutral-600">Resume Downloads</div>
                    </div>
                    <div className="rounded-xl border border-black/20 bg-neutral-50 p-4 text-center">
                      <div className="text-2xl font-black text-black">{analyticsData.totalContactClicks}</div>
                      <div className="text-sm text-neutral-600">Contact Clicks</div>
                    </div>
                    <div className="rounded-xl border border-black/20 bg-neutral-50 p-4 text-center">
                      <div className="text-2xl font-black text-black">{analyticsData.totalNavigationClicks}</div>
                      <div className="text-sm text-neutral-600">Navigation Clicks</div>
                    </div>
                  </div>

                  {/* Top Pages */}
                  {analyticsData.topPages.length > 0 && (
                    <div>
                      <h3 className="text-lg font-extrabold mb-3">Top Pages</h3>
                      <div className="space-y-2">
                        {analyticsData.topPages.map((page: any, index: number) => (
                          <div key={page.page} className="flex items-center justify-between p-3 rounded-xl border border-black/10 bg-neutral-50">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-neutral-500">#{index + 1}</span>
                              <div>
                                <div className="font-semibold">{page.page === '/' ? 'Home' : page.page}</div>
                              </div>
                            </div>
                            <div className="text-sm font-semibold">{page.count} views</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Activity */}
                  {analyticsData.recentActivity.length > 0 && (
                    <div>
                      <h3 className="text-lg font-extrabold mb-3">Recent Activity</h3>
                      <div className="space-y-2">
                        {analyticsData.recentActivity.map((activity: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-black/10 bg-neutral-50">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                (activity.action && activity.action.includes && activity.action.includes('Download')) ? 'bg-green-100 text-green-800' :
                                (activity.action && activity.action.includes && activity.action.includes('Navigated')) ? 'bg-purple-100 text-purple-800' :
                                (activity.action && activity.action.includes && activity.action.includes('Click')) ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {(activity.action && activity.action.includes && activity.action.includes('Download')) ? 'Download' :
                                 (activity.action && activity.action.includes && activity.action.includes('Navigated')) ? 'Navigation' :
                                 (activity.action && activity.action.includes && activity.action.includes('Click')) ? 'Contact' : 'View'}
                              </span>
                              <div>
                                <div className="font-semibold">{activity.action || 'Unknown Action'}</div>
                                <div className="text-sm text-neutral-600">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-600 mb-4">
                    {isLoadingAnalytics 
                      ? "Loading analytics data..." 
                      : "No analytics data available yet. Visit your website to start collecting data, then click 'Refresh Data' to view metrics."
                    }
                  </p>
                  {!isLoadingAnalytics && (
                    <button
                      onClick={loadAnalyticsData}
                      className="rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                    >
                      Load Analytics Data
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
