import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import App from '@/App'
import './index.less'

const root = createRoot(document.getElementById('root'))
const client = new QueryClient()

root.render(
  <>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <ConfigProvider locale={zhCN}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </>
)
