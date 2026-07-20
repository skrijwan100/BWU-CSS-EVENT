import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, ExternalLink, ChevronRight, Code2, 
  Briefcase, Zap, Globe, X, Activity, 
  CalendarDays, Hourglass // <-- Added new icons for dates
} from 'lucide-react';
import '../styles/viewallreqirment.css';
import { handleError, handleSuccess } from '../Components/ErrorMessage';
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

// --- NORMAL CSS ---
const customStyles = `
  /* New Date Styles for List Card */
  .date-info-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
    margin-bottom: 4px;
  }
  .date-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 10px;
    border-radius: 6px;
    width: fit-content;
  }
  .date-badge.deadline {
    color: #ffb703; /* Matching the theme yellow/amber */
    background: rgba(255, 183, 3, 0.1);
    border: 1px solid rgba(255, 183, 3, 0.2);
  }

  /* New Date Styles for Details Sidebar */
  .date-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
  }
  .date-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .date-label {
    color: rgba(255,255,255,0.5);
  }
  .date-value {
    color: #fff;
    font-weight: 600;
  }
  .date-value.deadline {
    color: #ffb703; 
  }
`;

// --- COMPONENTS ---

const Badge = ({ children, outline = false }) => {
  return (
    <span className={`badge ${outline ? 'badge-outline' : 'badge-solid'}`}>
      {children}
    </span>
  );
};

// Date Formatter Helper
const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="card">
    <div className="card-header">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-icon"></div>
    </div>

    <div className="card-section">
      <div className="skeleton skeleton-text-short"></div>
      <div className="skeleton skeleton-text"></div>
    </div>

    <div className="card-section flex-grow">
      <div className="skeleton skeleton-text-short"></div>
      <div className="tags-flex">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag" style={{ width: '80px' }}></div>
      </div>
    </div>

    <div className="skeleton skeleton-btn"></div>
  </div>
);

export default function ViewAllProjectRequirment() {
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const { user } = useAuth()
  const [valueOfApply, setValueOfApply] = useState('')
  // Loading State
  const [loading, setLoading] = useState(true);
  const [loader, setLoder] = useState(false)
  const [isapplyloder, setIsapplyloder] = useState(true)
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasConfirmedSkills, setHasConfirmedSkills] = useState(false);

  const naviget = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/all-project-requirment`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProjectData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = async (project) => {
    const token = await user?.getIdToken();
    const localtoken = secureLocalStorage.getItem('auth-token');
    if (!token && !localtoken) {
      handleError('Login Frist')
      return naviget('/login')
    };
    setSelectedProject(project);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {

      setIsapplyloder(true)
      // Log the required ID for the backend call
      if (localtoken) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/isApply/${project._id}`
        const responce = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localtoken
          },
        });
        const data = await responce.json()
        if (!data.status) {
          return setValueOfApply('Apply Now')
        }
        return setValueOfApply('Already applied')
      }
      if (token) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/isApply/${project._id}`
        const responce = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        const data = await responce.json()
        if (!data.status) {
          return setValueOfApply('Apply Now')
        }
        return setValueOfApply('Already applied')
      }
    } catch (error) {
      console.log(error);
      return handleError('Network Issue try again')
    }
    finally {
      setIsapplyloder(false)
    }
  };

  const handleBack = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Modal Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setHasConfirmedSkills(false); // Reset checkbox when opening
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplySubmit = async () => {
    if (selectedProject && hasConfirmedSkills) {
      const token = await user?.getIdToken();
      const localtoken = secureLocalStorage.getItem('auth-token');
      try {
        setLoder(true)
        if (localtoken) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/project-application`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localtoken
            },
            body: JSON.stringify({ eventId: selectedProject._id })
          });
          const data = await responce.json()
          if (!data.status) {
            return handleError('Network issue try again!')
          }
          handleSuccess('Application Submitted')
        }
        if (token) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/project-application`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ eventId: selectedProject._id })
          });
          const data = await responce.json()
          if (!data.status) {
            return handleError('Network issue try again!')
          }
          handleSuccess('Application Submitted')
        }

        // Close modal after submission
        handleViewDetails(selectedProject)
        handleCloseModal();
      } catch (error) {
        console.log(error);
        return handleError('Network Issue try again')
      }
      finally {
        setLoder(false)
      }
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="app-container">

        <main className="main-content">
          {view === 'list' && (
            <div className="fade-in-up">
              <div className="hero-section">
                <h2 className="hero-title">
                  DISCOVER THE <span className="hero-highlight">Coding Event</span><br />
                </h2>
                <p className="hero-subtitle">
                  Apply for join the event
                </p>
              </div>

              <div className="grid-container">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                ) : (
                  projectData.map((project) => (
                    <div key={project._id} className="card">
                      <div className="card-header">
                        <h3 className="card-title">{project.ProjectTitle}</h3>
                        <a >  
                          <div className="icon-box">
                            <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.987 1.091L2 6.85v10.3l9.987 5.759 9.986-5.759V6.85l-9.986-5.759zm5.541 12.392h-2.158v-2.585h-6.74v2.585H6.472v-6.966h2.158v2.247h6.74V6.517h2.158v6.966z" />
</svg>

                          </div>
                        </a>
                      </div>

                      <div className="card-section">
                        <p className="card-label">
                          <Globe size={16} /> Event Type
                        </p>
                        <p className="card-value">{project.ProjectType}</p>
                        
                        {/* --- ADDED DATES IN LIST VIEW --- */}
                        <div className="date-info-row">
                          {project.projectDate && (
                            <span className="date-badge">
                              <CalendarDays size={14} /> Event: {formatDate(project.projectDate)}
                            </span>
                          )}
                          {project.lastDateOfApply && (
                            <span className="date-badge deadline">
                              <Hourglass size={14} /> Apply by: {formatDate(project.lastDateOfApply)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-section flex-grow">
                        <p className="card-label">
                          <Zap size={16} /> Required Skills
                        </p>
                        <div className="tags-flex">
                          {project.RequiredSkills.map((skill, index) => (
                            <Badge key={index} outline>{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <button className="card-btn" onClick={() => handleViewDetails(project)}>
                        APPLY NOW 
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'details' && selectedProject && (
            <div className="details-wrapper fade-in-right">
              <button className="back-btn" onClick={handleBack}>
                <div className="icon-box">
                  <ArrowLeft size={16} />
                </div>
                <span className="back-text">Back to event</span>
              </button>

              <div className="details-card">
                <div className="gradient-line"></div>

                <div className="details-content">
                  <div className="details-header">
                    <div>
                      <h2 className="details-title">{selectedProject.ProjectTitle}</h2>
                      <Badge>{selectedProject.ProjectType}</Badge>
                    </div>

                    <a
                      href='https://www.hackerrank.com/'
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-btn"
                    >
                      <ExternalLink size={20} />
                      Visit HackerRank
                    </a>
                  </div>

                  <div className="details-body">
                    <div className="details-main-col">
                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Briefcase size={20} />
                          </span>
                          Event Description
                        </h3>
                        <p className="section-text">{selectedProject.ProjectDescription}</p>
                      </section>

                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Activity size={20} />
                          </span>
                          Event Status
                        </h3>
                        <p className="section-text">{selectedProject.ProjectStatus}</p>
                      </section>
                    </div>

                    <div className="details-sidebar">
                      <div>
                        <h3 className="sidebar-heading">Required Skills</h3>
                        <div className="tags-flex">
                          {selectedProject.RequiredSkills.map((skill, index) => (
                            <Badge key={`req-${index}`} outline>{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* --- ADDED DATES IN SIDEBAR --- */}
                      <div className="sidebar-divider">
                        <h3 className="sidebar-heading">
                          <CalendarDays size={16} /> Important Dates
                        </h3>
                        <div className="date-details">
                          <div className="date-item">
                            <span className="date-label">Event Date</span>
                            <span className="date-value">{formatDate(selectedProject.projectDate)}</span>
                          </div>
                          <div className="date-item">
                            <span className="date-label">Apply Before</span>
                            <span className="date-value deadline">{formatDate(selectedProject.lastDateOfApply)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-divider">
                        <h3 className="sidebar-heading">
                          <Code2 size={16} /> Platform 
                        </h3>
                        <div className="tags-flex">
                            <span className="tech-tag">
                              HackerRank
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apply-footer">
                    <button className="apply-btn" disabled={valueOfApply === 'Already applied'} onClick={handleOpenModal}>
                      {isapplyloder ? <span className="loader-gg"></span> : valueOfApply}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- APPLICATION MODAL --- */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content fade-in-up">

            <div className="modal-header">
              <h3 className="modal-title">JOIN THE TEAM</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-skills-box">
              <h4>Required Skills for {selectedProject.ProjectTitle}</h4>
              <div className="tags-flex">
                {selectedProject.RequiredSkills.map((skill, index) => (
                  <Badge key={`modal-req-${index}`} outline>{skill}</Badge>
                ))}
              </div>
            </div>

            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={hasConfirmedSkills}
                onChange={(e) => setHasConfirmedSkills(e.target.checked)}
              />
              <span className="checkbox-text">
                I confirm that I have proficiency in the required skills listed above and am ready to Participate in this event.
              </span>
            </label>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn-confirm"
                disabled={!hasConfirmedSkills}
                onClick={handleApplySubmit}
              >
                {loader ? <span className="loader"></span> : 'Confirm Application'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}