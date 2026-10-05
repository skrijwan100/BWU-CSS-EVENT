import React, { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import { handleError } from '../Components/ErrorMessage'
import collagelogo from '../assets/3dlogo.png'
import '../styles/EventPass.css'

const PASS_W = 1000
const PASS_H = 563

const EVENT_DATES = {
    'Coding Championship 2026 (3rd Semester)': '27 November 2026',
    'Coding Championship 2026 (5th Semester)': '28 November 2026',
}

/* ---------- small icons ---------- */
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" className="ep-icon" fill="none" stroke="#FFC400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h2M12 14h2M16 14h2M8 18h2M12 18h2" />
    </svg>
)
const PinIcon = () => (
    <svg viewBox="0 0 24 24" className="ep-icon" fill="#FFC400">
        <path d="M12 22s8-7.2 8-13a8 8 0 10-16 0c0 5.8 8 13 8 13z" />
        <circle cx="12" cy="9" r="3" fill="#000" />
    </svg>
)
const BuildingIcon = () => (
    <svg viewBox="0 0 24 24" className="ep-icon" fill="#FFC400">
        <path d="M3 21V9l7-4v16H3zm9 0V3h9v18h-9z" />
        <path d="M6 11h2v2H6zm0 4h2v2H6zm9-8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" fill="#000" />
    </svg>
)

const Info = ({ icon, label, value }) => (
    <div className="ep-info">
        {icon}
        <div>
            <p className="ep-info-label">{label}</p>
            <p className="ep-info-value">{value}</p>
        </div>
    </div>
)

/* ---------- the pass itself (fixed 1000 x 563 canvas) ---------- */
function Pass({ data, innerRef }) {
    const eventDate = EVENT_DATES[data.eventName?.trim()] || 'To be announced'

    return (
        <div ref={innerRef} className="ep-pass">
            <div className="ep-glow" />

            {/* ticket border, dashed divider, notches */}
            <div className="ep-ticket-border" />
            <div className="ep-perforation" />
            <div className="ep-notch ep-notch-top">
                <div className="ep-notch-circle" />
            </div>
            <div className="ep-notch ep-notch-bottom">
                <div className="ep-notch-circle" />
            </div>

            {/* ---------- LEFT SIDE ---------- */}
            <img src={collagelogo} alt="Brainware University" crossOrigin="anonymous" className="ep-logo" />
            <div className="ep-uni">
                <p className="ep-uni-name">BRAINWARE UNIVERSITY</p>
                <p className="ep-dept">CSS DEPARTMENT</p>
                <div className="ep-uni-line" />
            </div>

            <div className="ep-title">
                <p className="ep-silver-text ep-title-coding">CODING</p>
                <p className="ep-gold-grad-text ep-title-champ">CHAMPIONSHIP</p>
                <p className="ep-title-year">
                    <span className="ep-chev">«</span>2026<span className="ep-chev">»</span>
                </p>
            </div>

            <div className="ep-orb-ring ep-orb-ring-1" />
            <div className="ep-orb-ring ep-orb-ring-2" />
            <div className="ep-orb">
                <span className="ep-orb-text">{'{◆}'}</span>
            </div>

            {/* student panel */}
            <div className="ep-panel">
                {/* <svg viewBox="0 0 200 60" className="ep-building" fill="#FFC400">
                    <path d="M0 60V40h30V34h40V28h25a20 20 0 0140 0h25v6h40v6h-10v14z" />
                    <rect x="98" y="8" width="2" height="12" />
                </svg> */}
                <div className="ep-photo">
                    {data.studentProfileimage ? (
                        <img src={data.studentProfileimage} alt={data.studentName} crossOrigin="anonymous" />
                    ) : (
                        <div className="ep-avatar">
                            <div className="ep-avatar-body" />
                        </div>
                    )}
                </div>
                <div className="ep-student-info">
                    <p className="ep-label">STUDENT NAME</p>
                    <p className="ep-student-name">{data.studentName}</p>
                    <div className="ep-student-line" />
                    <p className="ep-label ep-label-spaced">STUDENT CODE</p>
                    <p className="ep-student-code">{data.studentCode}</p>
                </div>
                <div className="ep-badge">FINALIST PARTICIPANT</div>
            </div>

            {/* bottom info row */}
            <div className="ep-info-row">
                <Info icon={<CalendarIcon />} label="EVENT DATE" value={eventDate} />
                <div className="ep-info-sep" />
                <Info icon={<PinIcon />} label="VENUE" value="UV-VI" />
                <div className="ep-info-sep" />
                <Info icon={<BuildingIcon />} label="ROOM NO." value="411" />
            </div>

            {/* ---------- RIGHT SIDE ---------- */}
            <div className="ep-pass-tag">EVENT PASS</div>

            <div className="ep-qr-box">
                <QRCodeSVG value={String(data._id)} size={150} level="M" bgColor="#ffffff" fgColor="#000000" />
                <p className="ep-qr-caption">SCAN HERE</p>
            </div>

            <div className="ep-right-line" />

            <div className="ep-mini">
                <p className="ep-silver-text ep-mini-coding">CODING</p>
                <p className="ep-gold-grad-text ep-mini-champ">CHAMPIONSHIP</p>
                <p className="ep-mini-year">
                    <span className="ep-chev">«</span>2026<span className="ep-chev">»</span>
                </p>
                <p className="ep-mini-tagline">
                    Code <span className="ep-gold-text">.</span> Compile <span className="ep-gold-text">.</span>{' '}
                    <span className="ep-gold-text">Win</span>
                </p>
            </div>
        </div>
    )
}

/* ---------- page ---------- */
export default function EventPass() {
    const [studentCode, setStudentCode] = useState('')
    const [loder, setloder] = useState(false)
    const [passData, setPassData] = useState(null)
    const [downloading, setDownloading] = useState(false)
    const [scale, setScale] = useState(1)
    const passRef = useRef(null)

    // fit the 1000px pass inside small screens
    useEffect(() => {
        const update = () => setScale(Math.min(1, (window.innerWidth - 32) / PASS_W))
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    const handleclick = async () => {
        const code = studentCode.trim()
        if (!code) {
            return handleError('Please enter your student code')
        }
        try {
            setloder(true)
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v4/event-data/userdata-for-event-pass`
            const responce = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentCode: code }),
            })
            const data = await responce.json()
            if (!data.status) {
                return handleError(`${data.msg}`)
            }
            setPassData(data.data)
        } catch (error) {
            console.log(error)
            return handleError('Network Issue try again')
        } finally {
            setloder(false)
        }
    }

    const handleDownload = async () => {
        if (!passRef.current) return
        try {
            setDownloading(true)
            const dataUrl = await toPng(passRef.current, {
                pixelRatio: 2,
                cacheBust: true,
                backgroundColor: '#000000',
            })
            const link = document.createElement('a')
            link.download = `${passData.studentCode.replace(/[^a-zA-Z0-9]/g, '_')}_event_pass.png`
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.log(error)
            handleError('Could not download the pass, try again')
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="ep-page">
            <div className="ep-page-glow" />

            {/* form */}
            <div className="ep-card">
                <h1 className="ep-card-title">Get your event pass</h1>
                <p className="ep-card-text">Enter your student code to generate your Coding Championship 2026 pass.</p>

                <input
                    type="text"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !loder && handleclick()}
                    placeholder="e.g. BWU/BCA/25/124"
                    className="ep-input"
                />

                <button onClick={handleclick} disabled={loder} className="ep-btn ep-btn-full">
                    {loder && <span className="ep-spinner" />}
                    {loder ? 'Generating...' : 'Generate pass'}
                </button>
            </div>

            {/* pass preview */}
            {passData && (
                <div className="ep-overlay">
                    <div style={{ width: PASS_W * scale, height: PASS_H * scale }}>
                        <div style={{ width: PASS_W, height: PASS_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                            <Pass data={passData} innerRef={passRef} />
                        </div>
                    </div>

                    <div className="ep-actions">
                        <button onClick={handleDownload} disabled={downloading} className="ep-btn">
                            {downloading && <span className="ep-spinner" />}
                            {downloading ? 'Preparing...' : 'Download pass'}
                        </button>
                        <button onClick={() => setPassData(null)} className="ep-btn ep-btn-outline">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}