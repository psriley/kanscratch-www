# KanScratch Installation Instructions:
1. If you are on Mac or Linux: 
    - Make sure to install *docker desktop* (https://www.docker.com/products/docker-desktop/)
2. If you are on Windows:
    - I would recommend getting docker setup with WSL2 as shown here: https://docs.docker.com/desktop/windows/wsl/
3. Create a new directory called whatever you like to hold this repo (I'll be using `kanscratch` as an example): 
    - Command to create new directory: `mkdir {name-of-directory}`
4. Go into the directory you've just create (`cd {name-of-directory}`). 
5. Clone the repository
6. (Optional) Open the code with your preferrable code editor/IDE. I use visual studio code, so I run `code .` to open the current directory in vscode.
    - You could also do this with  `touch {name-of-file}` in the terminal and `echo {file-contents-in-example-env-file} > {name-of-file}`
7. Create a the following environment files:
    - `.env.dev` (this will be used for storing development environment variables)
        - Example file: 'example.env.dev' in the documentation project directory
    - `.env.prod` (this will be used for storing production environment variables)
        - Example file: 'example.env.prod' in the documentation project directory
    - `.env.prod.db` (this will store production database information)
        - Example file: 'example.env.prod.db' in the documentation project directory
8. In a linux terminal (Ubuntu if you followed the above WSL tutorial) run `docker-compose build`
9. Run `docker-compose up` to start containers, and you should be ready for development!
10. Visit 127.0.0.1:8000 to see the backend (api docs are at 127.0.0.1:8000/api/docs), and 127.0.0.1:3000 to see the frontend
10. Run `docker-compose down` to stop containers when you are done.

# *Documentation for developers can be found in the `documentation` directory of the project*
