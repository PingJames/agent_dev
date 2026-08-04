# Python 面向对象编程

> 上一篇我们学会了用"盒子"装数据和用"积木"打包代码。这一篇，我们要学会用"模具造零件"——这就是面向对象编程（OOP）的核心思想。

---

## 一、类与对象：从"图纸"到"实物"

想象你要造一辆汽车。你不会每次造车都从头设计，而是先画一张**图纸**（类），然后照着图纸造出很多辆**汽车**（对象）。

```python
# 定义一个"类"（图纸）
class Dog:
    # 类的属性：所有狗共有的特征
    species = "犬科"

    # 构造方法：创建对象时自动执行，用来初始化对象
    def __init__(self, name, age):
        self.name = name   # 实例属性：每只狗自己的名字
        self.age = age     # 实例属性：每只狗自己的年龄

    # 类的方法：对象能做的事
    def bark(self):
        return f"{self.name} 说：汪汪！"

# 照着图纸，创建两个"对象"（实例）
dog1 = Dog("旺财", 3)
dog2 = Dog("来福", 5)

print(dog1.name)        # 输出：旺财
print(dog1.bark())      # 输出：旺财 说：汪汪！
print(dog2.bark())      # 输出：来福 说：汪汪！
```

**三个关键概念：**
- **`class`**：定义类的关键字，相当于图纸。
- **`__init__`**：构造函数，创建对象时自动调用，`self` 代表对象自己（相当于"我"）。
- **实例属性**：每个对象独有的数据，通过 `self.xxx` 定义。

---

## 二、封装：把内部细节"藏"起来

封装的意思是：**把复杂的东西包起来，只暴露简单的接口。**

比如，你的手机只需要按一个按钮就能开机，不需要你亲自去连接每一根电线。

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance   # 双下划线开头 = 私有属性，外部不能直接访问

    def deposit(self, amount):
        """存钱"""
        if amount > 0:
            self.__balance += amount
            return f"存入 {amount} 元，当前余额：{self.__balance} 元"
        return "金额必须大于0"

    def withdraw(self, amount):
        """取钱"""
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return f"取出 {amount} 元，当前余额：{self.__balance} 元"
        return "余额不足或金额无效"

    def get_balance(self):
        """查看余额（对外提供的安全接口）"""
        return self.__balance

# 使用账户
account = BankAccount("小明", 1000)

# 外部无法直接修改余额（封装保护）
# print(account.__balance)   # 报错！AttributeError

# 只能通过规定的方法操作
print(account.deposit(500))     # 存入 500 元，当前余额：1500 元
print(account.withdraw(200))    # 取出 200 元，当前余额：1300 元
print(account.get_balance())    # 1300
```

**封装的好处：**
- 防止外部随意修改内部数据，保证数据安全。
- 使用者只需要知道 `deposit` 和 `withdraw` 怎么用，不用管里面怎么算的。

---

## 三、继承：站在父辈的肩膀上

继承让子类"自动拥有"父类的所有属性和方法，还能自己扩展新功能。

```python
# 父类：动物
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "某种动物叫声"

    def introduce(self):
        return f"我是 {self.name}"

# 子类：狗（继承自 Animal）
class Dog(Animal):
    def speak(self):   # 重写父类方法
        return f"{self.name} 说：汪汪！"

# 子类：猫（继承自 Animal）
class Cat(Animal):
    def speak(self):   # 重写父类方法
        return f"{self.name} 说：喵喵！"

# 使用
dog = Dog("旺财")
cat = Cat("咪咪")

print(dog.introduce())   # 我是 旺财（继承自父类）
print(dog.speak())       # 旺财 说：汪汪！（子类重写）
print(cat.speak())       # 咪咪 说：喵喵！
```

**继承的核心：**
- `class Dog(Animal)`：Dog 继承了 Animal 的一切。
- **重写（Override）**：子类可以覆盖父类的方法，实现自己的逻辑。
- `super()`：如果想在子类里调用父类的方法，可以用 `super().方法名()`。

---

## 四、多态：同一种调用，不同的表现

多态的字面意思是"多种形态"。在 Python 中，**不同的对象可以对同一个消息做出不同的响应。**

```python
# 一个函数，接收任何 Animal 的子类对象
def animal_concert(animal):
    print(animal.speak())

# 传入不同的对象，产生不同的结果
animal_concert(Dog("旺财"))   # 旺财 说：汪汪！
animal_concert(Cat("咪咪"))   # 咪咪 说：喵喵！
```

**为什么这很强大？**

假设你要开发一个游戏，里面有 100 种怪物。如果没有多态，你可能要写 100 个 `if/else`：

```python
# 笨办法（不要这样写）
if monster_type == "狗":
    dog.attack()
elif monster_type == "猫":
    cat.attack()
# ... 写100个 elif
```

**有了多态，只需要一行：**

```python
monster.attack()   # 不管是什么怪物，自动调用它自己的 attack 方法
```

---

## 五、综合实例：设计一个小游戏角色系统

把上面学的全部串起来：

```python
class Character:
    """游戏角色基类"""
    def __init__(self, name, hp):
        self.name = name
        self.__hp = hp          # 私有：生命值
        self.__max_hp = hp

    def take_damage(self, damage):
        self.__hp = max(0, self.__hp - damage)
        return f"{self.name} 受到 {damage} 点伤害，剩余 HP：{self.__hp}"

    def is_alive(self):
        return self.__hp > 0

    def attack(self):
        return f"{self.name} 发起攻击！"


class Warrior(Character):
    """战士：高血量，普通攻击"""
    def attack(self):
        return f"{self.name} 挥舞大剑，造成 15 点伤害！"


class Mage(Character):
    """法师：低血量，魔法攻击"""
    def __init__(self, name, hp, mp):
        super().__init__(name, hp)   # 调用父类构造
        self.mp = mp

    def attack(self):
        if self.mp >= 10:
            self.mp -= 10
            return f"{self.name} 释放火球术，造成 30 点伤害！剩余 MP：{self.mp}"
        return f"{self.name} MP 不足，只能普通攻击！"


# 实战演示
warrior = Warrior("亚瑟", 100)
mage = Mage("甘道夫", 60, 20)

team = [warrior, mage]

for member in team:
    print(member.attack())   # 多态：同样是 attack()，表现完全不同
```

---

## 六、速查表

| 概念 | 一句话解释 | Python 写法 |
|---|---|---|
| **类** | 对象的图纸 | `class Dog:` |
| **对象/实例** | 根据图纸造出来的实物 | `dog = Dog()` |
| **`__init__`** | 构造函数，创建对象时自动执行 | `def __init__(self, name):` |
| **`self`** | 代表对象自己，必须作为第一个参数 | `self.name = name` |
| **实例属性** | 每个对象独有的数据 | `self.age = 5` |
| **类属性** | 所有对象共享的数据 | `species = "犬科"` |
| **方法** | 对象能做的事 | `def bark(self):` |
| **封装** | 把内部细节藏起来，只暴露接口 | `__balance`（私有属性） |
| **继承** | 子类自动拥有父类的一切 | `class Dog(Animal):` |
| **重写** | 子类覆盖父类的方法 | 同名方法重新定义 |
| **多态** | 同一个调用，不同对象表现不同 | `animal.speak()` |

> **OOP 的本质不是语法，而是思维方式。** 当你看到任何问题都下意识想"这里该定义一个什么类"时，你就真正入门了。🎯