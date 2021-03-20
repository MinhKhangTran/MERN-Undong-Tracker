
# MERN Fitness Tracker (German 🇩🇪)
A fitness tracker built with the MERN stack. The backend has three models: User, Exercises and Workouts.  
Every user can make a new Workout and add exercises to this workout. Every Exercise has a set with repetitions and weight.
This is a very simple application, but with lots of logic (more than I thought 🥲)

  
The backend used technologies like node, express, mongoose and some validation and async-handler. In this project i had to use some "crazy" mongoDB queries because I had multiple nested Arrays 😅. But somehow it worked out
  
The frontend was made with react, redux toolkit, typescript and chakra UI. The workoutSlice file is just big. I have to look how i can reduce it.
  
Because I am looking for such an App I created this App. I have more ideas for this project but I need more practice. Maybe I will maintain it and update it in the near future 
  

  

  
## :hammer: Technologies & Tools  
  
#### Backend
* Node
* Typescript
* Express
* Mongoose

#### Frontend
* React
* Typescript
* Redux Toolkit
* ChakraUi

  
## :trophy: Features  
  
### Users:  
User can login/register and have his own fitness tracking dashboard
### Exercise:  
Logged in User can add new Exercises. They are public for every one. Each exercise has a category. p.e. Benchpress is a chest exercise so the category is chest.
### Workout:
Each workout consists of exercises. And each exercises consists of sets, which consists of weight and repetitions. Workout can be updated or deleted. same for Sets. I wanted to clone single workouts but somehow I failed at it. I could clone it but the ID remains the same. Next update will include this feature 🥸.

## :computer: Code
To get a local copy up and running follow these simple steps.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MinhKhangTran/MERN-Undong-Tracker.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```


