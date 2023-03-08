import Form from "@/components/Form";
import Note from "@/components/Note";
import { iNote } from "@/components/Options";
import client from "@/prisma/prismaClient";

// const getData = async () => {
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notes`);
//   const notes = await res.json();
//   return notes as iNote[];
// }; ----> Not working

export default async function Home() {
  const notes = await client.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  // const notes = await getData();
  console.log(notes);

  return (
    <main className="cal-h overflow-y-auto scrollbar px-20 pt-10 pb-8">
      <Form />
      <div className="notes-columns gap-4 p-4 my-8">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            bgImage={note.bgImage}
            colour={note.colour}
          />
        ))}
      </div>
    </main>
  );
}
