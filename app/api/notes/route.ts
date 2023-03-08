import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import client from "@/prisma/prismaClient";
import { postNote } from "@/components/Form";
import { deletedNote } from "@/components/Options";
import { modNote } from "@/components/Note";

// export async function GET(request: NextRequest, response: NextResponse) {
//   try {
//     const notes = await client.note.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     console.log(notes);
//     return NextResponse.json(notes, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// } ------> This is working / sending json object successfully but idk why fetch api from page.tsx can't fetch it properly and is logging an empty object {} 🥲

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    console.log("From POST: ", session);

    const noteBody: postNote = await request.json();

    console.log("noteBody in POST handler: ", noteBody);

    if (session) {
      const prismaUser = await client.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });

      try {
        const note = await client.note.create({
          data: {
            title: noteBody.title,
            content: noteBody.content,
            userId: prismaUser?.id!,
          },
        });
        console.log("Created Note from POST handler: ", note);
        return NextResponse.json(note, { status: 201 });
      } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
      }
    } else {
      return NextResponse.json(
        { message: "Please Sign In to create Notes" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const delNote: deletedNote = await request.json();
    console.log(delNote);

    const DNote = await client.note.delete({
      where: {
        id: delNote.id,
      },
    });
    console.log(DNote);
    return NextResponse.json(DNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const modifyNote: modNote = await request.json();
    console.log(modifyNote);

    if (modifyNote.bgImage) {
      const MNote = await client.note.update({
        where: {
          id: modifyNote.id,
        },
        data: {
          bgImage: modifyNote.bgImage,
        },
      });
      console.log(MNote);
      return NextResponse.json(MNote, { status: 201 });
    }

    if (modifyNote.colour) {
      const MNote = await client.note.update({
        where: {
          id: modifyNote.id,
        },
        data: {
          colour: modifyNote.colour,
        },
      });
      console.log(MNote);
      return NextResponse.json(MNote, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
