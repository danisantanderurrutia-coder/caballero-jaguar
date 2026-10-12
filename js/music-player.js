/* ==========================================================================
   CABALLERO JAGUAR - MOTOR MUSICAL PROCEDURAL & PAISAJES SONOROS V2
   Síntesis Polifónica Web Audio API con 7 Estilos Temáticos & Secuenciador
   ========================================================================== */

class JaguarAmbientPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrackId = "templo_jaguar";
    this.volume = 0.45;
    this.muted = false;

    // Nodos de la cadena de masterización
    this.masterGain = null;
    this.delayNode = null;
    this.delayGain = null;
    this.compressor = null;
    this.analyser = null;

    // Registro de osciladores, buffers y temporizadores activos
    this.activeNodes = [];
    this.backgroundSources = [];
    this.schedulerTimer = null;
    this.visualizerTimer = null;

    // Variables del secuenciador
    this.tempoBpm = 74;
    this.currentStep = 0;
    this.currentBar = 0;
    this.nextNoteTime = 0;
    this.lookaheadMs = 35;
    this.scheduleAheadSec = 0.12;

    // Catálogo de estilos musicales con metadatos
    this.tracks = [
      {
        id: "templo_jaguar",
        emoji: "🐆",
        title: "Templo del Rey Jaguar",
        genre: "Prehispánico Mexica • Tambores & Flauta",
        desc: "Tambores rituales Huehuetl, percusión Teponaztli y flautas de barro sagradas. Ideal para despertar disciplina y vigor guerrero.",
        bpm: 74
      },
      {
        id: "loffler_deep",
        emoji: "🌲",
        title: "Christian Löffler • Bosque Báltico",
        genre: "Deep Ambient Melódico • Piano de Fieltro & Micro-beat",
        desc: "Acordes melancólicos de piano de fieltro con sutil beat 4/4 orgánico y shakers de bosque. Enfoque creativo fluido.",
        bpm: 115
      },
      {
        id: "bohemia_tavern",
        emoji: "⚔️",
        title: "Taberna de Bohemia (KCD)",
        genre: "Folk Medieval • Laúd Acústico & Flauta de Madera",
        desc: "Arpegios nobles de laúd renacentista, flauta de madera y calidez de chimenea de posada. Para lectura y descanso de caballería.",
        bpm: 92
      },
      {
        id: "cyberpunk_focus",
        emoji: "🌆",
        title: "Cyberpunk 2077 • Neón Focus",
        genre: "Synthwave / Darksynth • Arpegio Analógico Nocturno",
        desc: "Bajo rodante en semicorcheas, pads análogos Blade Runner y pulso retrofuturista. Diseñado para sesiones de código y Pomodoro.",
        bpm: 112
      },
      {
        id: "baroque_imperial",
        emoji: "🎻",
        title: "Cámara Barroca Imperial (Bach)",
        genre: "Clásico Barroco • Violonchelo & Clavecín",
        desc: "Contrapunto noble en Re menor y bajo continuo de violonchelo. Máximo rigor intelectual para redacción de tesis y matemáticas.",
        bpm: 64
      },
      {
        id: "chillhop_rhodes",
        emoji: "☕",
        title: "Lo-Fi Chillhop Caballero",
        genre: "Lo-Fi Jazz • Teclado Rhodes & Vinilo Cálido",
        desc: "Crujido de aguja de vinilo analógico, acordes de piano Rhodes con trémolo suave y ritmo relajado. Para finanzas y orden diario.",
        bpm: 72
      },
      {
        id: "santuario_432",
        emoji: "🌧️",
        title: "Santuario Somático • 432 Hz",
        genre: "Terapia de Sonido • Lluvia Selvática & Cuencos Tibetanos",
        desc: "Gotas de lluvia sobre hojas de la selva maya, campanas tibetanas afinadas a 432 Hz y drone somático para meditación profunda.",
        bpm: 45
      }
    ];

    // Recuperar volumen persistido
    try {
      const savedVol = localStorage.getItem("jaguar_music_volume");
      if (savedVol !== null) this.volume = parseFloat(savedVol);
      const savedTrack = localStorage.getItem("jaguar_music_track");
      if (savedTrack && this.tracks.some(t => t.id === savedTrack)) {
        this.currentTrackId = savedTrack;
      }
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     INICIALIZACIÓN DEL MOTOR DE AUDIO
     -------------------------------------------------------------------------- */
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();

      // Compresor/Limitador de seguridad
      this.compressor = this.audioCtx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, this.audioCtx.currentTime);
      this.compressor.knee.setValueAtTime(30, this.audioCtx.currentTime);
      this.compressor.ratio.setValueAtTime(8, this.audioCtx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

      // Analizador para ecualizador visualizador UI
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      // Ganancia Maestra
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      // Efecto Espacial: Stereo Delay / Reverb suave
      this.delayNode = this.audioCtx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.36, this.audioCtx.currentTime);
      this.delayGain = this.audioCtx.createGain();
      this.delayGain.gain.setValueAtTime(0.28, this.audioCtx.currentTime);
      const delayFilter = this.audioCtx.createBiquadFilter();
      delayFilter.type = "lowpass";
      delayFilter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayGain);
      this.delayGain.connect(this.delayNode); // feedback
      this.delayGain.connect(this.compressor);

      // Encadenamiento
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }
  }

  /* --------------------------------------------------------------------------
     CONTROL DE REPRODUCCIÓN (PLAY, PAUSE, TOGGLE, TRACK SELECT)
     -------------------------------------------------------------------------- */
  togglePlay() {
    this.initAudio();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.initAudio();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.stopActiveNodes();
    this.isPlaying = true;

    const track = this.getTrack(this.currentTrackId);
    this.tempoBpm = track.bpm;
    this.currentStep = 0;
    this.currentBar = 0;
    this.nextNoteTime = this.audioCtx.currentTime + 0.05;

    // Iniciar capas continuas de fondo (lluvia, pads, vinilo, fuego)
    this.startBackgroundLayer(this.currentTrackId);

    // Iniciar el secuenciador procedural
    this.schedulerTimer = setInterval(() => this.scheduler(), this.lookaheadMs);

    // Iniciar animación del ecualizador en la UI
    this.startVisualizer();

    this.updateUI();
  }

  pause() {
    this.isPlaying = false;
    this.stopActiveNodes();
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.stopVisualizer();
    this.updateUI();
  }

  stop() {
    this.pause();
  }

  selectTrack(trackId) {
    if (!this.tracks.some(t => t.id === trackId)) return;
    const wasPlaying = this.isPlaying;
    this.currentTrackId = trackId;
    try { localStorage.setItem("jaguar_music_track", trackId); } catch (e) {}

    if (wasPlaying) {
      this.play();
    } else {
      this.updateUI();
    }
  }

  nextTrack() {
    const idx = this.tracks.findIndex(t => t.id === this.currentTrackId);
    const nextIdx = (idx + 1) % this.tracks.length;
    this.selectTrack(this.tracks[nextIdx].id);
  }

  prevTrack() {
    const idx = this.tracks.findIndex(t => t.id === this.currentTrackId);
    const prevIdx = (idx - 1 + this.tracks.length) % this.tracks.length;
    this.selectTrack(this.tracks[prevIdx].id);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, parseFloat(vol)));
    try { localStorage.setItem("jaguar_music_volume", this.volume); } catch (e) {}
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.audioCtx.currentTime);
    }
    const volValEl = document.getElementById("ambient-vol-val");
    if (volValEl) volValEl.innerText = Math.round(this.volume * 100) + "%";
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.audioCtx.currentTime);
    }
    this.updateUI();
  }

  getTrack(trackId) {
    return this.tracks.find(t => t.id === trackId) || this.tracks[0];
  }

  stopActiveNodes() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];

    this.backgroundSources.forEach(source => {
      try {
        if (source.stop) source.stop();
        if (source.disconnect) source.disconnect();
      } catch (e) {}
    });
    this.backgroundSources = [];
  }

  /* --------------------------------------------------------------------------
     SECUENCIADOR RELOJ (LOOKAHEAD SCHEDULING CHRIS WILSON PATTERN)
     -------------------------------------------------------------------------- */
  scheduler() {
    if (!this.isPlaying || !this.audioCtx) return;

    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadSec) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }
  }

  advanceStep() {
    const secondsPerBeat = 60.0 / this.tempoBpm;
    // Cada paso del secuenciador es una semicorchea (1/4 de tiempo)
    this.nextNoteTime += 0.25 * secondsPerBeat;
    this.currentStep = (this.currentStep + 1) % 16;
    if (this.currentStep === 0) {
      this.currentBar = (this.currentBar + 1) % 8;
    }
  }

  scheduleStep(step, time) {
    switch (this.currentTrackId) {
      case "templo_jaguar":
        this.stepTemploJaguar(step, time);
        break;
      case "loffler_deep":
        this.stepLofflerDeep(step, time);
        break;
      case "bohemia_tavern":
        this.stepBohemiaTavern(step, time);
        break;
      case "cyberpunk_focus":
        this.stepCyberpunkFocus(step, time);
        break;
      case "baroque_imperial":
        this.stepBaroqueImperial(step, time);
        break;
      case "chillhop_rhodes":
        this.stepChillhopRhodes(step, time);
        break;
      case "santuario_432":
        this.stepSantuario432(step, time);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     1. TEMPLO DEL REY JAGUAR (Música Prehispánica: Huehuetl, Teponaztli, Flauta)
     -------------------------------------------------------------------------- */
  stepTemploJaguar(step, time) {
    // Huehuetl (Bombo profundo ritual): pasos 0, 6, 10, 14 (ritmo ceremonial guerrero)
    if (step === 0 || step === 6 || step === 10 || step === 14) {
      const accent = step === 0 ? 0.45 : 0.28;
      this.triggerDrum(time, 130, 42, 0.45, accent);
    }

    // Teponaztli (Bloque de madera hueco): pasos 4, 8, 12
    if (step === 4 || step === 8 || step === 12) {
      const freq = step === 4 ? 360 : (step === 8 ? 480 : 360);
      this.triggerWoodBlock(time, freq, 0.16, 0.18);
    }

    // Ayacachtli (Maraca de semillas ritual): semicorcheas suaves
    if (step % 2 === 0) {
      this.triggerShaker(time, 0.04, 0.06);
    }

    // Flauta de Barro Sagrada (Escala pentatónica menor Mexica: A3, C4, D4, E4, G4, A4)
    const fluteNotes = [220, 261.63, 293.66, 329.63, 392.00, 440.00];
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      if (Math.random() > 0.3) {
        const noteIdx = Math.floor(Math.random() * fluteNotes.length);
        const freq = fluteNotes[noteIdx];
        this.triggerClayFlute(time, freq, 0.65, 0.14);
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. CHRISTIAN LÖFFLER • BOSQUE BÁLTICO (Deep Ambient, Felt Piano, Micro-Beats)
     -------------------------------------------------------------------------- */
  stepLofflerDeep(step, time) {
    // 4/4 Deep Organic Kick suave (pasos 0, 4, 8, 12)
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      this.triggerDrum(time, 88, 38, 0.32, 0.22);
    }

    // Organic Wood Shaker / Twig Click en contratiempos (pasos 2, 6, 10, 14)
    if (step === 2 || step === 6 || step === 10 || step === 14) {
      this.triggerShaker(time, 0.05, 0.09);
    }

    // Felt Piano (Acordes melancólicos de Christian Löffler: Am9 -> Fmaj7 -> Cmaj7 -> Em7)
    // Cambia de acorde cada 2 compases (bar % 4)
    const chordIdx = Math.floor(this.currentBar % 4);
    const chords = [
      [220, 261.63, 329.63, 392.00, 493.88], // Am9 (A, C, E, G, B)
      [174.61, 220, 261.63, 329.63],         // Fmaj7 (F, A, C, E)
      [130.81, 196.00, 261.63, 329.63],      // Cmaj7 (C, G, C, E)
      [164.81, 196.00, 246.94, 293.66]       // Em7 (E, G, B, D)
    ];

    if (step === 0 || step === 8) {
      const currentChord = chords[chordIdx];
      currentChord.forEach((f, i) => {
        // Ligero arpegio o strumming orgánico
        this.triggerFeltPiano(time + (i * 0.025), f, 0.85, 0.09);
      });
    }

    // Melodía etérea dispersa de piano en agudos
    if (step === 3 || step === 7 || step === 11) {
      if (Math.random() > 0.4) {
        const melodicNotes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
        const note = melodicNotes[Math.floor(Math.random() * melodicNotes.length)];
        this.triggerFeltPiano(time, note, 0.45, 0.06);
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. TABERNA DE BOHEMIA (Kingdom Come Deliverance • Laúd Medieval & Flauta)
     -------------------------------------------------------------------------- */
  stepBohemiaTavern(step, time) {
    // Patrón arpegiado de laúd renacentista (Modo Re Dórico: D3, F3, A3, D4, E4, F4)
    const lutePatterns = [
      [146.83, 220.00, 293.66, 349.23], // D, A, D4, F4
      [174.61, 220.00, 261.63, 349.23], // F, A, C, F
      [196.00, 246.94, 293.66, 392.00], // G, B, D, G
      [220.00, 261.63, 329.63, 440.00]  // A, C, E, A
    ];
    const patIdx = Math.floor(this.currentBar % 4);
    const pat = lutePatterns[patIdx];

    // Pulsaciones del laúd en arpegio 6/8 renacentista
    if (step % 2 === 0) {
      const noteIdx = (step / 2) % pat.length;
      const freq = pat[noteIdx];
      this.triggerLute(time, freq, 0.38, 0.16);
    }

    // Pandereta / Tamboril medieval ligero en pasos 0 y 8
    if (step === 0 || step === 8) {
      this.triggerDrum(time, 160, 65, 0.25, 0.15);
    }
    if (step === 4 || step === 12) {
      this.triggerShaker(time, 0.06, 0.07);
    }

    // Flauta de madera medieval (frases melódicas nobles)
    if (step === 0 || step === 6 || step === 10) {
      if (Math.random() > 0.45) {
        const whistleScale = [440.00, 493.88, 523.25, 587.33, 659.25]; // A4, B4, C5, D5, E5
        const f = whistleScale[Math.floor(Math.random() * whistleScale.length)];
        this.triggerWoodWhistle(time, f, 0.5, 0.12);
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. CYBERPUNK 2077 • NEÓN FOCUS (Synthwave Arpeggiado & Retrowave Drive)
     -------------------------------------------------------------------------- */
  stepCyberpunkFocus(step, time) {
    // Bajo analógico rodante en semicorcheas (Rolling 16th Bassline)
    // Acordes: E1 -> C1 -> D1 -> B0
    const bassRoots = [82.41, 65.41, 73.42, 61.74]; // E2, C2, D2, B1
    const root = bassRoots[Math.floor(this.currentBar % 4)];
    const octaveMult = (step % 4 === 0) ? 1 : 2; // Salto de octava rítmico
    const bassFreq = root * octaveMult;

    this.triggerSynthBass(time, bassFreq, 0.18, 0.2);

    // Caja / Snare 80s con reverb en pasos 4 y 12
    if (step === 4 || step === 12) {
      this.triggerSnare80s(time, 0.22);
    }

    // Kick contundente en pasos 0 y 8
    if (step === 0 || step === 8) {
      this.triggerDrum(time, 140, 45, 0.22, 0.35);
    }

    // Hi-hat electro nítido en contratiempos (pasos 2, 6, 10, 14)
    if (step % 2 !== 0) {
      this.triggerHiHat(time, 0.03, 0.08);
    }

    // Acorde Blade Runner Synth Pad en compás 0 y 8
    if (step === 0) {
      const synthChords = [
        [164.81, 196.00, 246.94, 329.63], // Em (E, G, B, E)
        [130.81, 164.81, 196.00, 261.63], // Cmaj (C, E, G, C)
        [146.83, 220.00, 293.66, 369.99], // D (D, A, D, F#)
        [123.47, 185.00, 246.94, 329.63]  // Bm (B, F#, B, D)
      ];
      const chord = synthChords[Math.floor(this.currentBar % 4)];
      chord.forEach(f => {
        this.triggerNeonPad(time, f, 1.4, 0.08);
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. CÁMARA BARROCA IMPERIAL (Bach • Violonchelo & Clavecín Noble)
     -------------------------------------------------------------------------- */
  stepBaroqueImperial(step, time) {
    // Progresión clásica de contrapunto barroco en D menor
    const celloBassline = [
      [73.42, 110.00], // D2, A2
      [87.31, 130.81], // F2, C3
      [98.00, 146.83], // G2, D3
      [110.00, 164.81] // A2, E3
    ];
    const barIdx = Math.floor(this.currentBar % 4);

    // Cello Basso Continuo: notas solemnes con ataque de arco
    if (step === 0 || step === 8) {
      const note = celloBassline[barIdx][step === 0 ? 0 : 1];
      this.triggerCello(time, note, 1.2, 0.22);
    }

    // Clavecín / Cuerdas renacentistas en contrapunto (pasos pares)
    if (step % 2 === 0) {
      const harpsichordScale = [293.66, 329.63, 349.23, 392.00, 440.00, 523.25, 587.33]; // D Dorian
      const noteIdx = (step + (this.currentBar * 2)) % harpsichordScale.length;
      const freq = harpsichordScale[noteIdx];
      this.triggerHarpsichord(time, freq, 0.28, 0.12);
    }
  }

  /* --------------------------------------------------------------------------
     6. LO-FI CHILLHOP CABALLERO (Vinilo & Piano Rhodes Cálido)
     -------------------------------------------------------------------------- */
  stepChillhopRhodes(step, time) {
    // Kick lofi suave y acolchado en pasos 0 y 7 (ritmo lofi sincopado)
    if (step === 0 || step === 7) {
      this.triggerDrum(time, 100, 42, 0.35, 0.24);
    }

    // Rimshot / Snare relajado con swing en pasos 4 y 12
    if (step === 4 || step === 12) {
      this.triggerRimshot(time, 0.16);
    }

    // Hi-hat lofi con swing
    if (step % 2 === 0) {
      this.triggerShaker(time, 0.04, 0.06);
    }

    // Acordes Rhodes de Jazz relajado: Dmaj9 -> Bm9 -> Em9 -> A13
    if (step === 0 || step === 8) {
      const rhodesChords = [
        [146.83, 220.00, 277.18, 329.63, 440.00], // Dmaj9 (D, A, C#, E, A)
        [123.47, 185.00, 220.00, 277.18, 369.99], // Bm9 (B, F#, A, C#, F#)
        [164.81, 196.00, 246.94, 293.66, 392.00], // Em9 (E, G, B, D, G)
        [110.00, 164.81, 220.00, 277.18, 349.23]  // A13 (A, E, A, C#, F)
      ];
      const chord = rhodesChords[Math.floor(this.currentBar % 4)];
      chord.forEach((f, idx) => {
        this.triggerRhodes(time + (idx * 0.018), f, 0.9, 0.14);
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. SANTUARIO SOMÁTICO (Lluvia Selvática, Drone Om 54Hz & Campana 432 Hz)
     -------------------------------------------------------------------------- */
  stepSantuario432(step, time) {
    // Campana / Cuenco Tibetano sagrado a 432 Hz cada 16 pasos (~12-14 segundos)
    if (step === 0 && this.currentBar % 2 === 0) {
      this.triggerSingingBowl432(time, 432, 5.5, 0.28);
    }

    // Gota de lluvia que cae sobre una hoja ancha de la selva
    if (Math.random() > 0.4) {
      const dropFreq = 600 + Math.random() * 800;
      this.triggerWaterDrop(time + (Math.random() * 0.2), dropFreq, 0.08, 0.08);
    }
  }

  /* --------------------------------------------------------------------------
     CAPAS CONTINUAS DE FONDO (DRONES, LLUVIA SELVÁTICA, CRUJIDO VINILO)
     -------------------------------------------------------------------------- */
  startBackgroundLayer(trackId) {
    if (!this.audioCtx) return;

    if (trackId === "santuario_432") {
      // 1. Generador de Lluvia Selvática Estéreo (Ruido Rosa Filtrado)
      const bufferSize = this.audioCtx.sampleRate * 3;
      const buffer = this.audioCtx.createBuffer(2, bufferSize, this.audioCtx.sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const data = buffer.getChannelData(channel);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.15;
        }
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const rainFilter = this.audioCtx.createBiquadFilter();
      rainFilter.type = "lowpass";
      rainFilter.frequency.setValueAtTime(1100, this.audioCtx.currentTime);

      const rainGain = this.audioCtx.createGain();
      rainGain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);

      noise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.masterGain);

      noise.start();
      this.backgroundSources.push(noise, rainFilter, rainGain);

      // 2. Drone Somático en 54 Hz (432 / 8) y 108 Hz
      const droneOsc = this.audioCtx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(54, this.audioCtx.currentTime);

      const droneGain = this.audioCtx.createGain();
      droneGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

      droneOsc.connect(droneGain);
      droneGain.connect(this.masterGain);

      droneOsc.start();
      this.backgroundSources.push(droneOsc, droneGain);

    } else if (trackId === "chillhop_rhodes") {
      // Crujido de vinilo vintage analógico
      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Pops aleatorios de aguja
        const isCrack = Math.random() < 0.002;
        data[i] = isCrack ? (Math.random() * 2 - 1) * 0.4 : (Math.random() * 2 - 1) * 0.015;
      }

      const vinyl = this.audioCtx.createBufferSource();
      vinyl.buffer = buffer;
      vinyl.loop = true;

      const vinylFilter = this.audioCtx.createBiquadFilter();
      vinylFilter.type = "bandpass";
      vinylFilter.frequency.setValueAtTime(2400, this.audioCtx.currentTime);
      vinylFilter.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

      const vinylGain = this.audioCtx.createGain();
      vinylGain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);

      vinyl.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(this.masterGain);

      vinyl.start();
      this.backgroundSources.push(vinyl, vinylFilter, vinylGain);

    } else if (trackId === "bohemia_tavern") {
      // Crepitar de chimenea de taberna de madera
      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const isPop = Math.random() < 0.0035;
        data[i] = isPop ? (Math.random() * 2 - 1) * 0.35 : (Math.random() * 2 - 1) * 0.012;
      }

      const fire = this.audioCtx.createBufferSource();
      fire.buffer = buffer;
      fire.loop = true;

      const fireFilter = this.audioCtx.createBiquadFilter();
      fireFilter.type = "lowpass";
      fireFilter.frequency.setValueAtTime(800, this.audioCtx.currentTime);

      const fireGain = this.audioCtx.createGain();
      fireGain.gain.setValueAtTime(0.14, this.audioCtx.currentTime);

      fire.connect(fireFilter);
      fireFilter.connect(fireGain);
      fireGain.connect(this.masterGain);

      fire.start();
      this.backgroundSources.push(fire, fireFilter, fireGain);
    }
  }

  /* --------------------------------------------------------------------------
     SINTETIZADORES DE INSTRUMENTOS (VOICES & SYNTH ENGINES)
     -------------------------------------------------------------------------- */
  
  // 1. Bombo Ritual / Huehuetl / Kick
  triggerDrum(time, startFreq, endFreq, decay, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + decay);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + decay);
    this.activeNodes.push(osc, gain);
  }

  // 2. Bloque de Madera / Teponaztli
  triggerWoodBlock(time, freq, decay, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq, time);
    filter.Q.setValueAtTime(6.0, time);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + decay);
    this.activeNodes.push(osc, filter, gain);
  }

  // 3. Shaker Orgánico / Ayacachtli / Semillas
  triggerShaker(time, duration, gainAmt) {
    if (!this.audioCtx) return;
    const bufferSize = Math.floor(this.audioCtx.sampleRate * duration);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(4500, time);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    noise.start(time);
    noise.stop(time + duration);
    this.activeNodes.push(noise, filter, gain);
  }

  // 4. Flauta de Barro Prehispánica con Vibrato
  triggerClayFlute(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const lfo = this.audioCtx.createOscillator();
    const lfoGain = this.audioCtx.createGain();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // LFO para vibrato natural de respiración humana
    lfo.frequency.setValueAtTime(5.0, time);
    lfoGain.gain.setValueAtTime(6.5, time);
    lfo.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(freq * 2.2, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    lfo.start(time);
    osc.stop(time + duration);
    lfo.stop(time + duration);
    this.activeNodes.push(osc, lfo, lfoGain, filter, gain);
  }

  // 5. Felt Piano Estilo Christian Löffler
  triggerFeltPiano(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Filtro cálido que atenúa los armónicos metálicos para sonar como fieltro
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(680, time);
    filter.frequency.exponentialRampToValueAtTime(240, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, filter, gain);
  }

  // 6. Laúd Renacentista / Arpa de Bohemia
  triggerLute(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 1.5, time);
    filter.Q.setValueAtTime(1.8, time);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, filter, gain);
  }

  // 7. Flauta de Madera Medieval (Whistle)
  triggerWoodWhistle(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, gain);
  }

  // 8. Bajo Analógico Synthwave Semicorcheas
  triggerSynthBass(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, time);
    filter.frequency.exponentialRampToValueAtTime(180, time + duration);
    filter.Q.setValueAtTime(4.5, time);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, filter, gain);
  }

  // 9. Neon Blade Runner Pad
  triggerNeonPad(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.006, time); // Chorus detune

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, time);
    filter.Q.setValueAtTime(2.0, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
    this.activeNodes.push(osc1, osc2, filter, gain);
  }

  // 10. Snare Retro 80s
  triggerSnare80s(time, gainAmt) {
    if (!this.audioCtx) return;
    const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.16);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, time);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    noise.start(time);
    noise.stop(time + 0.16);
    this.activeNodes.push(noise, filter, gain);
  }

  // 11. Hi-Hat Retro
  triggerHiHat(time, duration, gainAmt) {
    if (!this.audioCtx) return;
    const bufferSize = Math.floor(this.audioCtx.sampleRate * duration);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    noise.start(time);
    noise.stop(time + duration);
    this.activeNodes.push(noise, filter, gain);
  }

  // 12. Violonchelo Barroco (Cello Basso Continuo)
  triggerCello(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, time);
    filter.Q.setValueAtTime(2.2, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, filter, gain);
  }

  // 13. Clavecín Barroco
  triggerHarpsichord(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "highpass";
    filter.frequency.setValueAtTime(450, time);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, filter, gain);
  }

  // 14. Teclado Rhodes Jazz Lo-Fi
  triggerRhodes(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const bellOsc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Armónico campana metálica típico de los tines de Fender Rhodes
    bellOsc.type = "sine";
    bellOsc.frequency.setValueAtTime(freq * 3.8, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    bellOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    bellOsc.start(time);
    osc.stop(time + duration);
    bellOsc.stop(time + duration);
    this.activeNodes.push(osc, bellOsc, filter, gain);
  }

  // 15. Rimshot Lo-Fi
  triggerRimshot(time, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, time);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + 0.06);
    this.activeNodes.push(osc, gain);
  }

  // 16. Cuenco Tibetano Armónico 432 Hz
  triggerSingingBowl432(time, fundamental, duration, gainAmt) {
    if (!this.audioCtx) return;
    const harmonics = [1, 2.76, 5.4, 8.93];
    const gains = [gainAmt, gainAmt * 0.45, gainAmt * 0.22, gainAmt * 0.08];

    harmonics.forEach((h, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(fundamental * h, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(gains[idx], time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.delayNode);
      gain.connect(this.compressor);

      osc.start(time);
      osc.stop(time + duration);
      this.activeNodes.push(osc, gain);
    });
  }

  // 17. Gota de Agua en la Selva
  triggerWaterDrop(time, freq, duration, gainAmt) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, time + duration);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.delayNode);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration);
    this.activeNodes.push(osc, gain);
  }

  /* --------------------------------------------------------------------------
     ACTUALIZACIÓN VISUAL Y CONTROL DE INTERFAZ DE USUARIO
     -------------------------------------------------------------------------- */
  updateUI() {
    const track = this.getTrack(this.currentTrackId);

    // Botón principal Play / Pause
    const playBtn = document.getElementById("ambient-play-btn");
    if (playBtn) {
      if (this.isPlaying) {
        playBtn.innerHTML = `<span>⏸️</span> <span>Pausar</span>`;
        playBtn.classList.add("playing-gold-glow");
        playBtn.setAttribute("title", "Pausar música: " + track.title);
      } else {
        playBtn.innerHTML = `<span>▶️</span> <span>Ambient</span>`;
        playBtn.classList.remove("playing-gold-glow");
        playBtn.setAttribute("title", "Reproducir: " + track.title);
      }
    }

    // Título y selector de estilo
    const titleEl = document.getElementById("ambient-track-title");
    if (titleEl) {
      titleEl.innerHTML = `${track.emoji} <strong>${track.title}</strong>`;
      titleEl.setAttribute("title", track.genre + " — " + track.desc);
    }

    const genreEl = document.getElementById("ambient-track-genre");
    if (genreEl) {
      genreEl.innerText = track.genre;
    }

    const selectEl = document.getElementById("ambient-track-select");
    if (selectEl && selectEl.value !== this.currentTrackId) {
      selectEl.value = this.currentTrackId;
    }

    // Porcentaje de volumen
    const volValEl = document.getElementById("ambient-vol-val");
    if (volValEl) {
      volValEl.innerText = (this.muted ? "MUTE" : Math.round(this.volume * 100) + "%");
    }

    const volSlider = document.getElementById("ambient-vol-slider");
    if (volSlider && !this.muted) {
      volSlider.value = this.volume;
    }

    // Ecualizador animado
    const eqBars = document.querySelectorAll(".ambient-eq-bar");
    if (eqBars.length > 0) {
      eqBars.forEach(bar => {
        if (this.isPlaying) {
          bar.classList.add("animating");
        } else {
          bar.classList.remove("animating");
          bar.style.height = "3px";
        }
      });
    }
  }

  startVisualizer() {
    if (this.visualizerTimer) clearInterval(this.visualizerTimer);
    const eqBars = document.querySelectorAll(".ambient-eq-bar");
    if (!eqBars || eqBars.length === 0) return;

    this.visualizerTimer = setInterval(() => {
      if (!this.isPlaying || !this.analyser) return;
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);

      eqBars.forEach((bar, i) => {
        const val = dataArray[(i * 2) % dataArray.length] || 0;
        const heightPx = Math.max(3, Math.min(18, Math.round((val / 255) * 18)));
        bar.style.height = heightPx + "px";
      });
    }, 80);
  }

  stopVisualizer() {
    if (this.visualizerTimer) {
      clearInterval(this.visualizerTimer);
      this.visualizerTimer = null;
    }
    const eqBars = document.querySelectorAll(".ambient-eq-bar");
    eqBars.forEach(bar => {
      bar.style.height = "3px";
      bar.classList.remove("animating");
    });
  }
}

// Instancia global del reproductor
const ambientPlayer = new JaguarAmbientPlayer();
window.ambientPlayer = ambientPlayer;

// Inicializar sincronización cuando el DOM esté listo
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    ambientPlayer.updateUI();
  });
}
