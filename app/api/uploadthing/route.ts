import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';

// Next App Router의 API 라우터에 등록할 수 있는 라우터 핸들러를 생성합니다.
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
