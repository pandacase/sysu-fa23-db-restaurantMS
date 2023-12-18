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

---

## Q:

我想写一个 table 组件，内含有表头和表项。其中表项已经从后端数据库获取，是数据库返回的一行行内容经过json解析后的内容。
现在有2个子页面都需要导入这个组件，但是两个子页面导入的时候，我需要让这个 table 组件根据需求变换表头。比如 `/order` 下的表头是 `id, name, item`, 而 `/menu` 子页面下导入组件时，表头是 `id, price` 。请问如何设计？

## A:

你可以通过传递 props 参数给 table 组件来实现根据需求变换表头的功能。通过在不同的子页面中传递不同的表头数据到 table 组件中，你可以根据不同的需求来渲染不同的表头。

下面是一个示例的 table 组件的设计：

```vue
<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <!-- 其他列根据需求渲染 -->
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
/* 样式定义 */
</style>
```

在 `/order` 子页面中使用 table 组件时，你可以传递表头数据为 `id, name, item`：

```vue
<template>
  <div>
    <h1>Order Page</h1>
    <Table :columns="['id', 'name', 'item']" :items="orderItems" />
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  components: {
    Table
  },
  data() {
    return {
      orderItems: [] // 从后端数据库获取的订单数据
    }
  },
  // 其他逻辑
}
</script>

<style scoped>
/* 页面样式定义 */
</style>
```

在 `/menu` 子页面中使用 table 组件时，你可以传递表头数据为 `id, price`：

```vue
<template>
  <div>
    <h1>Menu Page</h1>
    <Table :columns="['id', 'price']" :items="menuItems" />
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  components: {
    Table
  },
  data() {
    return {
      menuItems: [] // 从后端数据库获取的菜单数据
    }
  },
  // 其他逻辑
}
</script>

<style scoped>
/* 页面样式定义 */
</style>
```

通过使用不同的 props，你可以灵活地控制 table 组件的表头内容，从而根据页面需求渲染不同的表头。同时，在各个子页面中分别获取对应的数据，在 table 组件中渲染表项内容。

这样设计的好处是，table 组件可以根据传入的 props 数据动态展示不同的表头，并且可以在各个子页面中复用，减少了重复的代码和逻辑。