# Python 基础语法：零基础速通

> 如果你完全没写过代码，这篇文章就是为你准备的。不需要任何前置知识，跟着代码敲一遍，你就能看懂 Python 在说什么。

---

## 一、数据类型与变量：Python 里装东西的"盒子"

变量就像一个贴标签的盒子，你把数据放进去，以后用标签就能找到它。

```python
# 数值：整数和小数
age = 25           # 整数（int）
price = 19.99      # 小数/浮点数（float）

# 字符串：一串文字，用单引号或双引号包起来
name = "Alice"
greeting = '你好，Python！'

# 列表：可以装很多东西，还能随时增删改
fruits = ["苹果", "香蕉", "橙子"]
fruits.append("葡萄")      # 添加元素
print(fruits[0])           # 输出：苹果（索引从0开始）

# 元组：和列表很像，但创建后不能修改
coordinates = (10, 20)

# 字典：键值对，像查字典一样用"键"找"值"
student = {
    "name": "小明",
    "age": 20,
    "score": 95.5
}
print(student["name"])     # 输出：小明

# 集合：自动去重，没有重复元素
tags = {"Python", "编程", "Python", "入门"}
print(tags)                # 输出：{'Python', '编程', '入门'}
```

**一句话总结：**
- 列表用 `[]`，能改；元组用 `()`，不能改；字典用 `{}` 存键值对；集合用 `{}` 自动去重。

---

## 二、控制流与循环：让代码"有脑子"

### 2.1 条件判断：if / else

```python
score = 85

if score >= 90:
    grade = "优秀"
elif score >= 60:
    grade = "及格"
else:
    grade = "不及格"

print(grade)   # 输出：及格
```

`elif` 是 "else if" 的缩写，表示"否则如果"。**注意缩进！** Python 用缩进（通常是 4 个空格）来表示代码块，而不是大括号。

### 2.2 循环：重复做事

**for 循环**：遍历一个序列。

```python
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits:
    print(f"我喜欢吃{fruit}")
```

**while 循环**：条件满足就一直执行。

```python
count = 0
while count < 3:
    print(f"第 {count + 1} 次")
    count += 1   # 等价于 count = count + 1
```

### 2.3 列表推导式：一行代码搞定循环

这是 Python 的"黑科技"，把循环和条件压缩成一行：

```python
# 传统写法
squares = []
for x in range(1, 6):
    squares.append(x ** 2)

# 列表推导式（结果完全一样）
squares = [x ** 2 for x in range(1, 6)]
# 结果：[1, 4, 9, 16, 25]

# 还能加条件：只保留偶数的平方
even_squares = [x ** 2 for x in range(1, 6) if x % 2 == 0]
# 结果：[4, 16]
```

---

## 三、函数与模块：代码的"乐高积木"

### 3.1 定义函数

把一段常用代码打包成一个函数，以后直接调用：

```python
def greet(name, greeting="你好"):
    """
    打招呼的函数
    name: 对方名字（必填）
    greeting: 问候语（选填，默认"你好"）
    """
    message = f"{greeting}，{name}！"
    return message

# 调用函数
print(greet("小明"))              # 输出：你好，小明！
print(greet("Alice", "Hello"))    # 输出：Hello，Alice！
```

**参数传递规则：**
- `name` 是**位置参数**，调用时必须按顺序传。
- `greeting="你好"` 是**默认参数**，不传就用默认值。

### 3.2 Lambda 表达式：迷你函数

如果函数只有一行，可以用 lambda 简写：

```python
# 普通函数
def add(a, b):
    return a + b

# 等价 lambda
add = lambda a, b: a + b

print(add(3, 5))   # 输出：8
```

lambda 常用于排序、过滤等场景：

```python
students = [("小明", 85), ("小红", 92), ("小刚", 78)]
# 按分数（索引1）排序
students.sort(key=lambda x: x[1])
print(students)   # [('小刚', 78), ('小明', 85), ('小红', 92)]
```

### 3.3 模块导入：站在巨人的肩膀上

Python 的强大在于它有海量的**模块**（别人写好的工具包）。

```python
# 导入整个模块
import math
print(math.sqrt(16))   # 输出：4.0

# 只导入模块里的某个函数
from random import randint
print(randint(1, 100)) # 输出：1~100 之间的随机整数

# 给模块起别名（常用）
import datetime as dt
now = dt.datetime.now()
print(now)
```

**包管理小贴士：**
- 标准库（如 `math`、`random`、`datetime`）安装 Python 自带，直接 import。
- 第三方库（如 `requests`、`pandas`）需要先用 pip 安装：
  ```bash
  pip install requests
  ```
  然后在代码里 `import requests` 即可使用。

---

## 四、速查表

| 知识点 | 核心记忆点 |
|---|---|
| 变量 | `=` 赋值，不用声明类型 |
| 列表 `[]` | 可变、有序、能重复 |
| 元组 `()` | 不可变、有序 |
| 字典 `{}` | 键值对，键唯一 |
| 集合 `{}` | 无序、自动去重 |
| if / else | 注意缩进！ |
| for / while | for 遍历，while 条件循环 |
| 列表推导式 | `[表达式 for 变量 in 序列 if 条件]` |
| def 函数 | `return` 返回值，默认参数放后面 |
| lambda | `lambda 参数: 返回值` |
| import | `import 模块` 或 `from 模块 import 函数` |
