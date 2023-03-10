"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { iNote } from "./Options";
import Note from "./Note";

export default function Notes({ note }: { note: iNote[] }) {
  const [parent, enableAnimations] = useAutoAnimate();
  return (
    <div ref={parent} className="notes-columns gap-4 p-4 my-8">
      {note.map((n) => (
        <Note
          key={n.id}
          id={n.id}
          title={n.title}
          content={n.content}
          bgImage={n.bgImage}
        />
      ))}
    </div>
  );
}
