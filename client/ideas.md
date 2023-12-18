## Q:

```vue
<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

const groceryList = ref([
  { id: 0, text: 'Vegetables' },
  { id: 1, text: 'Cheese' },
  { id: 2, text: 'Whatever else humans are supposed to eat' }
])
</script>

<template>
  <ol>
    <TodoItem
      v-for="item in groceryList"
      :todo="item"
      :key="item.id"
    ></TodoItem>
  </ol>
</template>
```

这个 vue 组件的 groceryList 变量是直接定义的。你可以帮我改成从 `http://localhost:5000/get` 请求得到的吗？

这是后端的API：

```js
// get
app.get('/get', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataFromTables();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
```

## A:

当然可以！您希望将组件中的 `groceryList` 变量的值改为从 `http://localhost:5000/get` 接口获取的数据。

以下是代码示例，展示如何进行修改：

```vue
<script setup>
import { ref, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'

const groceryList = ref([])

// 在组件挂载后发起请求获取数据
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/get')
    const data = await response.json()
    groceryList.value = data.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <ol>
    <TodoItem
      v-for="item in groceryList"
      :todo="item"
      :key="item.id"
    ></TodoItem>
  </ol>
</template>
```

修改后的代码解释如下：

1. 在组件的 `script` 部分，引入了 `onMounted` 生命周期钩子函数，该函数会在组件挂载后自动执行。

2. 在 `onMounted` 函数中，使用 `fetch` 函数发送了一个 GET 请求到 `http://localhost:5000/get` 接口，并通过 `await` 等待响应并解析为 JSON 格式。

3. 获取到的数据被赋值给 `groceryList` 变量，将其更新为从后端接口获取的数据。

4. 在组件的模板部分，将 `groceryList` 数组中的每个元素渲染为 `TodoItem` 组件的一个实例。

通过这样的修改，您的 Vue 组件将会在挂载后从 `http://localhost:5000/get` 接口获取数据，并渲染在界面上。

请注意，在实际使用中，您需要确保后端接口 `http://localhost:5000/get` 可以正常响应，并返回正确的数据格式。另外，还需要处理请求的错误情况，比如网络故障或接口返回错误信息等。