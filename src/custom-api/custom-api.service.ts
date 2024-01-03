import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CustomApiService {
  constructor(private readonly configService: ConfigService) {}
  //대기오염 측정 관련 조회 api, 추가 사항 필요할 시 url 추가로 개발
  async fetchDataFromPublicApi(reqData): Promise<any> {
    const district = reqData.district;
    const apiKey = this.configService.get<string>('OPEN_APIKEYS');
    const apiUrl = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${
      district ? district : '강남구'
    }&dataTerm=month&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}`;
    console.log('url', apiUrl);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          //다른 필요한 매개변수들을 추가하세요.
        },
      });
      return response.data.response.body;
    } catch (error) {
      throw new Error('API 호출에 실패했습니다');
    }
  }
}
