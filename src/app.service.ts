import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '안녕하세요. 에코앤리치에 지원하게 된 정원호라고 합니다. Api 명세는 <a href="https://github.com/Jeong-wonho/hr_management"> 이곳에서 확인할 수 있습니다.</a>';
  }
}
