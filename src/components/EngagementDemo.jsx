import { useState, useRef, useEffect, useCallback } from 'react'
import '../styles/engagement-demo.css'

// ── Conversation data (adapted from Bookt) ─────────────────────────────────
const demoConvos = {
  web: {
    context: 'Sunday, 11:42 PM — Office is closed. No staff online.',
    result:  '<strong>52 seconds.</strong> Booked at 11:42 PM on a Sunday. Zero staff involved.',
    msgs: [
      { t: 'bot', txt: 'Hi there! Welcome to Bright Smile Dental. How can I help you today?', d: 800,
        term: [
          { txt: '<span class="t-label">[INIT]</span> <span class="t-action">New conversation detected</span>', d: 0 },
          { txt: '<span class="t-label">[CHANNEL]</span> Website live chat — brightsmiledental.com', d: 150 },
          { txt: '<span class="t-label">[GREETING]</span> Loading welcome message...', d: 150 },
        ],
      },
      { t: 'user', txt: 'Hi, I need to book a cleaning. Do you have anything this week?', d: 2200,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INPUT]</span> "need to book a cleaning...this week"', d: 100 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Appointment booking — service: cleaning</span>', d: 200 },
          { txt: '<span class="t-label">[INTENT]</span> Time preference: <span class="t-data">this week</span>', d: 150 },
        ],
      },
      { t: 'bot', txt: "Great! We'd love to get you in. Before I check availability — are you an existing patient, or would this be your first visit?", d: 2800,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> Querying availability for cleaning...', d: 0 },
          { txt: '<span class="t-label">[QUALIFY]</span> <span class="t-action">Checking new vs existing patient status</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Qualifying before booking slot...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'user', txt: 'Existing patient. Last name Chen.', d: 1800,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INPUT]</span> "existing patient...Chen"', d: 100 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-action">Searching patient records...</span>', d: 200 },
          { txt: '<span class="t-label">[CRM]</span> Match found: <span class="t-data">Chen, Emily — last visit 6 months ago</span>', d: 250 },
          { txt: '<span class="t-label">[CRM]</span> Due for: <span class="t-data">routine cleaning + x-rays</span>', d: 150 },
        ],
      },
      { t: 'bot', txt: "Welcome back, Emily! You're due for your 6-month cleaning and x-rays. Here's what we have open this week:<br><br>Tuesday at 10:00 AM<br>Wednesday at 2:30 PM<br>Friday at 9:00 AM<br><br>Any of those work for you?", d: 3500,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> Fetching open slots for cleaning + x-rays...', d: 0 },
          { txt: '<span class="t-label">[CALENDAR]</span> Duration: <span class="t-data">60 min</span>', d: 200 },
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-data">3 slots found this week</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Presenting options + upsell x-rays...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'user', txt: 'Friday at 9 works!', d: 1400,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INPUT]</span> "Friday at 9"', d: 100 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Slot selected — initiating booking</span>', d: 200 },
          { txt: '<span class="t-label">[CALENDAR]</span> Checking Friday 9:00 AM... <span class="t-data">still available</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "You're all set!<br><br>Friday, April 11 at 9:00 AM<br>Cleaning + X-Rays — Dr. Patel<br>Bright Smile Dental, 123 Oak St<br><br>We'll send a confirmation text and a reminder 24 hours before. See you Friday!<br><div class='demo-booked'>✓ Appointment Booked</div>", d: 3200,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-action">Reserving slot...</span>', d: 0 },
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-success">BOOKED — Fri Apr 11, 9:00 AM, Dr. Patel</span>', d: 300 },
          { txt: '<span class="t-label">[CRM]</span> Updating Emily Chen — appointment added', d: 250 },
          { txt: '<span class="t-label">[SMS]</span> <span class="t-success">Confirmation delivered</span>', d: 200 },
          { txt: '<span class="t-label">[REMIND]</span> 24hr reminder scheduled — Thu Apr 10, 9:00 AM', d: 200 },
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 250 },
          { txt: '<span class="t-label">[NOTIFY]</span> <span class="t-alert">Alert sent to Dr. Patel + front desk</span>', d: 200 },
          { txt: '<span class="t-success">SESSION COMPLETE — 1 appointment booked</span>', d: 250 },
          { txt: '<span class="t-success">Total elapsed: 52 seconds</span>', d: 150 },
        ],
      },
    ],
  },

  sms: {
    context: 'Tuesday, 11:18 PM — AC broke mid-summer. No answering service.',
    result:  '<strong>38 seconds.</strong> Emergency service call booked via SMS at 11:18 PM.',
    msgs: [
      { t: 'user', txt: 'Hi my AC stopped working and its 85 degrees inside. Do you have emergency service?', d: 800,
        term: [
          { txt: '<span class="t-label">[INIT]</span> <span class="t-action">Inbound SMS received</span>', d: 0 },
          { txt: '<span class="t-label">[CHANNEL]</span> SMS — (555) 234-8900 Summit HVAC', d: 150 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Emergency service request — HVAC failure</span>', d: 200 },
          { txt: '<span class="t-label">[PRIORITY]</span> <span class="t-alert">HIGH — residential emergency, after hours</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "Yes, we offer 24/7 emergency service! Our after-hours fee is $89 for the diagnostic visit — applied toward any repair.<br><br>Can you describe what's happening? Fan running but no cold air, or unit completely off?", d: 3000,
        term: [
          { txt: '<span class="t-label">[KNOWLEDGE BASE]</span> Searching "emergency service pricing"...', d: 0 },
          { txt: '<span class="t-label">[MATCH]</span> <span class="t-data">After-hours rate: $89 diagnostic, credited to repair</span>', d: 200 },
          { txt: '<span class="t-label">[TRIAGE]</span> <span class="t-action">Running diagnostic questions</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Gathering info before booking...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'user', txt: 'Fan is running but no cold air. No weird noises', d: 2000,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INPUT]</span> "fan running, no cold air, no noises"', d: 100 },
          { txt: '<span class="t-label">[TRIAGE]</span> <span class="t-data">Fan active + no cooling = likely refrigerant/compressor</span>', d: 200 },
          { txt: '<span class="t-label">[TRIAGE]</span> Recommendation: <span class="t-data">AC Diagnostic visit</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "Got it — likely a refrigerant or compressor issue. We can have a tech out first thing tomorrow morning.<br><br>Earliest slot is 8:00 AM. Does that work?", d: 3000,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> Querying next available emergency slot...', d: 0 },
          { txt: '<span class="t-label">[CALENDAR]</span> Tech Mike — <span class="t-data">8:00 AM available</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Presenting earliest option...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'user', txt: 'Yes that works. 742 Oak Drive, Pasadena', d: 1800,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INPUT]</span> "yes...742 Oak Drive, Pasadena"', d: 100 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Booking confirmed by customer</span>', d: 200 },
          { txt: '<span class="t-label">[EXTRACT]</span> Address: <span class="t-data">742 Oak Drive, Pasadena</span>', d: 150 },
        ],
      },
      { t: 'bot', txt: "You are booked!<br><br>Tomorrow at 8:00 AM<br>742 Oak Drive, Pasadena<br>AC Diagnostic — $89 service call fee<br><br>Our tech Mike will text you when he's 20 min away. Hang tight tonight.<br><div class='demo-booked'>✓ Service Call Booked</div>", d: 3200,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-success">BOOKED — Wed 8:00 AM, Tech Mike</span>', d: 0 },
          { txt: '<span class="t-label">[CRM]</span> Creating lead: <span class="t-data">(555) 891-2040 — 742 Oak Dr</span>', d: 250 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-success">Lead saved — Pipeline: Emergency Service</span>', d: 200 },
          { txt: '<span class="t-label">[SMS]</span> <span class="t-success">Confirmation delivered</span>', d: 200 },
          { txt: '<span class="t-label">[NOTIFY]</span> <span class="t-alert">Alert sent to dispatch + Tech Mike</span>', d: 200 },
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 250 },
          { txt: '<span class="t-success">SESSION COMPLETE — 1 service call booked</span>', d: 250 },
          { txt: '<span class="t-success">Total elapsed: 38 seconds</span>', d: 150 },
        ],
      },
    ],
  },

  ig: {
    context: 'Wednesday, 6:08 AM — Prospect saw a Botox post on the Explore page.',
    result:  '<strong>44 seconds.</strong> Instagram DM at 6:08 AM — consultation booked before the office opened.',
    msgs: [
      { t: 'user', txt: 'Hi! I saw your post about Botox. How much is it and do you have openings soon?', d: 800,
        term: [
          { txt: '<span class="t-label">[INIT]</span> <span class="t-action">New DM received</span>', d: 0 },
          { txt: '<span class="t-label">[CHANNEL]</span> Instagram — @glowmedspa_la', d: 150 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Pricing inquiry + availability check</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "Hey! Thanks for reaching out. Our Botox pricing is $12 per unit — most clients use 20–40 units depending on the area.<br><br>First-time clients get a free consultation where we map out a custom plan. Want me to book you in?", d: 2800,
        term: [
          { txt: '<span class="t-label">[KNOWLEDGE BASE]</span> Searching "Botox pricing"...', d: 0 },
          { txt: '<span class="t-label">[MATCH]</span> <span class="t-data">Botox: $12/unit, avg 20–40 units</span>', d: 200 },
          { txt: '<span class="t-label">[MATCH]</span> <span class="t-data">New client policy: free consultation required</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Including pricing + consultation upsell...<span class="t-cursor"></span>', d: 200 },
        ],
      },
      { t: 'user', txt: 'Yes! I have never done it before so I definitely want the consult first', d: 2200,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Booking request — new client consultation</span>', d: 200 },
          { txt: '<span class="t-label">[FLAG]</span> <span class="t-data">First-time client — flag for welcome kit</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "Perfect — the consultation is quick (about 15 min) and totally no-pressure. Dr. Rivera will walk you through everything.<br><br>Here's what I have this week:<br><br>Thursday 11:00 AM<br>Friday 2:30 PM<br>Saturday 10:00 AM<br><br>Any of those work?", d: 3200,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> Querying Dr. Rivera — consultation slots...', d: 0 },
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-data">3 slots found this week</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Presenting options...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'user', txt: 'Saturday at 10!', d: 1400,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Slot selected — confirming booking</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "You are booked!<br><br>Saturday, April 12 at 10:00 AM<br>Free Botox Consultation — Dr. Rivera<br>Glow Med Spa, 456 Wilshire Blvd, LA<br><br>We'll DM you a confirmation with intake forms. See you Saturday!<br><div class='demo-booked'>✓ Consultation Booked</div>", d: 3400,
        term: [
          { txt: '<span class="t-label">[CALENDAR]</span> <span class="t-success">BOOKED — Sat Apr 12, 10:00 AM, Dr. Rivera</span>', d: 0 },
          { txt: '<span class="t-label">[CRM]</span> Creating contact from IG profile...', d: 250 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-success">Contact saved — Pipeline: New Consultation</span>', d: 200 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-data">Tag applied: first-time-client, botox-interest</span>', d: 200 },
          { txt: '<span class="t-label">[DM]</span> <span class="t-success">Confirmation + intake form delivered via Instagram</span>', d: 250 },
          { txt: '<span class="t-label">[NOTIFY]</span> <span class="t-alert">Alert sent to front desk + Dr. Rivera</span>', d: 200 },
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 250 },
          { txt: '<span class="t-success">SESSION COMPLETE — 1 consultation booked</span>', d: 250 },
          { txt: '<span class="t-success">Total elapsed: 44 seconds</span>', d: 150 },
        ],
      },
    ],
  },

  support: {
    context: 'Saturday, 9:14 PM — Customer service team is offline.',
    result:  '<strong>47 seconds.</strong> Issue resolved at 9:14 PM. No human touched it.',
    msgs: [
      { t: 'bot', txt: 'Hi there! Welcome to Kestrel Apparel. How can I help you today?', d: 800,
        term: [
          { txt: '<span class="t-label">[INIT]</span> <span class="t-action">New conversation detected</span>', d: 0 },
          { txt: '<span class="t-label">[CHANNEL]</span> Website live chat — kestrelapparel.com', d: 150 },
          { txt: '<span class="t-label">[GREETING]</span> Loading welcome message...', d: 150 },
        ],
      },
      { t: 'user', txt: "My order #KA-8821 was supposed to arrive 3 days ago and it still hasn't shown up", d: 2200,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Order inquiry — delayed shipment</span>', d: 200 },
          { txt: '<span class="t-label">[EXTRACT]</span> Order ID: <span class="t-data">KA-8821</span>', d: 150 },
          { txt: '<span class="t-label">[ORDER LOOKUP]</span> Found: <span class="t-data">KA-8821 — Merino Crew Neck (L), shipped Apr 9</span>', d: 250 },
        ],
      },
      { t: 'bot', txt: "I found your order — a Merino Crew Neck (Large) that shipped on April 9th. Let me check the latest tracking info.", d: 2200,
        term: [
          { txt: '<span class="t-label">[CARRIER API]</span> <span class="t-action">Fetching live tracking for KA-8821...</span>', d: 0 },
          { txt: '<span class="t-label">[CARRIER API]</span> Status: <span class="t-alert">Delayed — weather disruption, Memphis hub</span>', d: 250 },
          { txt: '<span class="t-label">[CARRIER API]</span> Revised ETA: <span class="t-data">Monday April 14</span>', d: 200 },
          { txt: '<span class="t-label">[COMPOSING]</span> Explaining delay + offering reshipment...<span class="t-cursor"></span>', d: 150 },
        ],
      },
      { t: 'bot', txt: "Looks like there's a weather-related delay at FedEx's Memphis hub. Your revised delivery estimate is Monday, April 14th.<br><br>I know that's frustrating — want me to flag this for priority reshipment if it doesn't arrive by Monday?", d: 3200, term: [] },
      { t: 'user', txt: "Yes please. Also — can I return something from a different order? I got the wrong size", d: 2600,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[INTENT]</span> <span class="t-action">Return request — size exchange</span>', d: 200 },
          { txt: '<span class="t-label">[POLICY KB]</span> Match: <span class="t-data">30-day free returns, prepaid label included</span>', d: 200 },
        ],
      },
      { t: 'bot', txt: "No problem — we have a 30-day free return policy. I can generate a prepaid return label right now.<br><br>What's the order number for the item you'd like to return?", d: 2800,
        term: [
          { txt: '<span class="t-label">[COMPOSING]</span> Presenting return policy + requesting order ID...<span class="t-cursor"></span>', d: 0 },
        ],
      },
      { t: 'user', txt: "KA-8804, it's a jacket in medium, I need a large", d: 2000,
        term: [
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 0 },
          { txt: '<span class="t-label">[ORDER LOOKUP]</span> Found: <span class="t-data">Field Jacket (M) — eligible for return, 8 days old</span>', d: 250 },
          { txt: '<span class="t-label">[RETURN LABEL]</span> <span class="t-success">Label generated — emailing to customer</span>', d: 200 },
          { txt: '<span class="t-label">[DISCOUNT ENGINE]</span> <span class="t-data">Eligible: 10% goodwill code</span>', d: 150 },
        ],
      },
      { t: 'bot', txt: "Done! Your prepaid return label for the Field Jacket (M) has been emailed to you — drop it at any FedEx location.<br><br>Once we receive it, we'll ship a Large right away.<br><br>As a thank-you for your patience: <strong>THANKYOU10</strong> for 10% off your next order.<br><div class='demo-booked'>✓ Issue Resolved</div>", d: 3400,
        term: [
          { txt: '<span class="t-label">[CRM]</span> <span class="t-data">Return initiated: KA-8804 — size exchange pending</span>', d: 0 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-data">Priority reshipment flag: KA-8821</span>', d: 200 },
          { txt: '<span class="t-label">[CRM]</span> <span class="t-success">Discount code THANKYOU10 applied to account</span>', d: 200 },
          { txt: '<span class="t-label">[EMAIL]</span> Return label sent to customer', d: 200 },
          { txt: '<span class="t-dim">───────────────────────────────────</span>', d: 250 },
          { txt: '<span class="t-success">SESSION COMPLETE — 2 issues resolved</span>', d: 250 },
          { txt: '<span class="t-success">Total elapsed: 47 seconds</span>', d: 150 },
        ],
      },
    ],
  },
}

const CHANNELS = [
  { id: 'web',     label: 'Website Chat' },
  { id: 'sms',     label: 'SMS Text' },
  { id: 'ig',      label: 'Instagram DM' },
  { id: 'support', label: 'E-commerce Support' },
]

// ── Chat device headers per channel ───────────────────────────────────────
function WebHeader() {
  return (
    <>
      <div className="demo-browser-bar">
        <div className="demo-browser-dots"><span /><span /><span /></div>
        <div className="demo-browser-url">brightsmiledental.com</div>
      </div>
      <div className="demo-chat-hdr">
        <div className="demo-chat-av" style={{ background: 'var(--accent)' }}>B</div>
        <div>
          <div className="demo-chat-name">Bright Smile Dental</div>
          <div className="demo-chat-status" style={{ color: '#22c072' }}>Online now</div>
        </div>
      </div>
    </>
  )
}

function SmsHeader() {
  return (
    <>
      <div className="demo-phone-notch" />
      <div className="demo-sms-hdr">
        <div className="demo-sms-back">‹</div>
        <div className="demo-sms-contact">
          <div className="demo-sms-av">S</div>
          <div className="demo-sms-name">Summit HVAC</div>
          <div className="demo-sms-sub">Business · (555) 234-8900</div>
        </div>
      </div>
    </>
  )
}

function IgHeader() {
  return (
    <>
      <div className="demo-phone-notch" />
      <div className="demo-ig-hdr">
        <div className="demo-ig-back">‹</div>
        <div className="demo-ig-av">G</div>
        <div className="demo-ig-info">
          <div className="demo-ig-name">glowmedspa_la</div>
          <div className="demo-ig-status">Active now</div>
        </div>
      </div>
    </>
  )
}

function SupportHeader() {
  return (
    <>
      <div className="demo-browser-bar">
        <div className="demo-browser-dots"><span /><span /><span /></div>
        <div className="demo-browser-url">kestrelapparel.com</div>
      </div>
      <div className="demo-chat-hdr">
        <div className="demo-chat-av" style={{ background: '#2d5a8e' }}>K</div>
        <div>
          <div className="demo-chat-name">Kestrel Apparel</div>
          <div className="demo-chat-status" style={{ color: '#6aabf7' }}>Online now</div>
        </div>
      </div>
    </>
  )
}

const HEADERS = { web: WebHeader, sms: SmsHeader, ig: IgHeader, support: SupportHeader }

// ── Main component ─────────────────────────────────────────────────────────
export default function EngagementDemo() {
  const [channel, setChannel]         = useState('web')
  const [msgs, setMsgs]               = useState([])
  const [termLines, setTermLines]     = useState([{ html: '&gt; Agent initialized. Waiting for input...', dim: true }])
  const [typingVisible, setTypingVisible] = useState(false)
  const [resultHtml, setResultHtml]   = useState(null)
  const [isPlaying, setIsPlaying]     = useState(false)

  const channelRef   = useRef('web')
  const playingRef   = useRef(false)
  const timeoutsRef  = useRef([])
  const splitRef     = useRef(null)
  const autoPlayedRef = useRef(false)
  const msgsContainerRef = useRef(null)
  const termContainerRef = useRef(null)

  const stopAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const sched = useCallback((fn, delay) => {
    timeoutsRef.current.push(setTimeout(fn, delay))
  }, [])

  const play = useCallback((ch) => {
    const convo = demoConvos[ch]
    if (!convo) return
    let delay = 400

    convo.msgs.forEach(m => {
      // Terminal lines
      if (m.term?.length) {
        let td = delay
        m.term.forEach(tl => {
          td += tl.d
          const d = td
          sched(() => {
            if (!playingRef.current || channelRef.current !== ch) return
            setTermLines(prev => [...prev, { html: tl.txt, dim: false }])
          }, d)
        })
      }

      // Typing indicator for bot messages
      if (m.t === 'bot') {
        const d = delay
        sched(() => {
          if (!playingRef.current || channelRef.current !== ch) return
          setTypingVisible(true)
        }, d)
        delay += 1200
      }

      // Render message
      const d = delay
      sched(() => {
        if (!playingRef.current || channelRef.current !== ch) return
        setTypingVisible(false)
        setMsgs(prev => [...prev, { t: m.t, html: m.txt }])
      }, d)

      delay += m.d
    })

    // Result banner
    sched(() => {
      if (channelRef.current !== ch) return
      setResultHtml(convo.result)
      playingRef.current = false
      setIsPlaying(false)
    }, delay + 1500)
  }, [sched])

  const doRestart = useCallback((ch) => {
    stopAll()
    setMsgs([])
    setTermLines([{ html: '&gt; Agent initialized. Waiting for input...', dim: true }])
    setTypingVisible(false)
    setResultHtml(null)
    playingRef.current = true
    setIsPlaying(true)
    play(ch ?? channelRef.current)
  }, [stopAll, play])

  const switchChannel = useCallback((ch) => {
    channelRef.current = ch
    setChannel(ch)
    doRestart(ch)
  }, [doRestart])

  const togglePlay = useCallback(() => {
    if (playingRef.current) {
      stopAll()
      playingRef.current = false
      setIsPlaying(false)
    } else {
      doRestart(channelRef.current)
    }
  }, [stopAll, doRestart])

  // Auto-scroll within containers only (not the page)
  useEffect(() => {
    const el = msgsContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typingVisible])
  useEffect(() => {
    const el = termContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [termLines])

  // Auto-play on scroll into view
  useEffect(() => {
    if (!splitRef.current) return
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !autoPlayedRef.current) {
        autoPlayedRef.current = true
        channelRef.current = 'web'
        playingRef.current = true
        setIsPlaying(true)
        play('web')
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(splitRef.current)
    return () => io.disconnect()
  }, [play])

  useEffect(() => () => stopAll(), [stopAll])

  const convo = demoConvos[channel]
  const DeviceHeader = HEADERS[channel]
  const isPhone = channel === 'sms' || channel === 'ig'

  return (
    <section className="ces-demo-section">
      <div className="ces-demo-inner">
        <p className="section-label">Live Demo</p>
        <h2 className="section-title">One AI. Every channel.<br /><em>Always booking.</em></h2>
        <p className="section-sub">Watch real conversations play out — and see exactly what the AI is doing behind the scenes.</p>
      </div>

      {/* Channel tabs */}
      <div className="demo-tabs">
        {CHANNELS.map(c => (
          <button
            key={c.id}
            className={`demo-tab${channel === c.id ? ' demo-tab--active' : ''}`}
            onClick={() => switchChannel(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Context pill */}
      <div className="demo-ctx-wrap">
        <div className="demo-ctx-pill">
          <span className="demo-ctx-dot" />
          <span>{convo.context}</span>
        </div>
      </div>

      {/* Split panel */}
      <div className="demo-split" ref={splitRef}>

        {/* LEFT: Chat device */}
        <div className="demo-split-chat">
          <div className="demo-split-label">What the customer sees</div>
          <div className={isPhone ? 'demo-phone' : 'demo-browser'}>
            <DeviceHeader />
            <div
              ref={msgsContainerRef}
              className={`demo-msgs${channel === 'sms' ? ' demo-msgs--sms' : ''}${channel === 'ig' ? ' demo-msgs--ig' : ''}`}
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`demo-msg demo-msg--${m.t} demo-msg--vis`}
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              ))}
              {typingVisible && (
                <div className="demo-typing">
                  <span /><span /><span />
                </div>
              )}
            </div>
            <div className={`demo-input-bar${isPhone ? ' demo-input-bar--phone' : ''}`}>
              <div className="demo-input-fake">
                {channel === 'ig' ? 'Message...' : channel === 'sms' ? 'Text Message' : 'Type a message...'}
              </div>
              {channel === 'ig'
                ? <div className="demo-send-text">Send</div>
                : <div className="demo-send-circle" style={{ background: channel === 'sms' ? '#34C759' : channel === 'support' ? '#2d5a8e' : 'var(--accent)' }}>↑</div>
              }
            </div>
          </div>
        </div>

        {/* RIGHT: Terminal */}
        <div className="demo-split-terminal">
          <div className="demo-split-label">What the AI is doing</div>
          <div className="demo-terminal">
            <div className="demo-term-bar">
              <div className="demo-term-dots"><span /><span /><span /></div>
              <div className="demo-term-title">mrc-agent — engagement process</div>
            </div>
            <div ref={termContainerRef} className="demo-term-body">
              {termLines.map((l, i) => (
                <div
                  key={i}
                  className={`demo-term-line${l.dim ? ' demo-term-line--dim' : ' demo-term-line--vis'}`}
                  dangerouslySetInnerHTML={{ __html: l.html }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="demo-ctrls">
        <button className={`demo-ctrl-btn${isPlaying ? ' demo-ctrl-btn--playing' : ''}`} onClick={togglePlay}>
          <span>{isPlaying ? '||' : '▶'}</span>
          <span>{isPlaying ? 'Playing' : 'Play'}</span>
        </button>
        <button className="demo-ctrl-btn" onClick={() => doRestart(channelRef.current)}>Replay</button>
      </div>

      {/* Result banner */}
      {resultHtml && (
        <div className="demo-result">
          <div dangerouslySetInnerHTML={{ __html: resultHtml }} />
        </div>
      )}
    </section>
  )
}
