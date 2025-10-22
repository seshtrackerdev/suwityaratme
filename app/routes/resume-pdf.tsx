import type { Route } from "./+types/resume-pdf";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Timothy Suwityarat — Resume" },
    { name: "description", content: "Professional resume for Timothy Suwityarat, Solutions Engineer." },
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
          <p className="title">Solutions Engineer · ITSM · Workflow Automation</p>
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
        <p>Dynamic Solutions Engineer with a proven track record at TeamDynamix and the Community College of Rhode Island—enhancing IT systems and user experiences through innovative solutions and clear communication. Expert in software troubleshooting and Microsoft 365; focused on automation, knowledge management, and client satisfaction.</p>
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
            <li>Work closely with Account Executives, Customer Success Managers, and Sales Representatives to deliver tailored demonstrations across ITSM, PPM, and iPaaS solutions.</li>
            <li>Participate in discovery calls to understand prospect needs, identify technical fit, and shape demo strategy based on their goals and pain points.</li>
            <li>Build customized demo environments, workflows, and outlines that reflect real-world scenarios and demonstrate how TeamDynamix can solve prospect-specific challenges.</li>
            <li>Provide deep product knowledge on the TeamDynamix platform, including intake design, ticketing, automation, and portfolio management.</li>
            <li>Help refine and update shared demo environments, scripts, and walkthroughs used across the pre-sales team to ensure consistency and quality.</li>
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
            <li>Founded solo web development business serving Rhode Island businesses with custom website solutions and local SEO optimization.</li>
            <li>Specialize in creating fast-loading, mobile-responsive websites with clean design and intuitive user experience.</li>
            <li>Provide comprehensive services including single-page sites, multi-page websites, website makeovers, and landing pages for promotions.</li>
            <li>Focus on client collaboration and direct communication, ensuring businesses maintain control over their content while I handle technical implementation.</li>
            <li>Implement local SEO strategies and performance optimization to help businesses improve their online presence and search visibility.</li>
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
            <li>Lead Admin for TeamDynamix: maintained ITSM service, major updates, automation rules; restructured KB and workflows.</li>
            <li>Key role in DUO Authentication integration across the college.</li>
            <li>Redesigned/coded IT Help Desk website to improve accessibility and UX.</li>
            <li>Executed TDX projects: cleaned 600+ KB articles; digitized Banner request forms for efficient administration.</li>
            <li>Delivered training on TDX and IT tools; improved operational efficiency across user groups.</li>
            <li>Built automated workflows for access requests and equipment reservations; enhanced client portal functionality.</li>
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
            <li>Technical Support and Ticket Management: Utilized ticket-tracking tools to efficiently resolve a wide range of IT-related issues, significantly enhancing user satisfaction.</li>
            <li>Direct User Assistance: Provided hands-on support to faculty, staff, and students, addressing their specific IT needs and challenges.</li>
            <li>Knowledge Base Contributions: Authored and published 22 knowledge base articles, providing valuable resources for user self-help and education.</li>
            <li>Information Management: Digitized and maintained critical information, such as the compromised account list and printer data.</li>
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
            <li>Efficient System Management: Leveraged a ticket tracking system to meticulously monitor and manage repairs, updates, and services, ensuring timely and organized responses to technical issues.</li>
            <li>Technical Problem-Solving: Provided essential support in troubleshooting computer systems, resolving basic technical problems and contributing to smoother system operations.</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <h3>Co‑Owner — Blackstar Software</h3>
            <span className="dates">2016 – 2020</span>
          </div>
          <ul>
            <li>Client Engagement and Support: Implemented and managed a ticketing system to facilitate direct and effective communication with clients, ensuring prompt resolution of inquiries and issues.</li>
            <li>Troubleshooting and Technical Support: Provided comprehensive troubleshooting for modding services, addressing complex technical challenges and enhancing service quality.</li>
            <li>Community Management and Leadership: Successfully led and nurtured an active community of over 150 members, fostering engagement, collaboration, and a supportive environment.</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Core Technologies</h3>
            <p>TeamDynamix (TDX), Office 365, SharePoint, Active Directory, DUO MFA, Windows</p>
          </div>
          <div className="skill-category">
            <h3>Specializations</h3>
            <p>Workflow Automation, ITSM, PPM, iPaaS, Help Desk Management, Technical Writing, Web Development, Local SEO</p>
          </div>
          <div className="skill-category">
            <h3>Experience</h3>
            <p>Office 365 Support (3y), In‑person & Remote IT Support (3y), Communication (7y), Troubleshooting (6y)</p>
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
            <p>Founded Websites by Tim, providing custom web solutions to RI businesses.</p>
          </div>
          <div className="achievement">
            <h3>ITSM Overhaul & KB Cleanup</h3>
            <p>Led TDX knowledge base restructure; cleaned 600+ articles for efficiency.</p>
          </div>
          <div className="achievement">
            <h3>Security & MFA Rollout</h3>
            <p>Key role in DUO authentication implementation across CCRI campus.</p>
          </div>
          <div className="achievement">
            <h3>Portal + Intake Redesign</h3>
            <p>Redesigned IT Help Desk site and digitized Banner request forms.</p>
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
