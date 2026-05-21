// Physics curriculum reference data (from Physics_Design_Reference.docx)
// Year 11 (M5), Year 12 (M6), Year 13 (M7)
// Each unit has unique color used for headers, borders, identity across materials.

window.PHYSICS_DATA = {
  years: [
    {
      id: "m5",
      code: "M5",
      label: "Year 11",
      title: "Mechanics & Thermodynamics",
      blurb: "Cambridge A-level style with Lao curriculum alignment",
      units: [
        {
          id: "u1", num: "U1", name: "Kinematics", color: "#60A5FA",
          chapters: [
            { num: "1", title: "Introduction to Motion & Uniform Linear Motion", sim: "Velocity-time graph builder, uniform motion animation", file: "sims/uniform-motion.html" },
            { num: "2", title: "Accelerated & Decelerated Linear Motion", sim: "Kinematic equations solver, free-fall simulator", file: "sims/accelerated-motion.html" },
            { num: "3", title: "Projectile Motion", sim: "Launch angle & speed → trajectory arc", star: true, file: "sims/projectile-motion.html" },
          ],
        },
        {
          id: "u2", num: "U2", name: "Dynamics", color: "#F97316",
          chapters: [
            { num: "4", title: "Concept of Force & Vector Operations", sim: "Drag-and-drop force vector addition tool", file: "sims/force-vectors.html" },
            { num: "5", title: "Newton's Laws of Motion", sim: "F=ma interactive: vary F and m → see acceleration", file: "sims/newtons-second-law.html" },
            { num: "6", title: "Gravitational & Elastic Forces", sim: "Spring stretching: change mass → see extension (Hooke)" },
            { num: "7", title: "Friction Force", sim: "Friction simulator: vary μ, mass, applied force" },
          ],
        },
        {
          id: "u3", num: "U3", name: "Statics", color: "#94A3B8",
          chapters: [
            { num: "8", title: "Moment of a Force & Torque", sim: "Seesaw balance: place weights at different positions" },
            { num: "9", title: "Equilibrium of Objects" },
            { num: "10", title: "Couple Forces" },
          ],
        },
        {
          id: "u4", num: "U4", name: "Applied Dynamics", color: "#FBBF24",
          chapters: [
            { num: "11", title: "Motion on Flat & Inclined Surfaces", sim: "Inclined plane: vary angle, μ → see acceleration & forces" },
            { num: "12", title: "Vertical Motion by Force", sim: "Lift/elevator simulator: feel apparent weight changes" },
            { num: "13", title: "Systems of Connected Objects", sim: "Atwood machine: two masses over pulley", star: true },
          ],
        },
        {
          id: "u5", num: "U5", name: "Momentum", color: "#8B5CF6",
          chapters: [
            { num: "14", title: "Momentum & Conservation", sim: "Collision simulator: elastic vs inelastic, vary masses" },
            { num: "15", title: "Action-Reaction & Applications", sim: "Rocket recoil: launch speed → rocket recoil speed" },
          ],
        },
        {
          id: "u6", num: "U6", name: "Work & Energy", color: "#EAB308",
          chapters: [
            { num: "16", title: "Work, Energy & Power", sim: "Roller coaster energy converter: PE↔KE interactive", star: true },
          ],
        },
        {
          id: "u7", num: "U7", name: "Heat & Thermodynamics", color: "#F87171",
          chapters: [
            { num: "17", title: "Heat & Temperature" },
            { num: "18", title: "Quantity of Heat & Specific Heat Capacity", sim: "Calorimetry mixer: two materials → find equilibrium temp" },
            { num: "19", title: "Heat Transfer", sim: "Thermos flask cross-section: conduction/convection/radiation" },
            { num: "20", title: "Thermal Expansion", sim: "Bimetallic strip: change temp → see bending" },
            { num: "21", title: "Phase Changes & Latent Heat", sim: "Heating curve: heat water from ice to steam" },
            { num: "22", title: "Gas Laws", sim: "PV=nRT: vary P,V,T with sliders, see graph update", star: true },
            { num: "23", title: "Gas Energy & First Law of Thermodynamics", sim: "P-V diagram: draw isothermal/adiabatic/isobaric processes" },
          ],
        },
      ],
    },
    {
      id: "m6",
      code: "M6",
      label: "Year 12",
      title: "Electricity, Matter & Optics",
      blurb: "Bridging mechanics to electromagnetism and light",
      units: [
        {
          id: "u1", num: "U1", name: "Properties of Matter", color: "#A8A29E",
          chapters: [
            { num: "1", title: "Atomic & Molecular Structure of Matter", sim: "Atom builder: add protons/neutrons/electrons" },
            { num: "2", title: "Phenomena of Liquids", sim: "Capillary rise: change tube radius → see height" },
            { num: "3", title: "Properties of Solids & Liquids", sim: "Stress-strain curve: load a wire → see extension" },
          ],
        },
        {
          id: "u2", num: "U2", name: "Static Electricity", color: "#A3E635",
          chapters: [
            { num: "4", title: "Electric Charges", sim: "Charge by friction/induction: drag charges onto objects" },
            { num: "5", title: "Coulomb's Law", sim: "Two charges: change q₁, q₂, r → see force arrows scale" },
            { num: "6", title: "Electric Field", sim: "Field line visualizer: place charges → see field", star: true },
            { num: "7", title: "Electric Potential & Voltage", sim: "Equipotential map: show V and E field together" },
            { num: "8", title: "Capacitors", sim: "Charging/discharging curve: vary C, R → see time constant" },
          ],
        },
        {
          id: "u3", num: "U3", name: "DC Electricity", color: "#2DD4BF",
          chapters: [
            { num: "9", title: "Electric Current & EMF" },
            { num: "10", title: "Resistance & Resistors", sim: "I-V graph plotter: ohmic vs non-ohmic components" },
            { num: "11", title: "Electric Circuits", sim: "Circuit builder: add resistors series/parallel, see I,V,R", star: true },
            { num: "12", title: "Electrical Measuring Instruments" },
            { num: "13", title: "Electrical Energy & Power", sim: "Power calculator: sliders for I, R → see P heat" },
          ],
        },
        {
          id: "u4", num: "U4", name: "Electricity in Various Media", color: "#6366F1",
          chapters: [
            { num: "14", title: "Conduction in Non-Metallic Media", sim: "p-n junction: apply forward/reverse bias → see I-V curve", star: true },
          ],
        },
        {
          id: "u5", num: "U5", name: "Geometric Optics", color: "#A78BFA",
          chapters: [
            { num: "15", title: "Nature & Speed of Light" },
            { num: "16", title: "Reflection & Refraction", sim: "Snell's law: change n₁,n₂,angle → see refracted ray live" },
            { num: "17", title: "Lenses", sim: "Lens ray diagram: move object position → image moves", star: true },
            { num: "18", title: "Optical Instruments", sim: "Eye defect simulator: myopia/hyperopia + correction lens" },
          ],
        },
      ],
    },
    {
      id: "m7",
      code: "M7",
      label: "Year 13",
      title: "Advanced Physics",
      blurb: "Waves, electromagnetism, modern & nuclear physics",
      units: [
        {
          id: "u1", num: "U1", name: "Circular & Rotational Motion", color: "#84CC16",
          chapters: [
            { num: "1", title: "Circular Motion", sim: "Ball on string: vary speed/radius → centripetal force", star: true },
            { num: "2", title: "Rotational Dynamics & Energy", sim: "Spinning skater: pull arms in → watch ω increase" },
          ],
        },
        {
          id: "u2", num: "U2", name: "Simple Harmonic Motion", color: "#FB7185",
          chapters: [
            { num: "3", title: "SHM Fundamentals", sim: "Pendulum clock: vary length, amplitude → see period", star: true },
            { num: "4", title: "SHM Equations & Graphs", sim: "x-t, v-t, a-t graphs of SHM animated together" },
            { num: "5", title: "Energy in SHM", sim: "Spring-mass: KE↔PE exchange animated in real time" },
          ],
        },
        {
          id: "u3", num: "U3", name: "Waves", color: "#22D3EE",
          chapters: [
            { num: "6", title: "Wave Motion Fundamentals", sim: "Wave on rope: vary f, A, λ → see wave travel", star: true },
            { num: "7", title: "Properties of Waves", sim: "Two-source interference: constructive/destructive patterns" },
            { num: "8", title: "Standing Waves", sim: "String fixed at both ends: harmonics visualizer" },
          ],
        },
        {
          id: "u4", num: "U4", name: "Sound", color: "#1E40AF",
          chapters: [
            { num: "9", title: "Sound Wave Fundamentals", sim: "Waveform visualizer: frequency → pitch, amplitude → volume" },
            { num: "10", title: "Properties of Sound", sim: "Doppler effect: move source/observer → hear pitch shift" },
            { num: "11", title: "Sound Phenomena", sim: "Resonance in closed/open pipe: change length → harmonics" },
          ],
        },
        {
          id: "u5", num: "U5", name: "Electromagnetism", color: "#7C3AED",
          chapters: [
            { num: "12", title: "Magnetic Field", sim: "Field lines around bar magnet and solenoid visualizer" },
            { num: "13", title: "Magnetic Force on Moving Charges", sim: "Charged particle in B field: q,v,B → circular motion" },
            { num: "14", title: "Electromagnetic Induction", sim: "Faraday's law: move magnet into coil → see voltage", star: true },
            { num: "15", title: "Electromagnetic Devices", sim: "DC motor cross-section: interactive coil rotation animation" },
          ],
        },
        {
          id: "u6", num: "U6", name: "Alternating Current", color: "#C026D3",
          chapters: [
            { num: "16", title: "AC Fundamentals", sim: "AC waveform: vary f, A → see oscilloscope trace", star: true },
            { num: "17", title: "Power in AC Circuits" },
            { num: "18", title: "AC Circuit Components", sim: "R, L, C phase diagrams: interactive phasor rotation" },
            { num: "19", title: "RLC Circuit at Resonance", sim: "RLC resonance: vary f → see current peak at resonance" },
          ],
        },
        {
          id: "u7", num: "U7", name: "EM Waves", color: "#64748B",
          chapters: [
            { num: "20", title: "Electromagnetic Waves" },
            { num: "21", title: "Properties of EM Waves", sim: "EM spectrum slider: explore each band's wavelength/frequency" },
          ],
        },
        {
          id: "u8", num: "U8", name: "Light Waves", color: "#FCD34D",
          chapters: [
            { num: "22", title: "Light Wave Fundamentals", sim: "Ripple tank: two-slit interference pattern live", star: true },
            { num: "23", title: "Reflection & Refraction" },
            { num: "24", title: "Polarisation & Colour", sim: "Polarisation: rotate polariser → see intensity change" },
          ],
        },
        {
          id: "u9", num: "U9", name: "Atomic Physics", color: "#10B981",
          chapters: [
            { num: "25", title: "Atomic Structure", sim: "Bohr atom: electron jumps → emit/absorb photon colour", star: true },
            { num: "26", title: "Atomic Spectra & Photoelectric Effect", sim: "Photoelectric sim: change frequency → see electrons emitted" },
            { num: "27", title: "Nuclear Reactions" },
          ],
        },
        {
          id: "u10", num: "U10", name: "Nuclear Physics", color: "#DC2626",
          chapters: [
            { num: "28", title: "Radioactive Decay", sim: "Decay simulator: N₀ atoms → see exponential decay curve", star: true },
            { num: "29", title: "Nuclear Reactions" },
            { num: "30", title: "Uses of Radioactivity" },
          ],
        },
      ],
    },
  ],
};

// Convenience: compute counts on each unit
(function annotate() {
  for (const y of window.PHYSICS_DATA.years) {
    let yChapters = 0, ySims = 0, yStars = 0;
    for (const u of y.units) {
      u.chapterCount = u.chapters.length;
      u.simCount = u.chapters.filter(c => c.sim).length;
      u.starCount = u.chapters.filter(c => c.star).length;
      yChapters += u.chapterCount;
      ySims += u.simCount;
      yStars += u.starCount;
    }
    y.chapterCount = yChapters;
    y.simCount = ySims;
    y.starCount = yStars;
    y.unitCount = y.units.length;
  }
})();
