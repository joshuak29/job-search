const li = [{
      "id": 1,
      "title": "Angular Developer",
      "organization": "Vue and Me",
      "degree": "Master's",
      "jobType": "Intern",
      "locations": ["Lisbon"],
      "minimumQualifications": [
        "Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives",
        "Morph bricks-and-clicks relationships, whiteboard one-to-one experiences, and innovate distributed schemas",
        "Drive intuitive deliverables, exploit vertical users, and optimize interactive e-commerce",
        "Embrace sticky infrastructures, incubate B2C portals, and drive killer applications"
      ],
      "preferredQualifications": [
        "Mesh wireless metrics, syndicate innovative markets, and disintermediate intuitive niches",
        "Matrix next-generation vortals, cultivate virtual relationships, and unleash wireless platforms",
        "Brand granular roi, transform mission-critical users, and target value-added models",
        "Envisioneer b2b web services, aggregate clicks-and-mortar architectures, and target synergistic initiatives"
      ],
      "description": [
        "Away someone forget effect wait land.",
        "State even create can either. Character almost turn idea born its to. Understand ability another lose. Smile interesting claim difference.",
        "Author act increase worry yeah. Positive medical shake include serious check state."
      ],
      "dateAdded": "2021-07-04"
    },
    {
      "id": 2,
      "title": "Java Coder",
      "organization": "VueTube",
      "degree": "Bachelor's",
      "jobType": "Part-time",
      "locations": ["Buenos Aires", "Oslo"],
      "minimumQualifications": [
        "Redefine ubiquitous supply-chains, whiteboard 24/365 channels, and repurpose dynamic action-items",
        "Brand mission-critical paradigms, engage enterprise technologies, and re-intermediate sticky mindshare",
        "Incubate b2c users, repurpose leading-edge convergence, and extend frictionless technologies",
        "Orchestrate clicks-and-mortar portals, revolutionize turn-key convergence, and expedite bricks-and-clicks action-items"
      ],
      "preferredQualifications": [
        "Synergize real-time infrastructures, matrix e-business e-tailers, and redefine customized action-items",
        "Syndicate front-end e-business, optimize granular action-items, and implement best-of-breed technologies",
        "Facilitate impactful functionalities, extend holistic users, and maximize 24/7 deliverables"
      ],
      "description": [
        "Form wind put day inside. Say stand apply full boy speak. Memory remain room finish phone. Nation movement place.",
        "Top person value season. Key best line safe break then. Single music just country.",
        "Green as something when. Heavy PM head both rate mouth drug nation."
      ],
      "dateAdded": "2021-06-19"
    },
    {
      "id": 3,
      "title": "Svelte Ninja",
      "organization": "Vue Can Do It",
      "degree": "Ph.D.",
      "jobType": "Full-time",
      "locations": ["Yokohama", "The Hague", "Stockholm", "Ottawa"],
      "minimumQualifications": [
        "Expedite cross-platform initiatives, empower user-centric models, and revolutionize bleeding-edge e-tailers",
        "Incubate bricks-and-clicks supply-chains, empower B2B mindshare, and extend integrated functionalities",
        "Expedite rich convergence, embrace interactive web-readiness, and optimize value-added portals"
      ],
      "preferredQualifications": [
        "Unleash granular channels, redefine best-of-breed initiatives, and seize efficient ROI",
        "Transform revolutionary vortals, enhance cross-platform partnerships, and revolutionize robust convergence",
        "Embrace compelling relationships, enable scalable solutions, and whiteboard front-end synergies",
        "Brand ubiquitous markets, exploit 24/7 functionalities, and redefine sticky schemas"
      ],
      "description": [
        "Page significant democratic. Check pretty toward beat church perform.",
        "Know detail cold degree scene popular then. Maybe result close wall town perhaps.",
        "Perhaps particularly easy mean black ever professional. Republican physical my effort close admit."
      ],
      "dateAdded": "2021-01-04"
    },
    {
      "id": 4,
      "title": "Software Designer",
      "organization": "VueTube",
      "degree": "Master's",
      "jobType": "Part-time",
      "locations": ["Memphis", "Hong Kong"],
      "minimumQualifications": [
        "Expedite global experiences, utilize virtual niches, and syndicate cross-platform niches",
        "Harness impactful roi, drive one-to-one architectures, and repurpose synergistic web-readiness",
        "Extend e-business action-items, matrix front-end e-business, and drive clicks-and-mortar web-readiness",
        "Generate frictionless action-items, engage out-of-the-box functionalities, and utilize real-time paradigms"
      ],
      "preferredQualifications": [
        "Drive vertical mindshare, evolve granular technologies, and benchmark web-enabled channels",
        "Architect turn-key initiatives, grow frictionless convergence, and maximize one-to-one action-items",
        "Mesh efficient systems, target mission-critical ROI, and monetize extensible vortals",
        "Benchmark extensible architectures, innovate virtual networks, and incentivize dot-com e-services"
      ],
      "description": [
        "Everything always surface prepare level center happen. Nothing out investment crime arm nor event.",
        "My whose art simply range garden police nor. Firm series difference help new. Pretty response government big will travel certainly. Stuff ok simple eight.",
        "Set race best the during. Mean two yes door effect near."
      ],
      "dateAdded": "2021-04-02"
    }] 

const jobs1 = li.filter((jobs) => ["Java Coder", "Svelte Ninja"].includes(jobs.title))

console.log(jobs1)