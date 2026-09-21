---
title: Code that reads aloud
date: 2026-09-18
excerpt: "A simple test for a change: if you cannot explain it in one sentence, it is not ready yet."
tags:
  - software
---

When a change is hard to explain, the problem is usually not the explanation. It is the change.

Before opening a pull request I ask whether I can say, in one sentence, what the diff does and why it exists. If the answer starts with "and also", or needs a diagram, the work is still mixed together.

This is not a style rule. It is a way to notice that more than one decision is hiding in the same commit.

## What usually gets mixed

- A refactor and a bugfix.
- A new API and the migration off the old one.
- A behavior change and the wiring to observe it.

Splitting them does not make the work slower. It makes the code cheaper to review, revert, and read again in a few months.

```go
// One change, one reason.
func ShouldSplit(diff string) bool {
    return strings.Contains(diff, "and also")
}
```

The bar can get more precise later. The starting point is enough if it is honest: **one idea per change**.
