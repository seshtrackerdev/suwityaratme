import type { Route } from "./+types/resume-pdf";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Timothy Suwityarat — Resume" },
    { name: "description", content: "Professional resume for Timothy Suwityarat, Technical Support Specialist." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function ResumePDF() {
  return (
    <div className="resume-pdf">
      {/* Header */}
      <div className="header">
        <div className="name-title">
          <h1>Timothy Suwityarat</h1>
          <p className="title">Technical Support Specialist · Troubleshooting · Customer Support</p>
          <div className="contact">
            <span>jobs@suwityarat.com</span> • 
            <span>+1 (401) 218-7310</span> • 
            <span>Warwick, RI</span> • 
            <span>LinkedIn: linkedin.com/in/timothy-suwityarat-1737002a0</span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="summary">
        <h2>Professional Summary</h2>
        <p>Technical Support Specialist with proven experience at TeamDynamix and CCRI—helping customers resolve technical issues through clear communication and systematic problem-solving. Expert in troubleshooting, customer support, and Microsoft 365; focused on practical solutions and customer satisfaction.</p>
      </section>

      {/* Experience */}
      <section className="experience">
        <h2>Professional Experience</h2>
        
        <div className="job">
          <div className="job-header">
            <div className="flex items-center gap-2">
              <img src="/tdx.webp" alt="TeamDynamix logo" className="w-4 h-4 object-contain" />
              <h3>Solutions Engineer — TeamDynamix</h3>
            </div>
            <span className="dates">Feb 2024 – Present</span>
          </div>
          <ul>
            <li>Provide technical support and troubleshooting assistance to customers using TeamDynamix ITSM, PPM, and iPaaS solutions.</li>
            <li>Participate in discovery calls to understand customer technical needs and provide solutions based on their specific challenges.</li>
            <li>Build and maintain demo environments and technical documentation to help customers understand platform capabilities.</li>
            <li>Provide deep technical knowledge on TeamDynamix platform, including troubleshooting ticketing systems and automation.</li>
            <li>Create and update technical support documentation and troubleshooting guides for customer success team.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <div className="flex items-center gap-2">
              <img src="/android-chrome-512x512.png" alt="Websites by Tim logo" className="w-4 h-4 object-contain" />
              <h3>Founder — Websites by Tim</h3>
            </div>
            <span className="dates">2024 – Present</span>
          </div>
          <ul>
            <li>Founded solo web development business serving Rhode Island businesses with custom website solutions and technical support.</li>
            <li>Specialize in creating fast-loading, mobile-responsive websites with clean design and ongoing technical support.</li>
            <li>Provide comprehensive services including single-page sites, multi-page websites, and technical troubleshooting for existing sites.</li>
            <li>Focus on client collaboration and direct communication, providing technical support and maintenance for website functionality.</li>
            <li>Implement technical solutions and performance optimization to help businesses maintain their online presence.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <div className="flex items-center gap-2">
              <img src="/ccri.png" alt="CCRI logo" className="w-4 h-4 object-contain" />
              <h3>Senior Info. Tech — Community College of Rhode Island</h3>
            </div>
            <span className="dates">Aug 2021 – Feb 2024</span>
          </div>
          <ul>
            <li>Lead Admin for TeamDynamix: provided technical support for ITSM service, managed system updates, and resolved automation issues.</li>
            <li>Key role in DUO Authentication integration across the college, providing technical support for authentication issues.</li>
            <li>Redesigned/coded IT Help Desk website to improve accessibility and user experience for better technical support delivery.</li>
            <li>Executed TDX projects: cleaned 600+ KB articles for better technical support; digitized Banner request forms.</li>
            <li>Delivered training on TDX and IT tools; provided ongoing technical support and troubleshooting to improve user experience.</li>
            <li>Built and maintained automated workflows for access requests and equipment reservations; provided technical support for client portal.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <div className="flex items-center gap-2">
              <img src="/ccri.png" alt="CCRI logo" className="w-4 h-4 object-contain" />
              <h3>IT Support — Community College of Rhode Island</h3>
            </div>
            <span className="dates">Oct 2019 – Aug 2021</span>
          </div>
          <ul>
            <li>Technical Support and Ticket Management: Utilized ticket-tracking tools to efficiently resolve IT-related issues, enhancing user satisfaction through systematic troubleshooting.</li>
            <li>Direct User Assistance: Provided hands-on technical support to faculty, staff, and students, addressing their specific IT needs with clear communication.</li>
            <li>Knowledge Base Contributions: Authored and published 22 knowledge base articles, providing troubleshooting resources for user self-help.</li>
            <li>Information Management: Digitized and maintained critical technical information, such as compromised account lists and printer data.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <div className="flex items-center gap-2">
              <img src="/ymca.png" alt="YMCA logo" className="w-4 h-4 object-contain" />
              <h3>Help Desk — YMCA</h3>
            </div>
            <span className="dates">2016 – 2020</span>
          </div>
          <ul>
            <li>Efficient System Management: Leveraged ticket tracking system to monitor and manage repairs, updates, and services, ensuring timely responses to technical issues.</li>
            <li>Technical Problem-Solving: Provided essential technical support in troubleshooting computer systems, resolving technical problems for smoother operations.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <h3>Co‑Owner — Blackstar Software</h3>
            <span className="dates">2016 – 2020</span>
          </div>
          <ul>
            <li>Client Engagement and Support: Implemented and managed ticketing system to facilitate direct communication with clients, ensuring prompt resolution of technical inquiries.</li>
            <li>Troubleshooting and Technical Support: Provided comprehensive technical support for modding services, addressing complex technical challenges and enhancing service quality.</li>
            <li>Community Management and Leadership: Successfully led and nurtured an active community of over 150 members, providing technical support and fostering engagement.</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Core Technologies</h3>
            <p>TeamDynamix (TDX), Office 365, SharePoint, Active Directory, DUO MFA, Windows, Technical Support Tools</p>
          </div>
          <div className="skill-category">
            <h3>Specializations</h3>
            <p>Troubleshooting, Customer Support, ITSM, Help Desk Management, Technical Writing, Web Development, System Administration, Problem Solving</p>
          </div>
          <div className="skill-category">
            <h3>Experience</h3>
            <p>Technical Support (5y), Customer Support (5y), Troubleshooting (6y), Communication (7y)</p>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="education-certs">
        <div className="education">
          <h2>Education</h2>
          <p><strong>Associate in Science (AS), Computer Science</strong> — Community College of Rhode Island</p>
          <p><em>Relevant Coursework:</em> Programming Fundamentals, Database Management, Network Administration, System Analysis</p>
        </div>
        
        <div className="certifications">
          <h2>Certifications</h2>
          <ul>
            <li>Demo2Win! — 04/19/2024</li>
            <li>MEDDPICC Masterclass — Jun 2024</li>
            <li>HDI Support Center Analyst — 05/2022</li>
            <li>Academic Impressions: Higher Education Customer Service — 11/2021</li>
          </ul>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="achievements">
        <h2>Key Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement">
            <h3>Solo Web Development Business</h3>
            <p>Founded Websites by Tim, providing custom web solutions and technical support to RI businesses.</p>
          </div>
          <div className="achievement">
            <h3>Technical Support & KB Cleanup</h3>
            <p>Led TDX knowledge base restructure; cleaned 600+ articles for better support efficiency.</p>
          </div>
          <div className="achievement">
            <h3>Security & MFA Support</h3>
            <p>Key role in DUO authentication implementation and support across CCRI campus.</p>
          </div>
          <div className="achievement">
            <h3>Portal + Support Redesign</h3>
            <p>Redesigned IT Help Desk site and digitized Banner request forms for improved support delivery.</p>
          </div>
        </div>
      </section>


      <style jsx>{`
        .resume-pdf {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.12in;
          background: white;
          color: black;
          line-height: 1.15;
          font-size: 10px;
        }

        .header {
          text-align: center;
          margin-bottom: 0.2in;
          border-bottom: 1px solid #000;
          padding-bottom: 0.1in;
        }

        h1 {
          font-size: 20px;
          font-weight: 900;
          margin: 0 0 0.04in 0;
          color: #000;
        }

        .title {
          font-size: 12px;
          font-weight: 500;
          margin: 0 0 0.04in 0;
          color: #333;
        }

        .contact {
          font-size: 9px;
          color: #666;
        }

        h2 {
          font-size: 12px;
          font-weight: 700;
          margin: 0.08in 0 0.04in 0;
          color: #000;
          border-bottom: 1px solid #ccc;
          padding-bottom: 0.015in;
        }

        h3 {
          font-size: 10px;
          font-weight: 600;
          margin: 0.06in 0 0.02in 0;
          color: #000;
        }

        .job {
          margin-bottom: 0.06in;
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.02in;
        }

        .job-header .flex {
          display: flex;
          align-items: center;
          gap: 0.05in;
        }

        .dates {
          font-size: 9px;
          font-weight: 500;
          color: #666;
        }

        ul {
          margin: 0.02in 0;
          padding-left: 0.12in;
        }

        li {
          margin-bottom: 0.008in;
          font-size: 9px;
        }

        p {
          margin: 0.02in 0;
          font-size: 9px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.1in;
        }

        .skill-category h3 {
          font-size: 10px;
          margin-bottom: 0.025in;
        }

        .skill-category p {
          font-size: 9px;
          margin: 0;
        }

        .education-certs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.15in;
        }

        .education p {
          font-size: 10px;
          margin: 0.025in 0;
        }

        .certifications ul {
          margin: 0.025in 0;
          padding-left: 0.1in;
        }

        .certifications li {
          font-size: 9px;
          margin-bottom: 0.01in;
        }

        .achievements {
          margin-top: 0.05in;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 0.04in;
        }

        .achievement {
          padding: 0.025in;
          border: 1px solid #ddd;
          border-radius: 2px;
        }

        .achievement h3 {
          font-size: 7px;
          margin-bottom: 0.01in;
          color: #000;
        }

        .achievement p {
          font-size: 6px;
          margin: 0;
          line-height: 1.0;
        }


        @media print {
          .resume-pdf {
            margin: 0;
            padding: 0.08in;
            max-width: none;
            width: 100%;
            font-size: 9px;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
