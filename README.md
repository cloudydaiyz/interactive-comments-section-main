# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

### Screenshot

![Completed solution screenshot](./images/screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow

### What I learned

This project took a lot longer for me than I initially expected, but it was good for learning. I decided to use TypeScript for the JS code and tried to implement a MVC architecture based on what I learned before from my previous Tic-Tac-Toe project. While making the new elements and render() function from scratch based on the data that I had was insightful, if I were to do this project again, I would definitely use React. However, I don't regret the experience doing this in pure HTML/CSS/Typescript.

Some takeaways for me:
- Only create event bindings for events that will change the state
- Rerender only when the state changes
- You don’t have to define all types in types.ts, just your main ones (at least for me)

### Continued development

If I were to continue this project, I would:
- refactor the MVC architecture
- use `localStorage` to save the current state in the browser that persists when the browser is refreshed
- dynamically track the time since the comment or reply was posted
- use React.js

### Useful resources

- [Frontend Web Development: In Depth (HTML, CSS, JavaScript, TypeScript, React)](https://www.youtube.com/watch?v=MsnQ5uepIaE) - Video by freeCodeCamp that helped me get my first steps into Frontend web development and introduced me to the frontend MVC architecture.

## Author

- Website - [Kylan Duncan](https://www.cloudydaiyz.com)
- Frontend Mentor - [@cloudydaiyz](https://www.frontendmentor.io/profile/cloudydaiyz)