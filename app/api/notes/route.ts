import client from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export interface deletedNote {
  id: string;
  title: string;
}

export interface newNote {
  title: string;
  content: string;
}

export interface bgNote {
  id: string;
  bgImage: string;
  colour: string;
}

export async function GET(request: NextRequest) {
  try {
    const notes = client.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while fetching all the notes!",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: deletedNote = await request.json();

    const note = await client.note.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while deleting the note!",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    console.log("session: in POST handler: ", session);

    if (!session) {
      return NextResponse.json({
        message: "Please Sign In first to use the application!",
      });
    }

    const prismaUser = await client.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
    const body: newNote = await request.json();
    console.log("body: ", body);

    try {
      const note = await client.note.create({
        data: {
          title: body.title,
          content: body.content,
          userId: prismaUser?.id!,
        },
      });

      console.log("Note in prisma: ", note);

      return NextResponse.json(note);
    } catch (error) {
      return NextResponse.json({
        message: "Something went wrong while adding the note to the database",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while identifying the session and user!",
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body: bgNote = await request.json();

    const modNote = await client.note.update({
      where: {
        id: body.id,
      },
      data: {
        bgImage: body.bgImage,
        colour: body.colour,
      },
    });

    return NextResponse.json(modNote);
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while modifying the background of note!",
    });
  }
}
