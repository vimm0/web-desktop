# Web Desktop

### Problem & Solution
- Some clients may find scary to write command in command prompt, but django project usually require some commands before actual server runs onto computer. So to reduce the friction between application and user, this project helps to create a distributable package with the help of django and electron. 

### Steps involved:
- add simple `backend` in django app
- add simple `electron` wrapper to django executable file generated by `pyinstaller`
- add simple `frontend` in framework such as `vuejs`, `reactjs` etc.
- add `example` directory to create bunch of examples for example whatsapp.

## Description

This project is an open-source initiative aimed at building packagable and distributable web application with the help of pyinstaller and electron. This project is meant as Proof-Of-Concept but you could modify backend and add functionality to electorn wrapper and builder as much complex as possible as per your requirement.

## BUG
- After multiple tries then only django server start when opened with electorn.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Steps involved

```bash
$ git clone https://github.com/vimm0/web-desktop.git
$ cd web-desktop
```

## Usage

##### Backend Commands
From the root of this repo, steps involved to produce package from backend directory are:
```
$ cd backend
$ virtualenv -p python env
$ source env/Scripts/activate
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py createsuperuser
$ pyinstaller --name=webdeskbackend manage.py --onefile
$ ./dist/webdeskbackend.exe runserver --noreload # to check if it works.
```
After running commands above, open your web browser and visit [http://localhost:8000](http://localhost:8000)  to access the application.

[Pyinstaller](https://pyinstaller.org/en/stable/) produces `build` and `dist` directory, `dist` contains executable application in `backend` directory, which should be copied to `webdesk-de` or equivalent electron wrapper. In this case, `back` directory in `webdesk-de`.

#### Our main motive is to not use any command and no console popup while executing application.

##### Electron Commands
From the root of this repo, steps involved to produce electron application with django backend is as follows:

```
$ cd webdesk-de
$ npm install
$ npm run pack:lin
```

[electron](https://www.electronjs.org/) produces `out` directory where all the packaged application resides. You can now open application in `out` directory.

To open produced application in linux
```
$ ./out/Webdesk-linux-x64/Webdesk
```

[Reference](Reference)

## Contributing

We welcome contributions from the community to make this project better. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

Please ensure that your code follows the project's coding conventions and styling guidelines. Also, make sure to update the documentation if necessary.

Also contribution is required in mac OS because of software and hardware limitation.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software. See the [LICENSE](LICENSE) file for more details.

---

Thank you for your interest in this project. If you have any questions, please feel free to contact us or open an issue. We appreciate your support!