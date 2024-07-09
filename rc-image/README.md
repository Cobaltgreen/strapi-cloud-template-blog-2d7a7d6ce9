# rc-image

React Image.

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]
[![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/rc-image.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-image
[github-actions-image]: https://github.com/react-component/image/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/image/actions
[travis-image]: https://img.shields.io/travis/react-component/image/master?style=flat-square
[travis-url]: https://travis-ci.org/react-component/image
[circleci-image]: https://img.shields.io/circleci/build/github/react-component/image/master?style=flat-square
[circleci-url]: https://circleci.com/gh/react-component/image
[coveralls-image]: https://img.shields.io/coveralls/react-component/image.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/image?branch=master
[codecov-image]: https://img.shields.io/codecov/c/gh/react-component/image?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/image
[david-url]: https://david-dm.org/react-component/image
[david-image]: https://david-dm.org/react-component/image/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/image?type=dev
[david-dev-image]: https://david-dm.org/react-component/image/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-image.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-image
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-image
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-image
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square

## Feature

- [x] Placeholder
- [x] Preview
- [x] Rotate
- [x] Zoom
- [x] Flip
- [x] Fallback
- [x] Multiple Preview

## install

[![rc-image](https://nodei.co/npm/rc-image.png)](https://npmjs.org/package/rc-image)

## Usage

```bash
npm install
npm start
```

```js
import Image from 'rc-image';

export default () => (
  <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
);
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| preview | boolean \| { visible: boolean, scaleStep: number, onVisibleChange: function(value, prevValue), getContainer: string \| HTMLElement \| (() => HTMLElement) \| false } | true | Whether to show preview |
| prefixCls | string | rc-image | Classname prefix |
| placeholder | boolean \| ReactElement | - | if `true` will set default placeholder or use `ReactElement` set customize placeholder |
| fallback | string | - | Load failed src |
| previewPrefixCls | string | rc-image-preview | Preview classname prefix |
| onError | (event: Event) => void | - | Load failed callback |

## Image.PreviewGroup

preview the merged src

```js
import Image from 'rc-image';

export default () => (
  <Image.PreviewGroup>
    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
    <Image src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ" />
  </Image.PreviewGroup>
);
```

### API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| preview | boolean \|<br> { visible: boolean, scaleStep: number, onVisibleChange: function(value, prevValue), getContainer: string \| HTMLElement \| (() => HTMLElement) \| false, countRender?: (current: number, total: number) => string, current: number } | true | Whether to show preview, <br> current: If Preview the show img index, default 0 |
| previewPrefixCls | string | rc-image-preview | Preview classname prefix |
| icons | { [iconKey]?: ReactNode } | - | Icons in the top operation bar, iconKey: 'rotateLeft' \| 'rotateRight' \| 'zoomIn' \| 'zoomOut' \| 'close' \| 'left' \| 'right' 

## Example

http://localhost:8003/examples/

## Test Case

```
npm test
```

## Coverage

```
npm run coverage
```

## License

rc-image is released under the MIT license.