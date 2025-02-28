# Products System Redesign

<a id='readme-top'> </a>

<br />
<div align="center">
  <a href="https://github.com/Atelier-System-Redesign/Products-SDC">
    <!-- <img src="" alt="finance tracker logo" width="50" height="50" /> -->
  </a>
  <h3 align="center">
    Project Atelier Products-Service System Redesign
  </h3>
  <p align="center">
    <br />
    <a href="https://github.com/Atelier-System-Redesign/Products-SDC"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
    <li>
      <a href="#optimizations">Optimizations</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## About

<div align="center">

<p>
  Project Atelier is a desktop and mobile friendly app utilizing Node.js, React and Express to provide a modern e-commerce portal that is not just functional, but also intuitive and user-friendly. The backend service created here utilizes NginX, MongoDB and Node-Cache to create a seamless flow of data to the client, and allowing for horizontal scaling to handle increased traffic while maintaining low service response times.

### Built With

[![node.js](https://img.shields.io/badge/node-%23000000.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![NginX](https://img.shields.io/badge/nginx-%23000000.svg?style=for-the-badge&logo=nginx&logoColor=darkgreen)](https://www.nginx.com/)
[![node-cache](https://img.shields.io/badge/node--cache-%23000000.svg?style=for-the-badge&logo=node-cache)](https://www.npmjs.com/package/node-cache)
[![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=green)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Mongo--DB-%23000000?style=for-the-badge&logo=mongodb&logoColor=darkGreen)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose.JS-%23000000?style=for-the-badge&logo=mongoose.js)](https://mongoosejs.com/)

<p align="right">
  (<a href="#readme-top">back to top</a>)
</p>

## Getting Started

<p>
    Instructions to setup the Products API on your local machine below.
</p>

### Prerequisites

[![node.js](https://img.shields.io/badge/node-%23000000.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=darkgreen)](https://www.npmjs.com/)

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Atelier-System-Redesign/Products-SDC
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your port and database info in `.env.local` file
   ```sh
    PORT = (your port)
    DATABASE_HOST_IP = (your database ip)
   ```
4. Run in server environment.
   ```sh
   npm start
   ```

## Usage

Project Atelier is run on the designated port. Local testing can be performed by installing K6 and entering the following command in the projects root directory:
```sh
k6 run script.js
```
or by utilizing tools such as PostMan.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Optimizations

Reduced query time by 48% through database migration to MongoDB and data and consolidation.

Incorperated NginX Least Connections load balancing for horizontal scaling.

Increased database capacity by a factor of 5 through server side caching to reduce the load on the on MongoDB's native caching features.

<!-- CONTACT -->

## Contact

<h3 align='center'> Michael O'Brien</h3>
<h4 align='center'>
  <a href="https://www.linkedin.com/in/michael-o-brien-63153129a/">Linkedin</a> |
  <a href="https://github.com/mob61887">GitHub</a>
</h4>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
