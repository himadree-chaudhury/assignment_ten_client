# Movie Portal Project Todo List

## Project Setup

- [ ] Create GitHub repositories for client and server
- [ ] Set up basic folder structure for both repositories
- [ ] Install necessary packages and dependencies
- [ ] Set up environment variables for Firebase config and MongoDB credentials
- [ ] Create a meaningful README.md file with website name, live site URL, and at least 5 bullet points

## Layout & Design

- [ ] Design a unique, eye-catching layout (different from previous projects/examples)
- [ ] Create wireframes/roadmap for the website structure
- [ ] Implement responsive design for mobile, tablet, and desktop views
- [ ] Ensure consistent styling across all pages

## Authentication

- [ ] Implement Login Page with form (Email, Password fields)
- [ ] Add Forget Password option
- [ ] Create Register Page with form (Name, Email, Photo-URL, Password fields)
- [ ] Implement password validation:
- [ ] Must have an uppercase letter
- [ ] Must have a lowercase letter
- [ ] Length must be at least 6 characters
- [ ] Add Google authentication
- [ ] Implement conditional navbar rendering based on authentication state
- [ ] Set up authentication redirects to appropriate pages
- [ ] Handle authentication errors with toast/error messages

## Navbar

- [ ] Create navbar with website name/logo
- [ ] Add navigation links:
- [ ] Home
- [ ] All Movies
- [ ] Add Movie (private route)
- [ ] My Favorites (private route)
- [ ] One extra public route with relevant content
- [ ] Login/Register buttons (conditional)
- [ ] Implement user photo display with hover effect showing displayName
- [ ] Add logout functionality

## Home Page

- [ ] Create static slider/carousel with at least 3 slides
- [ ] Implement Featured Movies section (6 highest-rated movies)
- [ ] Movie cards with poster, title, genre, duration, release year, rating
- [ ] "See Details" button on each card
- [ ] "See all movies" button at the bottom
- [ ] Add first extra section (meaningful and relevant)
- [ ] Add second extra section (meaningful and relevant)
- [ ] Create a footer with website name, copyright, contact info, social media links

## Add Movie Page (Private)

- [ ] Create form with all required fields:
- [ ] Movie Poster (with link validation)
- [ ] Movie Title (min 2 characters validation)
- [ ] Genre dropdown
- [ ] Duration (number input, >60 minutes validation)
- [ ] Release Year dropdown
- [ ] Rating system using react-simple-star-rating
- [ ] Summary textarea (min 10 characters validation)
- [ ] Implement form validation with error messages
- [ ] Store movie data in database with user email
- [ ] Show success message on submission

## All Movies Page

- [ ] Create 3-column grid layout for movie cards
- [ ] Display all movies with required information
- [ ] Implement "See Details" functionality
- [ ] Add loading spinner for data fetching

## Movie Details Page (Private)

- [ ] Display all movie information
- [ ] Implement "Delete Movie" button functionality
- [ ] Implement "Add to Favorite" button functionality

## Favorite Movies Page (Private)

- [ ] Create 3-column grid layout for favorite movies
- [ ] Filter movies by logged-in user's email
- [ ] Display all required information
- [ ] Implement "Delete Favorite" button

## Additional Requirements

- [ ] Create a 404 Not Found page
- [ ] Add loading spinners for data loading states
- [ ] Implement toast notifications for all CRUD operations
- [ ] Handle route reloading (no errors on refresh)
- [ ] Set up Firebase authorization domain if using Netlify/Surge

## Challenges (Optional)

- [ ] Implement "Update Movie" functionality:
- [ ] Add "Update Movie" button to movie details page
- [ ] Create update form with validation
- [ ] Handle movie data updates
- [ ] Add search functionality on All Movies page
- [ ] Implement React Hook Form for at least one form
- [ ] Create dark/light theme toggle for the home page

## Deployment

- [ ] Deploy client-side code (Netlify/Surge/Firebase)
- [ ] Deploy server-side code (Vercel)
- [ ] Test deployed application thoroughly
- [ ] Update README with live links

## Final Submission

- [ ] Ensure minimum 15 notable GitHub commits on client side
- [ ] Ensure minimum 8 notable GitHub commits on server side
- [ ] Submit client-side GitHub repository
- [ ] Submit server-side GitHub repository
- [ ] Submit live website link
