# Supp' the Virtual Assistant that provide Support everyday - SELF-TRACKING APP FOR DEVELOPERS

## Introduction

A good developer have to practice a million little things every day, keep track of projects tasks and be on multiple fronts.
Furthermore, some good habit are mandatory to keep productivity and motivation flow as it's highest.
Well designed time management system can help being focused on what's matter at any moment.
A lot of things have to be taken into account on daily basis (exercise, eat well, clean home, etc.).
Using different tools can help in this planification system but multiple endpoints means multiple distractions.

Even though, it will provide specific tools for great DX (developerExperience), this application can be extended to a more general audience.

**So the goal here, is to provide everything that i need, using good development practices, to be productive.**

## Philosophy

- **" Automate things that can be automated "** - In project development as in project features, the goal is to identify friction and repetitive tasks, develop a tool that fit the needs and never lose time again.
- **" Pick robust tools not brilliant products "** - Even though a well-made product seem shiny at first sight, a robust tool will always be smarter to work with in the end. Choose Flexibility over Simplicity. Largely-adopted tools over Last-trending products.
- **" Dream big, start small, keep improving "** - Don't over-engineer things, think modular, adapt, readapt and adapt again, everything is a failure until it become a success.
- **" Code without tests is broken by design "** - We will try to follow a TDD methodology for this project.
- **" Build in public place allows feedback and sharing knowledge "** - This project will always be in public repository so that anyone can look upon it, give feedback and advice, feel free to ask advice as well !

## Tech Stack

### Data Storage

This project doesn't compute a lot of data for now, a MongoDB database will be a perfect fit.<br/>
As the project grow, we might consider implement a PostGre SQL for more structured data or a CassandraDB for availability and scalability.

### Back-End Services

We will develop a single API powered by Node/Express using GraphQL to serve data to our Front-End.

### Front-End Services

A WebApplication powered by React will consume our Back-End API to retrieve data.<br/>
Later on, we might consider develop a React Native appliction.

### Typing

The project is intended to grow as large as possible so we will need strong typing for maintability. TypeScript will be a really handy tool on this project.

### CSS

We will use the popular framework Bootstrap for this project.

### Testing

We will use React-testing-libray and Vitest for unit testing.

### DevTools

We will use Vite to generate, serve, and build our Front-End React.

## Key Features

1. Create an onboarding where user can create it's account and have access to a personnal space.
1. Create homepage with either "NatGeo Picture of The Day" or "Nasa Picture of The Day" (or random between both), current time/hour, a greeting phrase, next 3-4 TODO tasks.
1. Create CRUD in personal space for user settings and tasks.

## TODO =>

- Setup Project
- CRUD Task
- CRUD User
- Home not-connected
- Onboarding
- Home connected
- Task Management
