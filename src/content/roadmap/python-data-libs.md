# Python 科学计算库入门

> 如果说 Python 是 AI 世界的"普通话"，那么 NumPy、Pandas、Matplotlib 就是这门语言里的"三板斧"。学会它们，你就拿到了进入数据科学和 AI 大门的钥匙。

---

## 一、NumPy：让 Python 算得飞快

Python 自带的列表算数学很慢。NumPy 提供了**数组（ndarray）**，让你像写数学公式一样批量计算。

```python
import numpy as np

# 创建数组：比 Python 列表快几十倍
arr = np.array([1, 2, 3, 4, 5])

# 批量运算：每个元素同时操作
print(arr * 2)          # [ 2  4  6  8 10]
print(arr + 10)         # [11 12 13 14 15]

# 二维数组：像数学里的矩阵
matrix = np.array([[1, 2], [3, 4], [5, 6]])
print(matrix.shape)     # (3, 2)  3行2列

# 常用计算：求和、平均、最大
print(np.sum(arr))      # 15
print(np.mean(arr))     # 3.0
print(np.max(arr))      # 5
```

**一句话记住 NumPy：** 把一堆数字装进一个"超级列表"，一次性算完，不用写循环。

---

## 二、Pandas：Excel 表格的 Python 版

Pandas 用 **DataFrame**（数据框）来管理表格数据，就像 Python 里的 Excel。

```python
import pandas as pd

# 创建一张表格
data = {
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [20, 22, 21],
    "分数": [85, 92, 78]
}
df = pd.DataFrame(data)

# 查看数据
print(df.head(2))       # 看前2行
print(df["分数"])       # 取某一列
print(df[df["分数"] > 80])  # 筛选：分数大于80的行

# 统计摘要
print(df.describe())    # 自动算平均、最大、最小等
```

**读取真实文件：**

```python
# 读取 CSV（最常用）
df = pd.read_csv("data.csv")

# 保存结果
df.to_csv("result.csv", index=False)
```

**一句话记住 Pandas：** 用代码操作 Excel 表格，筛选、统计、读写文件，几行搞定。

---

## 三、Matplotlib：把数据画成图

数据藏在表格里看不出趋势？画出来就一目了然。

```python
import matplotlib.pyplot as plt

# 数据
months = ["1月", "2月", "3月", "4月", "5月"]
sales = [120, 150, 180, 140, 200]

# 画折线图
plt.plot(months, sales, marker="o", color="red")
plt.title("月度销售额")
plt.xlabel("月份")
plt.ylabel("销售额（万元）")
plt.grid(True)
plt.show()
```

**常用图表类型：**

```python
# 柱状图
plt.bar(months, sales, color="skyblue")

# 散点图
plt.scatter([1, 2, 3], [4, 5, 6])

# 饼图
plt.pie([30, 20, 50], labels=["A", "B", "C"], autopct="%1.1f%%")
```

**一句话记住 Matplotlib：** 给数据拍张照，折线、柱状、饼图，选一种让数字开口说话。

---

## 四、4 分钟速查表

| 库 | 核心对象 | 常用操作 | 什么时候用 |
|---|---|---|---|
| **NumPy** | `ndarray` 数组 | `np.array()`、`np.sum()`、`np.mean()` | 大量数字计算、矩阵运算 |
| **Pandas** | `DataFrame` 表格 | `pd.read_csv()`、`df["列名"]`、`df.describe()` | 处理表格数据、数据清洗 |
| **Matplotlib** | `plt` 画图模块 | `plt.plot()`、`plt.bar()`、`plt.show()` | 数据可视化、出报告 |

> **NumPy 负责算，Pandas 负责管，Matplotlib 负责看。** 这三个库配合起来，就是 AI 开发最基础的数据流水线。先把这"三板斧"练熟，后面的机器学习库（如 Scikit-learn、PyTorch）学起来会轻松很多。
