'use client';

export default function MaintenancePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          height: 100%;
        }

        .maintenance-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 40%, #fff0f5 100%);
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative blobs */
        .maintenance-root::before {
          content: '';
          position: fixed;
          top: -20%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .maintenance-root::after {
          content: '';
          position: fixed;
          bottom: -20%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.07) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 2rem;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 20px 60px rgba(139, 92, 246, 0.08),
            0 0 0 1px rgba(139, 92, 246, 0.05);
          max-width: 680px;
          width: 100%;
          padding: 3.5rem 3rem;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.7s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          margin-bottom: 1.75rem;
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35); transform: scale(1); }
          50% { box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5); transform: scale(1.04); }
        }

        .icon-wrap svg {
          width: 38px;
          height: 38px;
          color: #fff;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #7c3aed;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          animation: blink 1.4s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        h1 {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .subtext {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .status-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 2rem;
        }

        .status-bar svg {
          width: 16px;
          height: 16px;
          color: #7c3aed;
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .card {
            padding: 2.5rem 1.5rem;
            border-radius: 1.5rem;
          }
        }

        .image-container {
          margin: 1.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .maintenance-image {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.1);
          transition: transform 0.3s ease;
        }

        .maintenance-image:hover {
          transform: scale(1.02);
        }
      `}</style>

      <div className="maintenance-root">
        <div className="card">
          {/* Animated icon */}
          <div className="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>

          {/* Status badge */}
          <div className="badge">
            <span className="badge-dot" />
            Maintenance in Progress
          </div>

          {/* Heading */}
          <h1>We&apos;ll Be Back Soon!</h1>

          {/* Subtext */}
          <p className="subtext">
            Bhaag Dilli Bhaag website is currently under maintenance.
            <br />
            Please check back shortly.
          </p>

          {/* Maintenance Image */}
          <div className="image-container">
            <img
              src="/WhatsApp%20Image%202026-02-19%20at%203.35.18%20PM.jpeg"
              alt="Site Under Maintenance"
              className="maintenance-image"
            />
          </div>

          {/* Status */}
          <div className="status-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            We&apos;re working hard to get everything ready
          </div>
        </div>
      </div>
    </>
  );
}
