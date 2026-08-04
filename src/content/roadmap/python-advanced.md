# Python 进阶特性

> 当你已经会写函数和类，下一步就是学会 Python 的"秘密武器"——它们能让你的代码更简洁、更高效、更优雅。这篇不需要你提前掌握复杂理论，跟着代码敲一遍，你会发现"原来还能这样写"。

---

## 一、迭代器：逐个"拿"东西，而不是一次性"搬"回家

迭代器是一个**记住遍历位置**的对象，它一次只给你一个元素，而不是把所有元素一股脑塞给你。

```python
# 列表是可迭代对象，但不是迭代器
my_list = [1, 2, 3]

# 用 iter() 把它变成迭代器
it = iter(my_list)

# 用 next() 逐个取值
print(next(it))   # 1
print(next(it))   # 2
print(next(it))   # 3
# print(next(it)) # 报错！StopIteration，已经取完了
```

**为什么要用迭代器？** 想象你在看一本 1000 页的书。列表相当于把整本书复印一份给你，迭代器相当于一次只翻开一页给你看——**省内存**。

自己写一个迭代器：

```python
class CountDown:
    """从 n 倒数到 1 的迭代器"""
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.start <= 0:
            raise StopIteration   # 迭代结束的信号
        self.start -= 1
        return self.start + 1

# 使用
for num in CountDown(5):
    print(num)   # 输出：5, 4, 3, 2, 1
```

---

## 二、生成器：用函数写迭代器，一行 `yield` 搞定

如果你觉得上面的类太麻烦，**生成器**就是救星。它用普通函数的写法，实现迭代器的功能。

```python
def countdown(n):
    """从 n 倒数到 1"""
    while n > 0:
        yield n   # yield 会"暂停"函数，记住当前状态，下次从这里继续
        n -= 1

# 使用
for num in countdown(5):
    print(num)   # 输出：5, 4, 3, 2, 1
```

**`yield` 和 `return` 的区别：**
- `return`：函数结束，返回值，下次调用从头再来。
- `yield`：函数"暂停"，返回值，下次调用从暂停处继续。

**生成器表达式**：和列表推导式很像，只是把 `[]` 换成 `()`：

```python
# 列表推导式：一次性生成所有数据，占用内存
squares_list = [x**2 for x in range(1000000)]

# 生成器表达式：惰性求值，用的时候才生成，几乎不占内存
squares_gen = (x**2 for x in range(1000000))

print(sum(squares_gen))   # 可以正常计算，但内存占用极小
```

---

## 三、装饰器：给函数"穿外套"，不改动原代码加功能

装饰器本质上是一个**接收函数作为参数，并返回一个新函数**的函数。

### 3.1 最简单的装饰器

假设你想知道每个函数运行了多久：

```python
import time

def timer(func):
    """计时装饰器"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} 运行了 {time.time() - start:.4f} 秒")
        return result
    return wrapper

# @timer 是语法糖，等价于：slow_function = timer(slow_function)
@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
# 输出：slow_function 运行了 1.0012 秒
```

**`*args` 和 `**kwargs`** 是 Python 的"万能参数"，表示"不管传多少个位置参数和关键字参数，我都能接住"。

### 3.2 带参数的装饰器

如果你想让装饰器更灵活，可以套两层：

```python
def repeat(times):
    """让函数重复执行 n 次"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def say_hello():
    print("你好！")

say_hello()   # 输出 3 次"你好！"
```

---

## 四、上下文管理器：`with` 语句，自动帮你"善后"

打开文件后忘记关闭？获取锁后忘记释放？上下文管理器就是用来解决这类"用了要还"的问题。

### 4.1 基本用法：`with` 语句

```python
# 传统写法（容易忘记关闭）
f = open("test.txt", "w")
f.write("hello")
f.close()

# 上下文管理器（自动关闭，即使出异常也会关闭）
with open("test.txt", "w") as f:
    f.write("hello")
# 出了 with 块，文件自动关闭
```

### 4.2 自己实现上下文管理器

```python
class DatabaseConnection:
    """模拟数据库连接"""
    def __enter__(self):
        print("🔗 连接数据库...")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("🔒 关闭数据库连接...")
        # 如果返回 True，会吞掉异常；返回 None，异常正常抛出

    def query(self, sql):
        print(f"执行 SQL：{sql}")

# 使用
with DatabaseConnection() as db:
    db.query("SELECT * FROM users")
# 输出：
# 🔗 连接数据库...
# 执行 SQL：SELECT * FROM users
# 🔒 关闭数据库连接...
```

### 4.3 用 `contextmanager` 简化（推荐）

用装饰器写更简洁：

```python
from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"获取资源：{name}")
    yield name   # yield 之前的代码是 __enter__，之后的是 __exit__
    print(f"释放资源：{name}")

with managed_resource("数据库连接") as r:
    print(f"使用 {r} 中...")
# 输出：
# 获取资源：数据库连接
# 使用 数据库连接 中...
# 释放资源：数据库连接
```

---

## 五、综合实例：处理大文件的"最佳实践"

把四大特性串起来，写一个**读取大日志文件并统计关键词**的工具：

```python
import time
from contextlib import contextmanager

# 1. 上下文管理器：安全打开文件
@contextmanager
def safe_open(filename):
    print(f"📂 正在打开 {filename}...")
    f = open(filename, "r", encoding="utf-8")
    try:
        yield f
    finally:
        f.close()
        print(f"📂 已关闭 {filename}")

# 2. 生成器：逐行读取，不占用大量内存
def line_generator(file_obj):
    for line in file_obj:
        yield line.strip()   # strip() 去掉换行符

# 3. 装饰器：统计处理时间
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"⏱️ {func.__name__} 耗时：{time.time() - start:.4f} 秒")
        return result
    return wrapper

# 4. 综合使用
@timer
def count_keyword(filename, keyword):
    count = 0
    with safe_open(filename) as f:
        # 迭代器 + 生成器：逐行处理，内存友好
        for line in line_generator(f):
            if keyword in line:
                count += 1
    return count

# 假设有一个大日志文件，统计"ERROR"出现次数
# result = count_keyword("app.log", "ERROR")
# print(f"找到 {result} 处错误")
```

---

## 六、速查表

| 特性 | 核心作用 | 关键语法 | 记忆口诀 |
|---|---|---|---|
| **迭代器** | 逐个取值，省内存 | `__iter__()` + `__next__()` | "翻书一页一页看" |
| **`iter()` / `next()`** | 把可迭代对象变成迭代器 | `it = iter(list)` | "造个迭代器" |
| **生成器** | 用函数写迭代器 | `yield` | "暂停魔法" |
| **生成器表达式** | 惰性求值的推导式 | `(x for x in range(100))` | "圆括号省内存" |
| **装饰器** | 不改动原函数，加功能 | `@decorator` | "给函数穿外套" |
| **`*args` / `**kwargs`** | 接收任意参数 | `def func(*args, **kwargs)` | "万能口袋" |
| **上下文管理器** | 自动获取和释放资源 | `with ... as ...` | "用了自动还" |
| **`__enter__` / `__exit__`** | 上下文管理器的两个钩子 | 类方法实现 | "进门出门" |
| **`@contextmanager`** | 用生成器简化上下文管理器 | `yield` 分割前后逻辑 | "装饰器版 with" |

> **进阶特性的本质，是让代码写得更"Pythonic"。** 不要追求炫技，而是在合适的场景用合适的工具。当你习惯用 `with` 管理资源、用 `yield` 处理大数据、用装饰器解耦功能时，你就从"会写 Python"变成了"写好 Python"。
