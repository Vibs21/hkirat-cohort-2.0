import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import client from "@/db";

export async function GET() {

  const user = await client.user.findFirst();

  return Response.json({ name: user?.username, email: "vaibhav" })
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  console.log(req.headers.get("authorization"));

  console.log(req.nextUrl.searchParams.get("name"));

  const user = await client.user.create({
    data: {
      username,
      password
    }
  })
  return NextResponse.json({ message: user })
}
