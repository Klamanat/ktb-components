# ktb-alert



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                                                              | Default       |
| ---------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `position` | `position` |             | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'` |


## Methods

### `add(message: string, type?: AlertType, duration?: number) => Promise<void>`

เพิ่ม alert ใหม่

#### Parameters

| Name       | Type                                          | Description |
| ---------- | --------------------------------------------- | ----------- |
| `message`  | `string`                                      |             |
| `type`     | `"info" \| "error" \| "success" \| "warning"` |             |
| `duration` | `number`                                      |             |

#### Returns

Type: `Promise<void>`



### `remove(id: number) => Promise<void>`

ปิด alert ตาม id (มี fade-out animation)

#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `number` |             |

#### Returns

Type: `Promise<void>`



### `setPosition(pos: AlertPosition) => Promise<void>`

เปลี่ยนตำแหน่งของ alert container

#### Parameters

| Name  | Type                                                                                              | Description |
| ----- | ------------------------------------------------------------------------------------------------- | ----------- |
| `pos` | `"top-right" \| "top-left" \| "top-center" \| "bottom-right" \| "bottom-left" \| "bottom-center"` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
