# 📐 Using Math and Expressions in TSX

tscircuit allows you to use JavaScript math and expressions directly inside your TSX circuit files.  
This makes your designs more dynamic, reusable, and parametric — ideal for components that depend on variables, spacing, or calculated values.

---

## 🧮 Why Use Math in TSX?

In many circuit designs, certain positions or values depend on others — for example:
- The spacing between resistors in a chain  
- Calculating total resistance or voltage drop  
- Positioning components based on loop indices

Instead of manually typing every number, you can use JavaScript arithmetic and variables to compute them automatically.

---

## 🔢 Basic Arithmetic

Example:
```
&lt;resistor resistance={100 + 20} /&gt;  
&lt;wire x1={10} x2={10 + 5} y1={0} y2={0} /&gt;
```

This creates a resistor of 120 Ω and a wire that extends 5 mm from the base coordinate.

---

## 🧱 Using Variables

Declare variables and reuse them throughout your circuit.

```
const baseX = 10  
const spacing = 5

&lt;capacitor x={baseX + spacing} /&gt;  
&lt;resistor x={baseX + spacing * 2} /&gt;
```

You can tweak the “spacing” value and your layout adjusts accordingly.

---

## 🧩 Expressions in Attributes

You can also use conditionals and computed attributes.
```
&lt;wire  
&nbsp;&nbsp;color={isPowerLine ? 'red' : 'black'}  
&nbsp;&nbsp;width={baseWidth * 0.5}  
/&gt;
```

This wire changes color based on a condition and calculates its width dynamically.

---

## ⚙️ Function-Based Values

For complex or repetitive patterns, define helper functions.
```
function offsetY(index: number) {  
&nbsp;&nbsp;return index * 10  
}

&lt;led y={offsetY(3)} /&gt;
```
This places the LED 30 mm below the origin.

---

## 🔁 Loops and Arrays

Use arrays or loops to generate multiple components.
```
[1, 2, 3, 4].map((i) =&gt; (  
&nbsp;&nbsp;&lt;resistor key={i} x={i * 10} resistance={100 * i} /&gt;  
))
```
This creates four resistors with increasing resistance and evenly spaced positions.

---

## 🧠 Best Practices

- Keep expressions simple — complex logic belongs in variables or functions.  
- Use descriptive names like “offsetX” or “spacingY”.  
- Store constants (like resistor values) at the top of your file.  
- Prioritize readability — clean code is easier to debug.

---

## 🧾 Summary

Feature | Example | Description  
--- | --- | ---  
Basic math | {10 + 5} | Adds, subtracts, multiplies, divides  
Variables | {baseX + spacing} | Reuses values across components  
Functions | {offsetY(i)} | Calculates positions dynamically  
Conditionals | {isPower ? 'red' : 'black'} | Changes attributes based on logic  
Loops | [1,2,3].map(...) | Generates multiple components

---

## 🚀 Next Steps

Try combining math expressions with:
- Component arrays to create grids or ladders  
- Parameters to make reusable, configurable circuits  
- Functions that calculate geometry dynamically  

Tip: If your circuit isn’t updating as expected, double-check that your expressions return valid numeric or string values.
