import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const response = await ApiService.makeHttpsRequest({
      url: `${process.env.NEXT_PRIVATE_HOST_API}/recommendations`,
      method: HttpMethods.POST,
      req,
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}