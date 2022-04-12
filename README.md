> 如图片看不了，访问[这篇文章](https://spotted-slayer-2af.notion.site/React-Technology-Stack-f6cacf25df7b4eb2a0a42167ccb7b85a)

# React Technology Stack

> 目前使用的 `技术栈` 。（2022/04/08）

1. [react@18](https://reactjs.org/)
2. [react-router@6](https://reactrouterdotcom.fly.dev/docs/en/v6)
3. [recoil](https://recoiljs.org/)
4. [react-query](https://react-query.tanstack.com/) + [axios](https://axios-http.com/) + [qs](https://www.npmjs.com/package/qs)
5. [antd@4](https://ant.design/docs/react/introduce-cn)
6. [tailwindcss@3](https://tailwindcss.com/docs/installation)
7. [ramdajs](https://ramdajs.com/docs/#)
8. [partial.lenses](https://github.com/calmm-js/partial.lenses)
9. [ahooks](https://ahooks.js.org/zh-CN/hooks/use-request/index)
10. [create-react-app](https://create-react-app.dev/) + [craco@6](https://www.npmjs.com/package/@craco/craco)

---

<aside>
🍭 接下来，我们从零开始搭建一个新项目来展示上述提及的内容和使用场景。

环境要求：
node@14+
npm@6+
yarn@1.22.17

</aside>

## 创建新项目

```bash
npx create-react-app my-app
cd my-app
npm start
```

> 如果你想使用 [typescript](https://www.typescriptlang.org/) ，使用 `npx create-react-app my-app --template typescript` 。

然后我会对项目目录进行调整，这是非必须的，纯属个人习惯。

由于我个人习惯用 `yarn` ，且默认的 src 目录我也不太喜欢。因此我把它们都删除了，然后重新创建。

```bash
rm package-lock.json
rm -rf src
yarn
yarn start
```

重新创建 `src/index.jsx` `src/App.jsx`

注意 react@18 的写法

![截屏2022-04-08 17.07.36.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_17.07.36.png)

使用 `@craco/craco` 题目默认的构建工具

```bash
yarn add @craco/craco -D
```

修改 package.json

```json
{
  "scripts": {
    "dev": "craco start",
    "build": "craco build"
  }
}
```

创建 `craco.config.json` [jsconfig.json](https://www.npmjs.com/package/jsconfig.json)

```bash
npx jsconfig.json
```

然后配置一下路径别名

```bash
yarn add craco-alias -D
```

修改以下两个文件 `jsconfig.json` `craco.config.js`

由于个人习惯，我这里使用了 `@` 符合来代替 `src` 目录。

![截屏2022-04-08 16.43.54.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_16.43.54.png)

然后修改一下 `src/index.jsx` ，尝试使用 `@`

```jsx
import App from '@/App'
```

```bash
yarn dev
```

> 运行之后没有报错，说明 alias 配置成功。

---

## 使用路由功能

```bash
yarn add react-router-dom
```

先创建两个页面组件 `src/pages/Home/index.jsx` `src/pages/About/index.jsx`

![截屏2022-04-08 17.12.27.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_17.12.27.png)

然后创建 `src/routes.jsx` 来对路由进行简单配置

![截屏2022-04-08 17.15.00.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_17.15.00.png)

继续修改 `src/index.jsx` 和 `src/App.jsx`

![截屏2022-04-08 17.17.47.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_17.17.47.png)

![截屏2022-04-08 17.17.54.png](React%20Tech%2089c2c/%E6%88%AA%E5%B1%8F2022-04-08_17.17.54.png)

接下来需要使用路由组件赖加载的功能，修改 `src/routes.jsx`

```jsx
import { lazy } from 'react'
import Home from './pages/Home'
/**
 * @typedef {import('react-router-dom').RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
const routeConfigs = [
  { path: '/', element: Home },
  { path: '/about', element: lazy(() => import('@/pages/About')) },
]

/**
 * @param {RouteObject[]} configs
 * @returns {RouteObject[]}
 */
function toRoutes(configs) {
  return configs.map((item) => {
    const { element, children, ...rest } = item
    let Element = element || <></>

    return {
      ...rest,
      element: <Element />,
      children: Array.isArray(children) ? toRoutes(children) : undefined,
    }
  })
}

export const routes = toRoutes(routeConfigs)
```

由于 `element` 属性接收的是一个 `React.ReactNode` ，而非构造函数 `()⇒ React.ReactNode` 。因此为了兼容直接导入和使用懒加载的写法，进行了配置项的调整。

我们先让 `element` 接收一个组件构造函数（例子中的 `Home` 和 `lazy(() => import("@/pages/About"))` 的类型即为构造函数 `React.FC` ）。然后通过 `toRoutes` 方法把 `element` 重新转成 `React.ReactNode` 。并对其 `children` 进行递归处理。

<aside>
🍭 关于 react-router@6 还有很多其他的功能，本项目中就先不扩展。后续在展开研究。

</aside>

## 使用全局状态管理 Recoil

相较于 [mobx](https://mobx.js.org/README.html) 和 [useContext](https://reactjs.org/docs/context.html)，[Recoil](https://recoiljs.org/docs/introduction/getting-started/) 更简单好用，并且它是基于 hooks 函数组件的写法。

```bash
yarn add recoil
```

在 `src/index.jsx` 中引入

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from '@/App'

const root = createRoot(document.getElementById('root'))
root.render(
  <>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </>
)
```

接下来，创建一个简单的计数器管理的 hooks，`src/stores/use-counter.js`

```jsx
import { atom, useRecoilState } from 'recoil'

const stateAtom = atom({ key: 'counter', default: 0 })

export function useCounter() {
  const [count, setCount] = useRecoilState(stateAtom)
  const add = () => setCount((curr) => curr + 1)
  const sub = () => setCount((curr) => curr - 1)
  return { count, add, sub }
}
```

然后把这个功能添加到 `src/pages/Home/index.jsx` 中

```jsx
import { Link } from 'react-router-dom'
import { useCounter } from '@/stores/use-counter'

const Home = () => {
  const { count, add, sub } = useCounter()
  return (
    <>
      <h1>Home</h1>
      <p>
        <Link to="/about">About</Link>
      </p>

      <hr />
      <h2>counter</h2>
      <p>count: {count}</p>
      <p>
        <button onClick={add}>add</button>
        <button onClick={sub}>sub</button>
      </p>
    </>
  )
}

export default Home
```

<aside>
🍭 虽然官方文档中提供很多的 api，但是经过尝试后，感觉这些写法太过麻烦，而且很不好理解，因此我把它当成了 `React.useState` 和 `React.useMemo` 来用，并把每一个 `store` 封装成一个 hook 来使用。

关于更多的使用场景和例子，会在后续的文章中展开讨论。

</aside>

## 数据请求

大部分的项目都会选择使用 [axios](https://axios-http.com/docs/intro) 这个工具，axios 是用来处理请求的，而 [react-query](https://react-query.tanstack.com/overview) 则是用来管理请求的。

接下来将用一个简单的接口请求来展示它的基本功能。

```bash
yarn add axios qs react-query
yarn add http-proxy-middleware -D
```

### 先处理 axios 部分

由于一般的开发过程中都会使用代理（proxy），用于访问开发服务器。因此我们需要配置代理。根据 [脚手架的文档](https://create-react-app.dev/docs/proxying-api-requests-in-development/) ，创建 `src/setupProxy.js`

```jsx
const { createProxyMiddleware } = require('http-proxy-middleware')
const defaultProxyPrefix = process.env.REACT_APP_DEFAULT_PROXY_PREFIX
const customProxyRegx = new RegExp(
  process.env.REACT_APP_CUSTOM_PROXY_REGEXP || ''
)
const defaultProxy = process.env.REACT_APP_DEFAULT_PROXY

const createProxy = (url = '', target = '') => {
  if (url !== defaultProxyPrefix && !customProxyRegx.test(url)) {
    throw Error(`\n代理错误:自定义代理前缀 "${url}" 不符合格式要求\n`)
  }

  return createProxyMiddleware(url, {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${url}`]: '',
    },
  })
}

module.exports = function (app) {
  // 默认代理
  app.use(createProxy(defaultProxyPrefix, defaultProxy))

  // 自定义代理
  // app.use(createProxy('/api-local-server', 'http://localhost:8000/api/v1'));
}
```

另外还需要定义几个个环境变量，`.env`

```yaml
# 默认代理前缀
REACT_APP_DEFAULT_PROXY_PREFIX = /proxy
# 自定义代理前缀格式
REACT_APP_CUSTOM_PROXY_REGEXP = ^/api-
# 默认代理地址
REACT_APP_DEFAULT_PROXY = https://cnodejs.org/api/v1
```

封装请求工具函数 `src/utils/http.js`

```jsx
import axios from 'axios'
import queryString from 'qs'

const isDev = process.env.NODE_ENV === 'development'
const defaultProxyPrefix = process.env.REACT_APP_DEFAULT_PROXY_PREFIX
const customProxyRegx = new RegExp(
  process.env.REACT_APP_CUSTOM_PROXY_REGEXP || ''
)
const httpRegx = /^http(s?):\/\//

// 修改请求url
export const withProxy = (url = '') => {
  if (httpRegx.test(url)) {
    return url
  }

  const hasCustomPrefix = customProxyRegx.test(url)
  if (hasCustomPrefix) {
    if (isDev) {
      return url
    }
    const urlArr = url.split('/')
    urlArr.splice(0, 2)
    const baseReqUrl = `/${urlArr.join('/')}`

    return baseReqUrl
  }
  return isDev ? defaultProxyPrefix + url : url
}

const http = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: 'bracket' }),
})

http.interceptors.request.use(
  (config = {}) => {
    const token = window.localStorage.getItem('token')
    if (token)
      config.headers = Object.assign(config.headers, {
        Authorization: `bearer ${token}`,
      })
    config.url = withProxy(config.url)
    return config
  },
  (err) => {
    console.error('配置有误', err)
  }
)

http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && typeof err.toJSON === 'function') {
      const res = err.toJSON()
      if (res && res.status === 401) {
        console.error('登录过期')
      }
    }
    return Promise.reject(err)
  }
)

export default http
```

再定义一个请求函数 `src/apis/common.js`

```jsx
import http from '@/utils/http'

export async function apiGetTopics() {
  return http.get('/topics')
}
```

使用请求，修改 `src/pages/Home/index.jsx`

```jsx
import { apiGetTopics } from '@/apis/common'

// ...
;<button onClick={apiGetTopics}>get topics</button>
```

添加的文件很多，现在一个个解释它们的作用

1. `.env` 这个文件用于定义环境变量。具体使用方法请参考[官方文档](https://create-react-app.dev/docs/adding-custom-environment-variables/)
2. `src/setupProxy.js` 用于配置代理。一般情况下只会有一个代理，但有这样的情况：开发期间，有某个单独的接口需要跟后台调试，这时候需要单独把一个接口代理到后台的本地服务，配合后台进行断点调试。

   所以在这个文件中允许使用多个代理。但同时也存在一些问题：前端需要单独给指定的接口先设置代理前缀（例如 api-abc），然后调试完成后，又要改回来。如果忘了修改，等到发布生产版本的时候就出现接口地址错误。为了解决这个问题，我添加了 `withProxy` 函数。

   要求自定义的代理必须符合某种规则，函数会自动处理代理地址。这样即使在开发期间真的忘记把 api 路径修改回来，也不会导致出错。

3. `src/utils/http.js` 封装的请求函数，注意是添加了默认配置，还有拦截器功能，当然目前只采用了比较简单的处理。可以根据需求扩展它的功能。
4. `src/apis/common.js` 对请求函数的抽离。因为在一般的项目中，不是所有的接口都只引用一次的。简单的，一个选项列表接口就很可能在不同的业务页面中使用多次，如果这个接口变更了，你可能要每个地方都修改一次。因此把这些接口抽离出来，统一管理更方便后续的维护。通常把这些 api 放到 `src/apis` 目录下，根据不同的业务和功能进行划分，方法名习惯使用 `api` 作为前缀。

### 使用 react-query 管理请求

安装依赖

```bash
yarn add react-query
```

在 `src/index.jsx` 中引入

```jsx
import { QueryClient, QueryClientProvider } from 'react-query'
// ...
const client = new QueryClient()
// ...
;<QueryClientProvider client={client}>
  <App />
</QueryClientProvider>
```

修改 `src/pages/Home/index.jsx` ，替换之前的请求函数

```jsx
import { useQuery } from 'react-query'
// ...
const { data: topicRes, refetch } = useQuery('get/topics', apiGetTopics, {
  placeholderData: { data: [] },
})

// ...
;<button onClick={refetch}>get topics</button>
```

## 使用 antd 和 less

```bash
yarn add antd
yarn add babel-plugin-import craco-less -D
```

修改 craco.config.js

```bash
const CracoAlias = require("craco-alias");
const CracoLess = require("craco-less");

module.exports = {
  // antd 按需加载
  // @craco/craco 6.x 需要使用这种方式
  babel: {
    plugins: [
      ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    ],
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        // 从 '/jsconfig.json' 中的获取配置
        source: "jsconfig",
      },
    },

    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

## 使用 tailwindcss

刚开始使用 [tailwindcss](https://tailwindcss.com/docs/installation) 还是不太习惯，因为不喜欢在一个元素里面定义一个很长很长的类名，会影响阅读，但是不得不承认它的高效。

由于本项目也同时支持了 less ，所以是全部使用 tailwindcss 还是一部分比较复杂的使用 less 都是可以的，看自己的选择。

[官方文档](https://tailwindcss.com/docs/guides/create-react-app)有完整的接入例子

```bash
yarn add tailwindcss postcss autoprefixer -D
npx tailwindcss init -p
```

`tailwindcss.config.js`

```bash
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`src/index.less`

```less
// 目前确定 base 会与 antd 的默认样式冲突
// @tailwind base;
@tailwind components;
@tailwind utilities;
```

在 `src/index.jsx` 中引入

```less
// ...
import "./index.less";
```

使用

```jsx
<p className="m-2 p-2 text-lg text-blue-400 border rounded">tailwind css</p>
```

<aside>
🍭 接下来是优化的部分

</aside>

## eslint + prettier

```bash
yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier \
 eslint-plugin-react eslint-plugin-react-hooks -D
```

创建配置文件 `.eslintrc.js`

```jsx
/* eslint-disable no-undef */
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  settings: { react: { version: 'detect' } }, // 指定版本
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
}
```

添加命令用于检测和修复代码规范

`package.json`

```json
{
  "scripts": {
    "lint": "eslint ./src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|ts|tsx|json)\""
  }
}
```
