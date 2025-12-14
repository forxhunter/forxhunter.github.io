---
layout: post
title: The Era of the "AI Architect": Why We Must Master, Not Avoid, Intelligent Tools
date: 2025-12-14 16:00:00
description: how to use AI tools to improve your work/research
tags: AI
categories: introduction
featured: true
giscus_comments: true
---




In the halls of Stanford University, a new course for Fall 2025, [CS146S: The Modern Software Developer](https://themodernsoftware.dev/), is quietly marking the end of an era. Its syllabus suggests a radical shift: software engineering is no longer about typing code from scratch (0 to 1). It is now an iterative workflow of Plan, Generate, Modify, and Repeat. It is shaking the foundations of scientific research and data science. There is a growing temptation in some academic and professional circles to avoid AI tools to preserve "purity" or "rigor." This is a mistake. Avoiding these tools is not a badge of honor; it is a fast track to obsolescence. The serious path forward is not abstinence, but disciplined mastery.

To stay relevant, we must transition from being "code writers" to "AI Architects." Here is what I learnt based on my daily experiences with LLMs.

## 1. The Art of "Contextual" Prompting

The most common failure mode with AI is treating it like a search engine. A query like "write a Python script to analyze DNA" will yield generic, often buggy results. 

Best practices from open-source repositories suggest a "Context-First" approach. Before you ask for a single line of code, you must feed the model your **"design documents"—your schema, your variable definitions, and your hypothesis**. For this, there are a lot of existing prompting templates available online, you can take a look and modify it based on your needs. I have generated one for general scientific workflow you might want to take a look here: [
Scientific-Project-Initiation-Prompt-Workflow](https://github.com/forxhunter/Scientific-Project-Initiation-Prompt-Workflow).

The Strategy: 
+ Don't just prompt for code. Prompt for a plan. 
+ Ask the AI to write a pseudocode outline first. Review the logic. Only then ask it to generate the implementation. 
+ You better have your own repo of different prompts for different tasks as a framework, which you will use again and again in later similar tasks.

---

## 2. Code Review: The "Junior Developer" Mindset

A dangerous habit is pasting AI-generated code directly into a project. You must treat every AI output exactly as you would a Pull Request from a bright but inexperienced junior intern. This is very tricky, because it basically **shifts your most intensive work from writing a bunch of codes to review even more codes written by LLMs**.

The Strategy: 
+ Ask AI to make code concise and readable first.(Prompting)
+ If you can make a plan and let AI to execute them step by step, always add a testing step.(Prompting)
+ Now, based on the AI's output, you can make a final decision whether to accept or reject it. 


The Rule: **Never trust; always verify**. 

+ Best pratice is to look at what LLM writes with the help of pseudocode outline or logic flow figures. (You should always do this before you submit the final project, even if you are sure about the logic.)
+ If an AI writes a function, you must demand it also writes the unit tests to prove that function works. If the tests fail, the code is rejected. This "Test-Driven Generation" is the only safety net that scales. 

---

## 3. Rigorous Scientific Verification

In research, a "hallucination" is not just a bug; it is scientific misconduct. AI tools are prone to inventing citations or smoothing over data anomalies to please the user.

The Strategy: Use the "Sandwich Method."

+ Human: Formulate the hypothesis and experimental design.

+ AI: Execute the data cleaning, boilerplate coding, and initial visualization.

+ Human: rigorously verify the output.(personally review the code, find other sources to check the logic and some fundamental scientific facts.)


**Critical Check**: Never ask an AI to "find sources that support X." It will likely fabricate them. Instead, use AI to summarize existing papers you have already vetted. As noted in recent papers like Ten Simple Rules for AI-Assisted Coding, AI should be used to automate the process, not the reasoning.