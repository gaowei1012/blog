## 对象
- 在 `javascript` 中只有一个 **对象**，每一个实例对象都有一个私有的属性（`__proto__`）指向它的构造函数的原型对象（`propotype`），该原型对象也有一个自己的原型对象（`__proto__`），层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个原型链中的最后一个环节。(引用于MND)

> 实例

```javascript
  // 在函数上面添加变量
  
  let fun1 = function() {
    this.a = 1;
    this.b = 2;
  }

  // 在obj的函数原型上定义属性 
  fun1.propotype.c = 12
  // 那么在fun1上，就存在 c = 12
  // c = 12


  // 通过原型（proptype）创建新的方法属性

  function Create() {
    return this.a + this.b
  }

  // propotype 
  Create.propotype.findOnes = function(soucre, string) {
    // TODO
  }

  // 上面例子在方法上的原型上添加了一个 findOnes 方法，进而 Create 函数的 propotype 中就会增加一个 findOnes 方法，用于我们处理事务

```

