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
                        <a href={`${project.ProjectRepoLink}`} target='_blank' rel="noreferrer">  
                          <div className="icon-box">
                            <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 25.00 25.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00025"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"></path></g></svg>
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
                <span className="back-text">Back to Projects</span>
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
                      href={selectedProject.ProjectRepoLink}
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