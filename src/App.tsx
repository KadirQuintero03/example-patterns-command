import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * DEMO: Patrón de comportamiento Command aplicado a un editor de texto muy simple.
 * - Receiver: EditorReceiver (opera sobre el contenido y la selección del textarea)
 * - Command (interface): execute() y undo()
 * - ConcreteCommands: InsertTextCommand, DeleteSelectionCommand, UppercaseSelectionCommand,
 *   LowercaseSelectionCommand, SurroundSelectionCommand, ReplaceAllCommand
 * - Invoker: CommandManager (gestiona ejecutar, deshacer, rehacer)
 * - Client: La UI crea comandos y se los pasa al invoker
 */

// ============================
// Command Interface
// ============================
interface Command {
  execute(): void;
  undo(): void;
  readonly description: string;
}

// ============================
// Receiver
// ============================
class EditorReceiver {
  private getContent: () => string;
  private setContent: (text: string) => void;
  private getSelection: () => { start: number; end: number };
  private setSelection: (start: number, end: number) => void;

  constructor(
    getContent: () => string,
    setContent: (text: string) => void,
    getSelection: () => { start: number; end: number },
    setSelection: (start: number, end: number) => void
  ) {
    this.getContent = getContent;
    this.setContent = setContent;
    this.getSelection = getSelection;
    this.setSelection = setSelection;
  }

  /** Utilidad para leer el estado actual del editor */
  snapshot() {
    const text = this.getContent();
    const { start, end } = this.getSelection();
    return { text, start, end };
  }

  /** Restaura un snapshot anterior */
  restore(snapshot: { text: string; start: number; end: number }) {
    this.setContent(snapshot.text);
    this.setSelection(snapshot.start, snapshot.end);
  }

  /** Reemplaza la selección actual por "insert" y posiciona el cursor al final */
  replaceSelection(insert: string) {
    const { text, start, end } = this.snapshot();
    const newText = text.slice(0, start) + insert + text.slice(end);
    const newPos = start + insert.length;
    this.setContent(newText);
    this.setSelection(newPos, newPos);
  }

  /** Convierte a mayúsculas la selección */
  toUppercaseSelection() {
    const { text, start, end } = this.snapshot();
    const sel = text.slice(start, end);
    this.replaceRaw(start, end, sel.toUpperCase());
  }

  /** Convierte a minúsculas la selección */
  toLowercaseSelection() {
    const { text, start, end } = this.snapshot();
    const sel = text.slice(start, end);
    this.replaceRaw(start, end, sel.toLowerCase());
  }

  /** Rodea la selección con prefijo y sufijo (por ejemplo **negrita** estilo Markdown) */
  surroundSelection(prefix: string, suffix: string) {
    const { text, start, end } = this.snapshot();
    const sel = text.slice(start, end);
    const insert = `${prefix}${sel}${suffix}`;
    this.replaceRaw(start, end, insert, start + prefix.length, start + prefix.length + sel.length);
  }

  /** Reemplazo de bajo nivel conservando API para colocar selección */
  private replaceRaw(
    start: number,
    end: number,
    insert: string,
    selStart?: number,
    selEnd?: number
  ) {
    const text = this.getContent();
    const newText = text.slice(0, start) + insert + text.slice(end);
    this.setContent(newText);
    const a = selStart ?? start;
    const b = selEnd ?? start + insert.length;
    this.setSelection(a, b);
  }
}

// ============================
// Concrete Commands
// ============================
class InsertTextCommand implements Command {
  private receiver: EditorReceiver;
  private textToInsert: string;
  private before!: { text: string; start: number; end: number };
  description = "Insertar texto";

  constructor(receiver: EditorReceiver, textToInsert: string) {
    this.receiver = receiver;
    this.textToInsert = textToInsert;
  }

  execute() {
    this.before = this.receiver.snapshot();
    this.receiver.replaceSelection(this.textToInsert);
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

class DeleteSelectionCommand implements Command {
  private receiver: EditorReceiver;
  private before!: { text: string; start: number; end: number };
  description = "Borrar selección";

  constructor(receiver: EditorReceiver) {
    this.receiver = receiver;
  }

  execute() {
    this.before = this.receiver.snapshot();
    this.receiver.replaceSelection("");
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

class UppercaseSelectionCommand implements Command {
  private receiver: EditorReceiver;
  private before!: { text: string; start: number; end: number };
  description = "Mayúsculas";

  constructor(receiver: EditorReceiver) {
    this.receiver = receiver;
  }

  execute() {
    this.before = this.receiver.snapshot();
    this.receiver.toUppercaseSelection();
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

class LowercaseSelectionCommand implements Command {
  private receiver: EditorReceiver;
  private before!: { text: string; start: number; end: number };
  description = "Minúsculas";

  constructor(receiver: EditorReceiver) {
    this.receiver = receiver;
  }

  execute() {
    this.before = this.receiver.snapshot();
    this.receiver.toLowercaseSelection();
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

class SurroundSelectionCommand implements Command {
  private receiver: EditorReceiver;
  private before!: { text: string; start: number; end: number };
  private prefix: string;
  private suffix: string;
  description: string;

  constructor(receiver: EditorReceiver, prefix: string, suffix: string, label: string) {
    this.receiver = receiver;
    this.prefix = prefix;
    this.suffix = suffix;
    this.description = label;
  }

  execute() {
    this.before = this.receiver.snapshot();
    this.receiver.surroundSelection(this.prefix, this.suffix);
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

class ReplaceAllCommand implements Command {
  private receiver: EditorReceiver;
  private before!: { text: string; start: number; end: number };
  private search: string | RegExp;
  private replaceWith: string;
  description = "Reemplazar todo";

  constructor(receiver: EditorReceiver, search: string | RegExp, replaceWith: string) {
    this.receiver = receiver;
    this.search = search;
    this.replaceWith = replaceWith;
  }

  execute() {
    this.before = this.receiver.snapshot();
    const { text } = this.receiver.snapshot();
    const newText = text.replace(this.search as any, this.replaceWith);
    // remplaza todo el documento; al final situamos el cursor al final
    this.receiver.restore({ text: newText, start: newText.length, end: newText.length });
  }

  undo() {
    this.receiver.restore(this.before);
  }
}

// ============================
// Invoker
// ============================
class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private listeners: ((stacks: { canUndo: boolean; canRedo: boolean }) => void)[] = [];

  execute(command: Command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
    this.emit();
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
    this.emit();
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.undoStack.push(cmd);
    this.emit();
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  onChange(cb: (stacks: { canUndo: boolean; canRedo: boolean }) => void) {
    this.listeners.push(cb);
  }

  private emit() {
    const payload = { canUndo: this.canUndo(), canRedo: this.canRedo() };
    this.listeners.forEach((l) => l(payload));
  }
}

// ============================
// UI (Client)
// ============================
export default function TextEditorCommandDemo() {
  const [text, setText] = useState<string>("Selecciona texto y prueba los comandos.\n\nEste demo usa el patrón Command para desacoplar la UI de las operaciones del editor.\n");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Mantener selección manualmente
  const selectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  const getSelection = () => selectionRef.current;
  const setSelection = (start: number, end: number) => {
    selectionRef.current = { start, end };
    const ta = taRef.current;
    if (ta) {
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(start, end);
      });
    }
  };

  const receiver = useMemo(() => new EditorReceiver(
    () => text,
    (t) => setText(t),
    () => getSelection(),
    (s, e) => setSelection(s, e)
  ), [text]);

  const invoker = useMemo(() => new CommandManager(), []);

  useEffect(() => {
    invoker.onChange(({ canUndo, canRedo }) => {
      setCanUndo(canUndo);
      setCanRedo(canRedo);
    });
  }, [invoker]);

  // Sincroniza la selección cuando el usuario interactúa con el textarea
  const captureSelection = () => {
    const ta = taRef.current;
    if (!ta) return;
    selectionRef.current = { start: ta.selectionStart, end: ta.selectionEnd };
  };

  // Helpers para crear comandos desde la UI (Client)
  const doInsert = (txt: string) => invoker.execute(new InsertTextCommand(receiver, txt));
  const doDelete = () => invoker.execute(new DeleteSelectionCommand(receiver));
  const doUpper = () => invoker.execute(new UppercaseSelectionCommand(receiver));
  const doLower = () => invoker.execute(new LowercaseSelectionCommand(receiver));
  const doBold = () => invoker.execute(new SurroundSelectionCommand(receiver, "**", "**", "Negrita (Markdown)"));
  const doItalics = () => invoker.execute(new SurroundSelectionCommand(receiver, "*", "*", "Itálica (Markdown)"));
  const doReplaceAllLorem = () => invoker.execute(new ReplaceAllCommand(receiver, /demo/gi, "EJEMPLO"));

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Patrón Command — Editor</h1>
          <div className="text-sm opacity-70">React + TS (Vite-ready)</div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <textarea
              ref={taRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyUp={captureSelection}
              onClick={captureSelection}
              onSelect={captureSelection}
              className="w-full h-[360px] p-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              placeholder="Escribe aquí..."
            />
          </div>

          <aside className="lg:col-span-1 space-y-3">
            <Toolbar title="Acciones (crean Comandos)">
              <Button onClick={() => doInsert("[FECHA:" + new Date().toLocaleString() + "] ")}>Insertar fecha</Button>
              <Button onClick={doDelete}>Borrar selección</Button>
              <Button onClick={doUpper}>Mayúsculas</Button>
              <Button onClick={doLower}>Minúsculas</Button>
              <Button onClick={doBold}>Negrita ** **</Button>
              <Button onClick={doItalics}>Itálica * *</Button>
              <Button onClick={doReplaceAllLorem}>Reemplazar "demo" → "EJEMPLO"</Button>
            </Toolbar>

            <Toolbar title="Historial">
              <Button disabled={!canUndo} onClick={() => invoker.undo()}>Deshacer</Button>
              <Button disabled={!canRedo} onClick={() => invoker.redo()}>Rehacer</Button>
              <div className="text-xs text-gray-500">El Invoker (CommandManager) mantiene pilas de undo/redo</div>
            </Toolbar>

            <HelpCard />
          </aside>
        </section>
      </div>
    </div>
  );
}

function Toolbar({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
      <div className="font-semibold mb-2">{title}</div>
      <div className="grid grid-cols-1 gap-2">{children}</div>
    </div>
  );
}

function Button({ onClick, children, disabled }: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-xl border text-sm font-medium shadow-sm transition ${disabled
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : "bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700 active:scale-[0.99]"
        }`}
    >
      {children}
    </button>
  );
}

function HelpCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 text-sm leading-5">
      <div className="font-semibold mb-1">¿Qué estás viendo?</div>
      <ul className="list-disc pl-5 space-y-1">
        <li><b>Invoker</b> (CommandManager) recibe comandos desde la UI.</li>
        <li><b>Commands</b> encapsulan una operación (+ estado para deshacer).</li>
        <li><b>Receiver</b> (EditorReceiver) conoce cómo modificar el texto/selección.</li>
        <li>La UI (cliente) solo <i>crea</i> el comando y lo entrega al Invoker.</li>
      </ul>
      <div className="mt-2 opacity-70">Selecciona parte del texto y aplica negrita/itálica/mayúsculas, inserta fecha, etc. Luego usa Deshacer/Rehacer.</div>
    </div>
  );
}
