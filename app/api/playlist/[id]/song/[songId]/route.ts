import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import { NextResponse } from 'next/server';

export async function POST(req: Request, {params}: { params: { id: string, songId: string } }) {
  const {id, songId} = params;
  const response = await ApiService.makeHttpsRequest({
    url: `${process.env.NEXT_PRIVATE_HOST_API}/playlist/${id}/add-song?songId=${songId}`,
    method: HttpMethods.POST,
    req: req,
  });

  return NextResponse.json({data: response});
}

export async function DELETE(req: Request, {params}: { params: { id: string, songId: string } }) {
  const {id, songId} = params;
  const response = await ApiService.makeHttpsRequest({
    url: `${process.env.NEXT_PRIVATE_HOST_API}/playlist/${id}/remove?songId=${songId}`,
    method: HttpMethods.DELETE,
    req: req,
  });

  return NextResponse.json({data: response});
}