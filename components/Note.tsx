import Options, { iNote } from "./Options";
import { useRouter } from "next/navigation";

type noteProps = {
  note: iNote;
};

const Note = ({ note }: noteProps) => {
  const router = useRouter();
  const { title, content, id } = note;

  const bg = async (color: string) => {
    const noteColor = await fetch("/api/notes", {
      method: "PATCH",
      body: JSON.stringify({
        colour: color,
        id: id,
      }),
    });
    const colouredNote: iNote = await noteColor.json();
    console.log(colouredNote);

    router.refresh();
  };

  const bgImageFn = async (image: string) => {
    const noteImage = await fetch("/api/notes", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        bgImage: image,
      }),
    });
    const colouredNote: iNote = await noteImage.json();
    console.log(colouredNote);

    router.refresh();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${note.bgImage})`,
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
        backgroundColor: note.colour,
      }}
      className={`inline-block p-3 mb-4 w-full h-max border border-1 border-[#575B5F] rounded-lg`}
    >
      <div className="px-2">
        <h3 className="text-[#f5f5f5] font-semibold text-lg">{title}</h3>
      </div>
      <div className="p-2">
        <p className="text-[#f5f5f5] font-normal leading-[1.35rem] text-sm max-h-64 break-words overflow-y-auto scrollbar-hide">
          {content}
        </p>
      </div>
      <div>
        <Options note={note} bg={bg} bgImageFn={bgImageFn} />
      </div>
    </div>
  );
};

export default Note;
