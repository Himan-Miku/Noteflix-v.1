import Form from "@/components/Form";
import Note from "@/components/Note";
import { iNote } from "@/components/Options";

async function getNotes() {
  const res = await fetch(`${process.env.BASE_URL}/api/notes`);
  if (!res.ok) {
    console.log("🚀 ~ file: page.tsx:7 ~ getNotes ~ ̥:", res);
  }
  const data = await res.json();
  return data as iNote[];
}

export default async function Home() {
  const notes = await getNotes();

  console.log(notes);

  return (
    <main className="cal-h overflow-y-auto scrollbar px-20 pt-10 pb-8">
      <Form />
      <div className="notes-columns gap-4 p-4 my-8">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}
