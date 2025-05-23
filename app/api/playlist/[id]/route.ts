import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import { NextResponse } from 'next/server';

export async function GET(req: Request, {params}: { params: { id: string } }) {
  const response = await ApiService.makeHttpsRequest({
    url: `${process.env.NEXT_PRIVATE_HOST_API}/playlist/${params.id}`,
    method: HttpMethods.GET,
    req: req,
  });

  return NextResponse.json({data: response});
}