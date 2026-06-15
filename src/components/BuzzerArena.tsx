"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Team = "A" | "B";
type RoomStatus = "WAITING" | "RUNNING" | "PAUSED" | "BUZZED" | "BONUS" | "JUDGED" | "TIMEOUT";

type Seat = {
  id: string;
  team: Team;
  slot: string;
  participantName: string | null;
  buzzedAt: string | null;
};

type RoomEvent = {
  id: string;
  type: string;
  message: string;
  createdAt: string;
};

type OrganizerQuestion = {
  id: string;
  category: string;
  questionKind: string;
  format: string;
  prompt: string;
  choices?: string[];
  correctAnswer: string;
  correctLetter: string | null;
};

type BuzzerRoom = {
  code: string;
  role: "organizer" | "participant";
  status: RoomStatus;
  roundNumber: number;
  totalRounds: number;
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  timerDurationMs: number;
  timerElapsedMs: number;
  remainingMs: number;
  buzzedSeat: Pick<Seat, "id" | "team" | "slot" | "participantName"> | null;
  seats: Seat[];
  events: RoomEvent[];
  question: OrganizerQuestion | null;
};

type ReadyRoom = {
  code: string;
  organizerPassword: string;
  shareUrl: string;
  room: BuzzerRoom;
};

type SetupState = {
  teamAName: string;
  teamBName: string;
  totalRounds: number;
  timerMinutes: number;
};

const letters = ["W", "X", "Y", "Z"];
const DEFAULT_SETUP: SetupState = {
  teamAName: "Team A",
  teamBName: "Team B",
  totalRounds: 3,
  timerMinutes: 10
};

function formatTimer(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function eventTime(value: string) {
  return new Date(value).toLocaleTimeString([], { minute: "numeric", second: "2-digit" });
}

function roomTeamName(room: BuzzerRoom, team: Team) {
  return team === "A" ? room.teamAName : room.teamBName;
}

export function BuzzerArena() {
  const [screen, setScreen] = useState<"start" | "setup" | "ready" | "join" | "room">("start");
  const [setupStep, setSetupStep] = useState<1 | 2 | 3>(1);
  const [readyRoom, setReadyRoom] = useState<ReadyRoom | null>(null);
  const [room, setRoom] = useState<BuzzerRoom | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [organizerPassword, setOrganizerPassword] = useState("");
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [setup, setSetup] = useState<SetupState>(DEFAULT_SETUP);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isOrganizer = room?.role === "organizer";
  const seatedSeat = useMemo(
    () => room?.seats.find((seat) => seat.id === selectedSeatId && seat.participantName === participantName) ?? null,
    [participantName, room?.seats, selectedSeatId]
  );
  const canBuzz = Boolean(room && seatedSeat && room.status === "RUNNING" && !room.buzzedSeat);

  const fetchRoom = useCallback(
    async (code = roomCode, password = organizerPassword) => {
      if (!code.trim()) return null;
      const query = password.trim() ? `?password=${encodeURIComponent(password.trim())}` : "";
      const response = await fetch(`/api/buzzer/rooms/${encodeURIComponent(code.trim())}${query}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Room not found.");
      setRoom(payload.room);
      return payload.room as BuzzerRoom;
    },
    [organizerPassword, roomCode]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("room");
    if (code) {
      setRoomCode(code.toUpperCase());
      setScreen("join");
    }
  }, []);

  useEffect(() => {
    if (screen !== "room" || !room?.code) return;
    const timer = window.setInterval(() => {
      fetchRoom(room.code).catch(() => undefined);
    }, 750);
    return () => window.clearInterval(timer);
  }, [fetchRoom, room?.code, screen]);

  async function createRoom() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/buzzer/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamAName: setup.teamAName,
          teamBName: setup.teamBName,
          totalRounds: setup.totalRounds,
          timerMinutes: setup.timerMinutes
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not create game.");
      setReadyRoom(payload);
      setRoomCode(payload.code);
      setOrganizerPassword(payload.organizerPassword);
      setScreen("ready");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create game.");
    } finally {
      setBusy(false);
    }
  }

  async function joinRoom() {
    setBusy(true);
    setError("");
    try {
      const nextRoom = await fetchRoom(roomCode, organizerPassword);
      if (!nextRoom) return;
      if (organizerPassword.trim() && nextRoom.role !== "organizer") {
        throw new Error("That organizer password did not match this room.");
      }
      if (!organizerPassword.trim() && !participantName.trim()) {
        throw new Error("Enter your name to join as a participant.");
      }
      setRoomCode(nextRoom.code);
      setScreen("room");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not join game.");
    } finally {
      setBusy(false);
    }
  }

  async function copy(text: string) {
    await navigator.clipboard?.writeText(text);
  }

  async function act(action: Record<string, unknown>) {
    if (!room) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/buzzer/rooms/${encodeURIComponent(room.code)}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Action failed.");
      setRoom(payload.room);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  }

  function enterOrganizerRoom() {
    if (!readyRoom) return;
    setRoom(readyRoom.room);
    setScreen("room");
  }

  function beginSetup() {
    setSetup(DEFAULT_SETUP);
    setSetupStep(1);
    setScreen("setup");
  }

  function nextStep() {
    setSetupStep((current) => (current === 1 ? 2 : current === 2 ? 3 : 3));
  }

  function previousStep() {
    setSetupStep((current) => (current === 3 ? 2 : current === 2 ? 1 : 1));
  }

  if (screen === "ready" && readyRoom) {
    return (
      <div className="buzzer-room-shell">
        <div className="buzzer-room-modal card spacious">
          <div className="buzzer-room-modal-header">
            <div>
              <span className="eyebrow">Organizer setup</span>
              <h1>Your game is ready</h1>
            </div>
            <button className="ghost-button" onClick={() => setScreen("start")} type="button">
              Close
            </button>
          </div>
          <p className="subtitle">Share this link with your teams. Save the password so you can rejoin if you close the page.</p>
          <div className="badge-list">
            <span className="badge">{readyRoom.room.teamAName}</span>
            <span className="badge neutral">{readyRoom.room.teamBName}</span>
            <span className="badge neutral">{readyRoom.room.totalRounds} rounds</span>
            <span className="badge neutral">{formatTimer(readyRoom.room.timerDurationMs)} round clock</span>
          </div>
          <label className="form-field">
            <span>Share link</span>
            <div className="buzzer-copy-row">
              <input readOnly value={readyRoom.shareUrl} />
              <button className="ghost-button" onClick={() => copy(readyRoom.shareUrl)} type="button">Copy</button>
            </div>
          </label>
          <label className="form-field">
            <span>Organizer password</span>
            <div className="buzzer-copy-row">
              <input readOnly value={readyRoom.organizerPassword} />
              <button className="ghost-button" onClick={() => copy(readyRoom.organizerPassword)} type="button">Copy</button>
            </div>
          </label>
          <button className="button button-lg" onClick={enterOrganizerRoom} type="button">Enter game room</button>
        </div>
      </div>
    );
  }

  if (screen === "setup") {
    return (
      <div className="buzzer-room-shell">
        <div className="buzzer-room-modal card spacious">
          <div className="buzzer-setup-header">
            <div>
              <span className="eyebrow">Match setup</span>
              <h1>Set up the match</h1>
              <p className="subtitle">Complete these steps before you create the room.</p>
            </div>
            <div className="buzzer-stepper" aria-label="Match setup steps">
              {[1, 2, 3].map((step) => (
                <div className={`buzzer-step ${setupStep >= step ? "active" : ""}`} key={step}>
                  <span>{step}</span>
                  <strong>{step === 1 ? "Teams" : step === 2 ? "Settings" : "Start"}</strong>
                </div>
              ))}
            </div>
          </div>

          {setupStep === 1 && (
            <div className="buzzer-setup-grid">
              <label className="card buzzer-setup-card">
                <span className="buzzer-team-letter">A</span>
                <span className="eyebrow">Team name</span>
                <input value={setup.teamAName} onChange={(event) => setSetup((current) => ({ ...current, teamAName: event.target.value }))} />
                <p className="subtitle">Pick anything fun. You can rename this later.</p>
              </label>
              <label className="card buzzer-setup-card highlight">
                <span className="buzzer-team-letter">B</span>
                <span className="eyebrow">Team name</span>
                <input value={setup.teamBName} onChange={(event) => setSetup((current) => ({ ...current, teamBName: event.target.value }))} />
                <p className="subtitle">Pick anything fun. You can rename this later.</p>
              </label>
            </div>
          )}

          {setupStep === 2 && (
            <div className="buzzer-setup-grid settings">
              <label className="card buzzer-setup-card">
                <span className="eyebrow">Rounds</span>
                <strong>Number of rounds</strong>
                <input
                  inputMode="numeric"
                  min={1}
                  max={20}
                  type="number"
                  value={setup.totalRounds}
                  onChange={(event) => setSetup((current) => ({ ...current, totalRounds: Number(event.target.value || 3) }))}
                />
              </label>
              <label className="card buzzer-setup-card highlight">
                <span className="eyebrow">Clock</span>
                <strong>Time limit per round</strong>
                <input
                  inputMode="numeric"
                  min={1}
                  max={60}
                  type="number"
                  value={setup.timerMinutes}
                  onChange={(event) => setSetup((current) => ({ ...current, timerMinutes: Number(event.target.value || 10) }))}
                />
                <p className="subtitle">Enter minutes. The room timer counts down the full round length.</p>
              </label>
            </div>
          )}

          {setupStep === 3 && (
            <div className="buzzer-review">
              <div className="feedback">
                <strong>{setup.teamAName}</strong> vs <strong>{setup.teamBName}</strong>
              </div>
              <div className="feedback">
                <strong>{setup.totalRounds}</strong> rounds, <strong>{setup.timerMinutes} minutes</strong> per round
              </div>
              <p className="subtitle">If this looks right, create the room and send teams the link.</p>
            </div>
          )}

          <div className="buzzer-form-actions">
            <button className="ghost-button" onClick={setupStep === 1 ? () => setScreen("start") : previousStep} type="button">
              {setupStep === 1 ? "Back" : "Previous"}
            </button>
            {setupStep < 3 ? (
            <button className="button" onClick={nextStep} type="button">
                Continue
              </button>
            ) : (
              <button className="button" disabled={busy} onClick={createRoom} type="button">
                Create game
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "join") {
    return (
      <div className="buzzer-room-shell">
        <div className="buzzer-room-modal card spacious">
          <div>
            <span className="eyebrow">Join room</span>
            <h1>Join a game</h1>
          </div>
          <label className="form-field">
            <span>Game code</span>
            <input value={roomCode} onChange={(event) => setRoomCode(event.target.value.toUpperCase())} placeholder="E.G. 7K2QPM" />
          </label>
          <label className="form-field">
            <span>Your name</span>
            <input value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="e.g. Priya" />
          </label>
          <label className="form-field">
            <span>Password <em>(optional)</em></span>
            <input value={organizerPassword} onChange={(event) => setOrganizerPassword(event.target.value)} placeholder="only needed to rejoin as organizer" />
          </label>
          {error && <p className="feedback bad">{error}</p>}
          <div className="buzzer-form-actions">
            <button className="ghost-button" onClick={() => setScreen("start")} type="button">Back</button>
            <button className="button" disabled={busy} onClick={joinRoom} type="button">Join game</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "room" && room) {
    return isOrganizer ? (
      <OrganizerConsole
        busy={busy}
        error={error}
        organizerPassword={organizerPassword}
        room={room}
        onAction={act}
      />
    ) : (
      <ParticipantRoom
        busy={busy}
        canBuzz={canBuzz}
        error={error}
        participantName={participantName}
        room={room}
        seatedSeat={seatedSeat}
        selectedSeatId={selectedSeatId}
        onAction={act}
        onSeat={(seatId) => setSelectedSeatId(seatId)}
      />
    );
  }

  return (
    <div className="buzzer-room-shell">
      <div className="simple-heading buzzer-room-heading">
        <span className="eyebrow">Science Bowl</span>
        <h1>Start a buzzer round</h1>
        <p className="subtitle">Run quick-recall practice for Science Bowl toss-up format.</p>
      </div>
      <div className="buzzer-start-grid">
        <button className="card buzzer-start-card" disabled={busy} onClick={beginSetup} type="button">
          <span className="buzzer-start-icon">+</span>
          <strong>Create new game</strong>
          <span>Set team names, round count, and the round clock before you create the room.</span>
        </button>
        <button className="card buzzer-start-card" onClick={() => setScreen("join")} type="button">
          <span className="buzzer-start-icon">-&gt;</span>
          <strong>Join a game</strong>
          <span>Enter a game code from your organizer and pick a team seat.</span>
        </button>
      </div>
      {error && <p className="feedback bad">{error}</p>}
    </div>
  );
}

function OrganizerConsole({
  busy,
  error,
  organizerPassword,
  room,
  onAction
}: {
  busy: boolean;
  error: string;
  organizerPassword: string;
  room: BuzzerRoom;
  onAction: (action: Record<string, unknown>) => Promise<void>;
}) {
  const question = room.question;
  const remainingPct = Math.max(0, Math.min(100, (room.remainingMs / room.timerDurationMs) * 100));

  return (
    <div className="buzzer-room-shell">
      <div className="buzzer-room-topline">
        <div>
          <span className="eyebrow">Organizer console</span>
          <h1>Game room <span>#{room.code}</span></h1>
        </div>
        <span className="badge neutral">Recovery password: {organizerPassword}</span>
      </div>

      {error && <p className="feedback bad">{error}</p>}

      <div className="buzzer-console-grid">
        <main className="buzzer-console-main">
          <section className="card spacious buzzer-timer-panel">
            <div>
              <span className="eyebrow">Timer</span>
              <div className="buzzer-room-timer">{formatTimer(room.remainingMs)}</div>
              <div className="buzzer-room-progress"><span style={{ width: `${remainingPct}%` }} /></div>
            </div>
            <div className="buzzer-buzzed-panel">
              <span className="eyebrow">Buzzed in</span>
              {room.buzzedSeat ? (
                <>
                  <h2>{room.buzzedSeat.participantName}</h2>
                  <p>{roomTeamName(room, room.buzzedSeat.team)} - {room.buzzedSeat.slot.toUpperCase()}</p>
                  <div className="actions">
                    <button className="button" disabled={busy || room.status === "JUDGED"} onClick={() => onAction({ type: "judge", organizerPassword, result: "correct" })} type="button">
                      Correct +{room.question?.questionKind === "BONUS" ? 10 : 4}
                    </button>
                    <button className="ghost-button" disabled={busy || room.status === "JUDGED"} onClick={() => onAction({ type: "judge", organizerPassword, result: "incorrect" })} type="button">Incorrect</button>
                  </div>
                </>
              ) : (
                <p>No buzz yet.</p>
              )}
            </div>
            <div className="actions">
              {room.status === "WAITING" ? (
                <button className="button" disabled={busy} onClick={() => onAction({ type: "start", organizerPassword })} type="button">
                  Start
                </button>
              ) : (
                <button className="button" disabled={busy} onClick={() => onAction({ type: "toggleTimer", organizerPassword })} type="button">
                  {room.status === "PAUSED" ? "Resume" : "Pause"}
                </button>
              )}
              <button className="ghost-button" disabled={busy} onClick={() => onAction({ type: "reset", organizerPassword })} type="button">Reset</button>
              <button className="ghost-button" disabled={busy} onClick={() => onAction({ type: "nextQuestion", organizerPassword })} type="button">Next question</button>
            </div>
          </section>

          <section className="card spacious buzzer-question-console">
            <div className="buzzer-card-header">
              <div>
                <span className="eyebrow">Current question</span>
                <h2>Round {room.roundNumber} of {room.totalRounds}</h2>
              </div>
            </div>
            {question ? (
              <>
                <p className="buzzer-question-line">
                  <strong>{question.questionKind}</strong> - {question.category} - {question.format}
                </p>
                <p className="buzzer-question-text">{question.prompt}</p>
                <div className="buzzer-choice-label">Choices</div>
                <div className="buzzer-choice-grid">
                  {question.choices?.map((choice, index) => {
                    const letter = letters[index];
                    const correct = letter === question.correctLetter;
                    return (
                      <div className={correct ? "feedback good" : "feedback"} key={`${letter}-${choice}`}>
                        <strong>{letter}</strong> {choice}
                      </div>
                    );
                  })}
                </div>
                <div className="buzzer-answer-label">Right Answer</div>
                <p className="feedback good">
                  {question.correctLetter ? `${question.correctLetter} - ` : ""}
                  {question.correctAnswer}
                </p>
              </>
            ) : (
              <p className="empty">No multiple-choice question is loaded.</p>
            )}
          </section>

          <TeamGrid room={room} />
        </main>

        <aside className="buzzer-console-side">
          <RoundLog events={room.events} />
          <section className="card spacious buzzer-leading-card">
            <span className="eyebrow">Leading</span>
            <h2>{room.teamAScore === room.teamBScore ? "Tied" : room.teamAScore > room.teamBScore ? room.teamAName : room.teamBName}</h2>
            <p>{room.teamAScore} - {room.teamBScore}</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ParticipantRoom({
  busy,
  canBuzz,
  error,
  participantName,
  room,
  seatedSeat,
  selectedSeatId,
  onAction,
  onSeat
}: {
  busy: boolean;
  canBuzz: boolean;
  error: string;
  participantName: string;
  room: BuzzerRoom;
  seatedSeat: Seat | null;
  selectedSeatId: string | null;
  onAction: (action: Record<string, unknown>) => Promise<void>;
  onSeat: (seatId: string | null) => void;
}) {
  return (
    <div className="buzzer-room-shell">
      <div className="buzzer-participant-header">
        <div>
          <span className="eyebrow">Game</span>
          <strong>#{room.code}</strong>
        </div>
        <div>
          <span className="eyebrow">Timer</span>
          <strong>{formatTimer(room.remainingMs)}</strong>
        </div>
      </div>
      {error && <p className="feedback bad">{error}</p>}
      <div className="buzzer-participant-grid">
        <ParticipantTeamCard
          room={room}
          team="A"
          participantName={participantName}
          selectedSeatId={selectedSeatId}
          onAction={onAction}
          onSeat={onSeat}
        />
        <ParticipantTeamCard
          room={room}
          team="B"
          participantName={participantName}
          selectedSeatId={selectedSeatId}
          onAction={onAction}
          onSeat={onSeat}
        />
        <section className="card spacious buzzer-buzz-card">
          <button
            className="buzzer-big-button"
            disabled={busy || !canBuzz}
            onClick={() => seatedSeat && onAction({ type: "buzz", seatId: seatedSeat.id, participantName })}
            type="button"
          >
            Buzz
          </button>
          <p>
            {!seatedSeat && "Sit at a seat first."}
            {seatedSeat && room.status === "WAITING" && "Wait for the organizer to start the round."}
            {room.status === "PAUSED" && "Timer paused. Wait for the organizer to resume."}
            {room.status === "BONUS" && "Bonus question in progress. Only the organizer reads it."}
            {seatedSeat && room.status === "RUNNING" && !room.buzzedSeat && "Buzz when you know it."}
            {room.buzzedSeat && `${room.buzzedSeat.participantName} buzzed in for ${roomTeamName(room, room.buzzedSeat.team)}.`}
            {room.status === "TIMEOUT" && "Time expired."}
          </p>
        </section>
      </div>
    </div>
  );
}

function TeamGrid({ room }: { room: BuzzerRoom }) {
  return (
    <div className="buzzer-roster-grid">
      <TeamCard room={room} team="A" />
      <TeamCard room={room} team="B" />
    </div>
  );
}

function TeamCard({ room, team }: { room: BuzzerRoom; team: Team }) {
  const seats = room.seats.filter((seat) => seat.team === team);
  const score = team === "A" ? room.teamAScore : room.teamBScore;

  return (
    <section className={`buzzer-team-card ${team === "B" ? "team-b" : ""}`}>
      <header>
        <div>
          <span className="buzzer-team-letter">{team}</span>
          <strong>{roomTeamName(room, team)}</strong>
        </div>
        <strong>{score}</strong>
      </header>
      <div className="buzzer-roster">
        {seats.map((seat) => (
          <div className={`buzzer-roster-row ${seat.id === room.buzzedSeat?.id ? "buzzed" : ""}`} key={seat.id}>
            <span className="buzzer-roster-avatar">{seat.slot}</span>
            <span>{seat.participantName ?? "Empty seat"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ParticipantTeamCard({
  room,
  team,
  participantName,
  selectedSeatId,
  onAction,
  onSeat
}: {
  room: BuzzerRoom;
  team: Team;
  participantName: string;
  selectedSeatId: string | null;
  onAction: (action: Record<string, unknown>) => Promise<void>;
  onSeat: (seatId: string | null) => void;
}) {
  const seats = room.seats.filter((seat) => seat.team === team);
  const score = team === "A" ? room.teamAScore : room.teamBScore;

  return (
    <section className={`buzzer-team-card ${team === "B" ? "team-b" : ""}`}>
      <header>
        <div>
          <span className="buzzer-team-letter">{team}</span>
          <strong>{roomTeamName(room, team)}</strong>
        </div>
        <strong>{score}</strong>
      </header>
      <div className="buzzer-roster">
        {seats.map((seat) => {
          const mine = selectedSeatId === seat.id && seat.participantName === participantName;
          const open = !seat.participantName;
          return (
            <div className={`buzzer-roster-row ${seat.id === room.buzzedSeat?.id ? "buzzed" : ""}`} key={seat.id}>
              <span className="buzzer-roster-avatar">{seat.slot}</span>
              <span>{seat.participantName ?? "Empty seat"}</span>
              {open && !selectedSeatId && (
                <button
                  className="ghost-button mini-button"
                  onClick={async () => {
                    await onAction({ type: "sit", team, slot: seat.slot, participantName });
                    onSeat(seat.id);
                  }}
                  type="button"
                >
                  Sit here
                </button>
              )}
              {mine && (
                <button
                  className="ghost-button mini-button"
                  onClick={async () => {
                    await onAction({ type: "stand", seatId: seat.id, participantName });
                    onSeat(null);
                  }}
                  type="button"
                >
                  Get up
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RoundLog({ events }: { events: RoomEvent[] }) {
  return (
    <section className="card spacious">
      <h2>Round log</h2>
      <div className="buzzer-log">
        {events.length ? (
          events.map((event) => (
            <div className="buzzer-log-entry" key={event.id}>
              <span>{eventTime(event.createdAt)}</span>
              <strong>{event.message}</strong>
            </div>
          ))
        ) : (
          <p className="subtitle">No events yet.</p>
        )}
      </div>
    </section>
  );
}
