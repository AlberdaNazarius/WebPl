import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiService from '@/app/services/api.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const response = await ApiService.makeHttpsRequest({
    url: `${process.env.NEXT_PRIVATE_HOST_API}/playlist/playlists`,
    method: HttpMethods.GET,
    req: req,
  });

  return NextResponse.json({data: response});
}